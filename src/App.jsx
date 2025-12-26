import { useState } from "react";
import { useMicrophone } from "./hooks/useMicrophone";
import PushToTalk from "./components/PushToTalk";
import StatusIndicator from "./components/StatusIndicator";
import TranscriptView from "./components/TranscriptView";
import Navbar from "./components/Navbar";

function App() {
  const [transcript, setTranscript] = useState("");
  const clearTranscript = () => setTranscript("");

  const { startRecording, stopRecording, isRecording } = useMicrophone();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "#020617",
        color: "white",
      }}
    >
      <Navbar />

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: 24,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 24,
            height: "100%",
          }}
        >
          {/* LEFT PANEL */}
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
          
            }}
          >
            <PushToTalk
              isRecording={isRecording}
              onStart={startRecording}
              onStop={() =>
                stopRecording((text) =>
                  setTranscript((prev) => (prev ? prev + " " : "") + text)
                )
              }
            />

            <StatusIndicator isRecording={isRecording} />
          </div>

          {/* RIGHT PANEL */}
          <TranscriptView transcript={transcript} onClear={clearTranscript} />
        </div>
      </div>
    </div>
  );
}

export default App;
