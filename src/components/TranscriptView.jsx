export default function TranscriptView({ transcript }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* TITLE ABOVE BOX */}
      <h3
        style={{
          marginBottom: 10,
          fontSize: 20,
          letterSpacing: "1px",
          color: "#94a3b8",
        }}
      >
        TRANSCRIPT
      </h3>

      {/* TRANSCRIPT BOX */}
     <div
        style={{
        flex: 1,
        padding: 24,
        background: "#020617",
        borderRadius: 14,
        border: "1px solid #1e293b",
        color: "#e5e7eb",
        overflowY: "auto",
        lineHeight: 1.7,
        display: "flex",
        alignItems: "center",
        justifyContent: transcript ? "flex-start" : "center",
        marginRight: 30,
        marginBottom: 20,
        }}
    >

        {transcript ? (
          <p style={{ whiteSpace: "pre-wrap" }}>{transcript}</p>
        ) : (
          <p style={{ color: "#64748b" }}>
            Press the microphone button or hold Space to start recording
          </p>
        )}
      </div>
    </div>
  );
}

