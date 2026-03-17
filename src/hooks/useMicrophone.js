import { useRef, useState } from "react";

export function useMicrophone() {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  const startRecording = async () => {
    try {
      // Request microphone access from the browser
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = audioStream;
      setStream(audioStream);

      // Create a recorder with the audio stream
      mediaRecorderRef.current = new MediaRecorder(audioStream);
      audioChunksRef.current = [];

      // Collect audio data as it's recorded
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      // User denied permission or mic not available
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopRecording = async (onTranscript) => {
    if (!mediaRecorderRef.current) return;

    // Process audio when recording stops
    mediaRecorderRef.current.onstop = async () => {
      // Combine all audio chunks into a single blob
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      try {
        // Send to Deepgram API for transcription
        const response = await fetch(
          "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${import.meta.env.VITE_DEEPGRAM_API_KEY}`,
              "Content-Type": "audio/webm",
            },
            body: audioBlob,
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Extract transcript from API response
        const channel = data?.results?.channels?.[0];
        const alt = channel?.alternatives?.[0];
        const transcript = alt?.transcript || alt?.paragraphs?.transcript || "";

        // Pass transcript back to parent component
        if (transcript && onTranscript) {
          onTranscript(transcript);
        }
      } catch (error) {
        console.error("Transcription error:", error);
        alert("Failed to transcribe audio. Please try again.");
      }
    };

    // Stop the recorder
    mediaRecorderRef.current.stop();
    
    // Stop all tracks in the stream
    streamRef.current?.getTracks().forEach((track) => track.stop());
    
    setStream(null);
    setIsRecording(false);
  };

  return { startRecording, stopRecording, isRecording, stream };
}