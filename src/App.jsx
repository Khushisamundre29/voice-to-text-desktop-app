import { useState } from "react";
import { useMicrophone } from "./hooks/useMicrophone";
import PushToTalk from "./components/PushToTalk";
import StatusIndicator from "./components/StatusIndicator";
import TranscriptView from "./components/TranscriptView";

function App() {
  const [transcript, setTranscript] = useState("");
  const { startRecording, stopRecording, isRecording } = useMicrophone();

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#0f172a", color: "white", padding: 20 }}>
      <h2 style={{ marginBottom: 50 }}>VoiceToText</h2>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, height: "88%" }}>
        <div
          style={{
            background: "#020617",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <PushToTalk
            isRecording={isRecording}
            onStart={() => startRecording()}
            onStop={() => stopRecording((text) => setTranscript(prev => prev + " " + text))}
          />
          <StatusIndicator isRecording={isRecording} />
        </div>

        <TranscriptView transcript={transcript} onClear={() => setTranscript("")} />
      </div>
    </div>
  );
}

export default App;
