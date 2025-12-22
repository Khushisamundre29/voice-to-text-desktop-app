export default function StatusIndicator({ isRecording }) {
  return (
    <div style={{ marginTop: 10, fontSize: 14 }}>
      Status:{" "}
      <span style={{ color: isRecording ? "#e63946" : "#2a9d8f" }}>
        {isRecording ? "Recording" : "Stop Recording"}
      </span>
    </div>
  );
}
