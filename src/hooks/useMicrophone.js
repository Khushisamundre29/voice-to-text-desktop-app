import { useRef, useState } from "react";

export function useMicrophone() {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async (onAudioChunk) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          onAudioChunk(event.data);
        }
      };

      mediaRecorder.start(250); // send audio every 250ms
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
      alert("Microphone permission is required");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
}
