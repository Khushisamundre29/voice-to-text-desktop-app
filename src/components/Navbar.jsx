export default function Navbar({ isRecording, wordCount }) {
  return (
    <nav className="navbar">
      {/* Left side - branding */}
      <div className="navbar-left">
        <div>
          <div className="navbar-title">VoiceToText</div>
        </div>
      </div>

      {/* Right side - stats */}
      <div className="navbar-right">
        {/* Show word count if transcript has content */}
        {wordCount > 0 && (
          <div className="nav-stat">
            <span className="nav-stat-value">{wordCount}</span>
            <span className="nav-stat-label">words</span>
          </div>
        )}

        {/* Show recording indicator when active */}
        {isRecording && (
          <div className="nav-rec-badge">
            <span className="nav-rec-dot" />
            REC
          </div>
        )}
      </div>
    </nav>
  );
}