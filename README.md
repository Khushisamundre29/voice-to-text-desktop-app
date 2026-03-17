# 🎙️ Voice to Text Desktop App

A cross-platform Voice-to-Text desktop application built with **Tauri** and **Deepgram**. Convert spoken audio into text with a simple push-to-talk workflow, inspired by Wispr Flow.

**Focus:** Real-time transcription, clean architecture, and reliable audio capture.

---

## 📋 Project Overview

This application demonstrates how to build a modern desktop app that integrates AI-powered speech recognition with native system capabilities. Users can simply hold a button and speak—the app automatically transcribes their audio in real-time.

### What This Project Showcases

✅ **Practical Problem-Solving** - Building functional voice apps  
✅ **Real-Time API Integration** - Streaming audio to Deepgram API  
✅ **Clean Architecture** - Maintainable React components & hooks  
✅ **Production Workflow** - Error handling, permissions, feedback  

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Desktop** | Tauri | Cross-platform, lightweight alternative to Electron |
| **Frontend** | React.js + Hooks | UI components and state management |
| **Speech Recognition** | Deepgram API | Real-time speech-to-text transcription |
| **Build Tool** | Vite | Fast development and production builds |

---

## ✨ Core Features

### 🎤 Push-to-Talk Recording
- Click or hold microphone button to record
- Release to stop and transcribe
- Keyboard shortcut support (Space bar)

### 🎯 Real-Time Transcription
- Audio streams directly to Deepgram API
- Near-instant transcription results
- Low latency performance

### 📝 Transcript Management
- View transcribed text in clean UI
- Copy transcript to clipboard
- Export as .txt file
- Clear transcript with one click

### 🔴 Recording Feedback
- Visual status indicator (Recording/Ready)
- Timer showing recording duration
- Real-time word count

### ⚠️ Robust Error Handling
- Microphone permission requests
- Network/API failure gracefully handled
- Missing API key detection
- User-friendly error messages

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Deepgram API key (free account available)

### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/khushisamundre04/voice-to-text-desktop-app
cd voice-to-text-desktop-app

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_DEEPGRAM_API_KEY=your_api_key_here" > .env

# 4. Run in development mode
npm run dev

# 5. (Optional) Build as desktop app with Tauri
npm run tauri dev
```

---

## 🔑 Deepgram API Setup

1. **Create Account:** Visit [deepgram.com](https://deepgram.com)
2. **Generate Key:** Get your API key from the dashboard
3. **Add to Project:** Create `.env` file with:
   ```
   VITE_DEEPGRAM_API_KEY=your_key_here
   ```
4. **Test:** Allow microphone access when prompted and start recording

---

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── App.jsx
│   ├── Navbar.jsx
│   ├── PushToTalk.jsx
│   └── TranscriptView.jsx
├── hooks/              # Custom React hooks
│   ├── useMicrophone.js
│   └── useTranscription.js
├── services/           # API and utility functions
│   ├── deepgramService.js
│   └── audioService.js
├── App.css             # Styling
├── main.jsx            # Entry point
└── index.html          # HTML template
```

---

## ✅ Testing Checklist

Before deployment, verify:

- [ ] Microphone permission handling works
- [ ] Recording starts/stops correctly
- [ ] Transcription appears in real-time
- [ ] Copy to clipboard functions
- [ ] Export .txt file works
- [ ] Word count updates accurately
- [ ] Spacebar keyboard shortcut works
- [ ] Error messages display on failures
- [ ] No console errors

---

## 📚 Code Quality

✅ **Clean Comments** - Code is well-documented  
✅ **Error Handling** - Comprehensive try-catch blocks  
✅ **Modular Design** - Reusable components & hooks  
✅ **State Management** - Efficient React patterns  

---

## ⚠️ Known Limitations

- Minimal UI design (focus on functionality)
- No user authentication or accounts
- Single language support (English)
- Transcript history not persisted locally

---

## 🚀 Future Improvements

- [ ] Multiple language support
- [ ] Transcript history & search
- [ ] User authentication
- [ ] Cloud sync with Firebase
- [ ] Batch file transcription
- [ ] Custom vocabulary support
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Improved UI/UX design

---

## 💡 Key Learnings

This project demonstrates:
- Building cross-platform desktop apps with Tauri
- Real-time API integration with React
- Handling microphone access & audio capture
- Error handling in production apps
- Clean code architecture practices

---

## 👤 Author

**Khushi Samundre**

