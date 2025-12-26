import { useRef, useState } from "react";

export function useMicrophone() {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(streamRef.current);

    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = async (onTranscript) => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

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

      const data = await response.json();
      const text =
        data?.results?.channels[0]?.alternatives[0]?.transcript || "";

      onTranscript(text);
    };

    mediaRecorderRef.current.stop();
    streamRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  return { startRecording, stopRecording, isRecording };
}