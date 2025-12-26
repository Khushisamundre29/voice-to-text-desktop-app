export default function TranscriptView({ transcript, onClear }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        boxSizing: "border-box",
        gap: 12,
      }}
    >
      {/* HEADER ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: 20,
            letterSpacing: "1px",
            color: "#94a3b8",
            margin: 0,
          }}
        >
          TRANSCRIPT
        </h3>

        <button
          onClick={onClear}
          style={{
            background: "transparent",
            border: "1px solid #334155",
            color: "#cbd5f5",
            padding: "6px 14px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {/* TRANSCRIPT BOX */}
      <div
        style={{
          flex: 1,
          padding: 24,
          background: "#0f172a",
          borderRadius: 14,
          border: "1px solid #1e293b",
          color: "#e5e7eb",
          overflowY: "auto",
          lineHeight: 1.7,
          display: "flex",
          alignItems: transcript ? "flex-start" : "center",
          justifyContent: transcript ? "flex-start" : "center",
          textAlign: transcript ? "left" : "center",
        }}
      >
        {transcript ? (
          <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{transcript}</p>
        ) : (
          <p style={{ color: "#64748b", margin: 0 }}>
            Press the microphone button to start recording
          </p>
        )}
      </div>
    </div>
  );
}
