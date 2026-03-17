import { useState } from "react";

export default function TranscriptView({ transcript, wordCount, onClear, isRecording }) {
  const [copied, setCopied] = useState(false);

  // Copy transcript to clipboard
  const handleCopy = () => {
    if (!transcript) return;
    
    navigator.clipboard.writeText(transcript).then(() => {
      setCopied(true);
      // Hide the toast notification after 1.8 seconds
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // Download transcript as a text file
  const handleExport = () => {
    if (!transcript) return;
    
    // Create a blob from the transcript text
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    
    // Clean up the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className="transcript-container">
      {/* Header with action buttons */}
      <div className="transcript-header">
        <span className="transcript-title">Transcript</span>
        
        <div className="transcript-actions">
          {/* Show word count if there's content */}
          {wordCount > 0 && (
            <span className="transcript-wordcount">{wordCount} words</span>
          )}
          
          {/* Copy button */}
          <button 
            className="btn accent" 
            onClick={handleCopy} 
            disabled={!transcript}
          >
            Copy
          </button>
          
          {/* Download as text file */}
          <button 
            className="btn" 
            onClick={handleExport} 
            disabled={!transcript}
          >
            Export .txt
          </button>
          
          {/* Clear transcript and save to history */}
          <button 
            className="btn danger" 
            onClick={onClear} 
            disabled={!transcript}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main transcript display area */}
      <div className={`transcript-box ${isRecording ? "recording" : ""}`}>
        {transcript ? (
          // Show the transcript text
          <p className="transcript-text">{transcript}</p>
        ) : (
          // Show placeholder when empty
          <div className="transcript-placeholder">
            <div className="placeholder-icon">🎙️</div>
            <div className="placeholder-text">
              Hold the button or press <strong>Space</strong><br />
              to start transcribing
            </div>
          </div>
        )}
      </div>

      {/* Toast notification for copy action */}
      {copied && <div className="copied-toast">✓ Copied to clipboard</div>}
    </div>
  );
}