export default function PushToTalk({ isRecording, onStart, onStop }) {
  return (
    <div style={{ textAlign: "center" }}>
      <button
        onMouseDown={onStart}
        onMouseUp={onStop}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "none",
          fontSize: 40,
          cursor: "pointer",
          background: isRecording ? "#e63946" : "#2a9d8f",
          color: "white",
        }}
      >
        🎤
      </button>

      <p style={{ marginTop: 12, opacity: 0.7 }}>
        Hold to record
      </p>
    </div>
  );
}
