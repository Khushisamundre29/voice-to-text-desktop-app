import { useState } from "react";
import { useMicrophone } from "./hooks/useMicrophone";
import PushToTalk from "./components/PushToTalk";
import StatusIndicator from "./components/StatusIndicator";
import TranscriptView from "./components/TranscriptView";
import Navbar from "./components/Navbar";

function App() {
  const [transcript, setTranscript] = useState("");
  const clearTranscript = () => {setTranscript("");
};

  const { startRecording, stopRecording, isRecording } = useMicrophone();

  return (
    <div style={{ height: "100vh",width: "100vw", display: "flex", flexDirection: "column", background: "#020617", color: "white" }}>
      <Navbar />
      <div style={{ padding: 20 }}></div>
      <h2 style={{ marginBottom: 5}}></h2>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, height: "88%" }}>
        <div
          style={{
            background: "#0f172a",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
            marginLeft: 20,
          }}
        >

            <PushToTalk
            isRecording={isRecording}
            onStart={startRecording}
            onStop={() =>
            stopRecording((text) =>
            setTranscript(prev => prev + " " + text)
            )
          }
        />

          <StatusIndicator isRecording={isRecording} />
        </div>

        <TranscriptView transcript={transcript} onClear={clearTranscript} />

      </div>
    </div>
  );
}

export default App;
