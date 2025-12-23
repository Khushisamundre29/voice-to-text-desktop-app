export default function Navbar() {
  return (
    <div
      style={{
        height: 64,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        background:
          "linear-gradient(180deg, rgba(2,6,23,0.95), rgba(2,6,23,0.85))",
        borderBottom: "1px solid #1e293b",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#14b8a6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "#020617",
          marginRight: 12,
        }}
      >
        V
      </div>

      {/* Title */}
      <div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#e5e7eb",
            lineHeight: 1.2,
          }}
        >
          VoiceToText
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          Real-time transcription
        </div>
      </div>
    </div>
  );
}
