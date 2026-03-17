import { useEffect, useRef } from "react";

const BAR_COUNT = 40;

export default function AudioVisualizer({ stream, isRecording }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");

    // Draw idle state - flat line of bars
    const drawIdle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width - (BAR_COUNT - 1) * 4) / BAR_COUNT;
      
      for (let i = 0; i < BAR_COUNT; i++) {
        const x = i * (barWidth + 4);
        ctx.fillStyle = "#1e2a45";
        ctx.beginPath();
        ctx.roundRect(x, canvas.height / 2 - 1.5, barWidth, 3, 2);
        ctx.fill();
      }
    };

    // If not recording, show idle state
    if (!stream || !isRecording) {
      cancelAnimationFrame(animRef.current);
      drawIdle();
      return;
    }

    // Set up audio context and analyser
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.78; // Smooth the bars

    // Create source from microphone stream
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    // Buffer for frequency data
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // Animation loop for drawing bars
    const draw = () => {
      analyser.getByteFrequencyData(frequencyData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width - (BAR_COUNT - 1) * 4) / BAR_COUNT;
      const maxHeight = canvas.height * 0.88;
      const centerY = canvas.height / 2;

      // Draw each frequency bar
      for (let i = 0; i < BAR_COUNT; i++) {
        // Get frequency data for this bar
        const rawValue = frequencyData[Math.floor(i * (frequencyData.length / BAR_COUNT))] || 0;
        const normalized = rawValue / 255;
        const barHeight = Math.max(3, normalized * maxHeight);
        const xPos = i * (barWidth + 4);

        // Create gradient for nice color effect
        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        const alpha = 0.5 + normalized * 0.5;
        
        gradient.addColorStop(0, `rgba(0, ${Math.round(180 + normalized * 50)}, ${Math.round(170 - normalized * 60)}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(20, ${Math.round(200 + normalized * 30)}, ${Math.round(170 - normalized * 40)}, 1)`);
        gradient.addColorStop(1, `rgba(0, ${Math.round(180 + normalized * 50)}, ${Math.round(170 - normalized * 60)}, ${alpha})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(xPos, centerY - barHeight / 2, barWidth, barHeight, 3);
        ctx.fill();
      }

      // Continue animation
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      cancelAnimationFrame(animRef.current);
      source.disconnect();
      audioContext.close();
    };
  }, [stream, isRecording]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={80}
      style={{ width: "100%", height: 80, display: "block" }}
    />
  );
}