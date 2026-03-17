import { useState, useCallback, useEffect } from "react";
import { useMicrophone } from "./hooks/useMicrophone";
import PushToTalk from "./components/PushToTalk";
import TranscriptView from "./components/TranscriptView";
import Navbar from "./components/Navbar";
import AudioVisualizer from "./components/AudioVisualizer";

function App() {
  // Store the current transcript text
  const [transcript, setTranscript] = useState("");
  
  // Count words in real-time for the UI
  const [wordCount, setWordCount] = useState(0);
  
  // Timer to show how long recording has been going
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Clear transcript and reset word count
  const clearTranscript = () => {
    setTranscript("");
    setWordCount(0);
  };

  // Add new transcribed text to existing transcript
  const handleNewText = useCallback((text) => {
    if (!text || !text.trim()) return;
    
    setTranscript((prev) => {
      const next = prev ? prev + " " + text : text;
      // Update word count whenever transcript changes
      setWordCount(next.trim().split(/\s+/).filter(Boolean).length);
      return next;
    });
  }, []);

  // Hook for microphone recording
  const { startRecording, stopRecording, isRecording, stream } = useMicrophone();

  // Start recording and timer
  const handleStart = useCallback(() => {
    startRecording();
    setRecordingDuration(0);
    
    // Update duration every second while recording
    const id = setInterval(() => setRecordingDuration((d) => d + 1), 1000);
    setTimerInterval(id);
  }, [startRecording]);

  // Stop recording and clean up timer
  const handleStop = useCallback(() => {
    stopRecording(handleNewText);
    
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [stopRecording, handleNewText, timerInterval]);

  // Add spacebar support for push-to-talk
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space" && e.target === document.body && !isRecording) {
        e.preventDefault();
        handleStart();
      }
    };

    const onKeyUp = (e) => {
      if (e.code === "Space" && e.target === document.body && isRecording) {
        e.preventDefault();
        handleStop();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isRecording, handleStart, handleStop]);

  // Format duration to MM:SS format
  const formatDuration = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="app-root">
      {/* Top navbar with title and stats */}
      <Navbar isRecording={isRecording} wordCount={!isRecording ? wordCount : 0} />

      <main className="app-main">
        {/* Left sidebar - recording controls */}
        <aside className="left-panel">
          <div className="mic-section">
            
            {/* Main record button - hold to record */}
            <PushToTalk
              isRecording={isRecording}
              onStart={handleStart}
              onStop={handleStop}
            />

            {/* Show current status */}
            <div className="status-row">
              <span className={`status-dot ${isRecording ? "recording" : ""}`} />
              <span className="status-label">
                {isRecording ? `Recording ${formatDuration(recordingDuration)}` : "Ready"}
              </span>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="shortcut-hint">
              <kbd>Space</kbd> to record
            </div>
          </div>
        </aside>

        {/* Right panel - transcript display */}
        <section className="right-panel">
          <TranscriptView
            transcript={transcript}
            wordCount={wordCount}
            onClear={clearTranscript}
            isRecording={isRecording}
          />
        </section>
      </main>
    </div>
  );
}

export default App;