import { useRef } from "react";
import {
  connectDeepgram,
  sendAudioToDeepgram,
  closeDeepgram,
} from "../services/deepgramService";
import { floatTo16BitPCM } from "../services/audioService";

export function useTranscription(onText) {
  const isConnectedRef = useRef(false);

  const startTranscription = () => {
    if (isConnectedRef.current) return;

    connectDeepgram(onText, (err) => console.error(err));
    isConnectedRef.current = true;
  };

  const sendAudio = (audioData) => {
    if (!isConnectedRef.current) return;

    const pcm = floatTo16BitPCM(audioData);
    sendAudioToDeepgram(pcm);
  };

  const stopTranscription = () => {
    closeDeepgram();
    isConnectedRef.current = false;
  };

  return {
    startTranscription,
    sendAudio,
    stopTranscription,
  };
}
