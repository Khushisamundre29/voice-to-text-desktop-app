let socket = null;

export function connectDeepgram(onTranscript, onError) {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  // Connect to Deepgram WebSocket for real-time transcription
  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?model=nova-3&language=en",
    ["token", apiKey]
  );

  socket.onopen = () => {
    console.log("Connected to Deepgram");
  };

  // Receive transcribed text from Deepgram
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const transcript = data.channel?.alternatives?.[0]?.transcript;

    // Only pass non-empty transcripts
    if (transcript) {
      onTranscript(transcript);
    }
  };

  socket.onerror = (err) => {
    console.error("Deepgram connection error:", err);
    onError?.("Failed to connect to Deepgram");
  };

  socket.onclose = () => {
    console.log("Disconnected from Deepgram");
  };
}

// Send audio chunk to Deepgram
export function sendAudioToDeepgram(audioChunk) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(audioChunk);
  }
}

// Close Deepgram connection
export function closeDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
  }
}