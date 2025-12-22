let socket = null;

export function connectDeepgram(onTranscript, onError) {
const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

socket = new WebSocket("wss://api.deepgram.com/v1/listen?model=nova-2&language=en",
["token", apiKey]
);


  socket.onopen = () => {
    console.log("Deepgram connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const transcript = data.channel?.alternatives?.[0]?.transcript;

    if (transcript) {
      onTranscript(transcript);
    }
  };

  socket.onerror = (err) => {
    console.error("Deepgram error", err);
    onError?.("Deepgram connection failed");
  };

  socket.onclose = () => {
    console.log("Deepgram disconnected");
  };
}

export function sendAudioToDeepgram(audioChunk) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(audioChunk);
  }
}

export function closeDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
