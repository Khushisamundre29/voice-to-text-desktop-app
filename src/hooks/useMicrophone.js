import { useRef, useState } from "react";

export function useMicrophone() {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = async (onTranscript) => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const arrayBuffer = await blob.arrayBuffer();

      // Send to Deepgram REST API
      const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-3", {
        method: "POST",
        headers: {
          Authorization: `Token ${import.meta.env.VITE_DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/webm",
        },
        body: arrayBuffer,
      });

      const data = await response.json();
      const transcript = data?.results?.channels[0]?.alternatives[0]?.transcript || "";
      onTranscript(transcript);
    };

    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return { startRecording, stopRecording, isRecording };
}
