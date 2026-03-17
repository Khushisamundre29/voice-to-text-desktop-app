export default function PushToTalk({ isRecording, onStart, onStop }) {
  return (
    <div className="ptb-wrap">
      <button
        className={`ptb-btn ${isRecording ? "active" : ""}`}
        // Start recording on mouse/touch down
        onPointerDown={(e) => { 
          e.preventDefault(); 
          onStart(); 
        }}
        // Stop recording on mouse/touch up
        onPointerUp={(e) => { 
          e.preventDefault(); 
          onStop(); 
        }}
        // Stop recording if user drags away
        onPointerLeave={() => { 
          if (isRecording) onStop(); 
        }}
      >
        🎤
      </button>
    </div>
  );
}