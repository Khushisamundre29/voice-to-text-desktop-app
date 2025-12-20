import { useState } from "react";
import { useMicrophone } from "./hooks/useMicrophone";

import PushToTalk from "./components/PushToTalk";
import StatusIndicator from "./components/StatusIndicator";
import TranscriptView from "./components/TranscriptView";

function App() {
  const [transcript, setTranscript] = useState("");
  const { startRecording, stopRecording, isRecording } = useMicrophone();

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        padding: 20,
      }}
    >
      {/* HEADER */}
      <h2 style={{ marginBottom: 50, letterSpacing: 1 }}>
        Voice To Text 
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 20,
          height: "88%",
        }}
      >
        {/* LEFT PANEL */}
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
          }}
        >
          <PushToTalk
            isRecording={isRecording}
            onStart={() =>
              startRecording((text) => {
                setTranscript((prev) => prev + " " + text);
              })
            }
            onStop={stopRecording}
          />

          <StatusIndicator isRecording={isRecording} />
        </div>

        {/* RIGHT PANEL */}
        <TranscriptView
         transcript={transcript} 
         onClear={() => setTranscript("")}
         />
      </div>
    </div>
  );
}

export default App;
