# Voice to Text Desktop App

A cross-platform **Voice-to-Text desktop application** built using **Tauri** and **Deepgram**, inspired by the core workflow of **Wispr Flow**.  
This project focuses on **real-time speech transcription**, clean architecture, and reliable audio capture rather than pixel-perfect UI design.

---

## Project Overview

This application enables users to convert spoken audio into text using a **push-to-talk** workflow.  
It demonstrates how modern desktop applications can integrate **AI-powered speech recognition** with native system capabilities.

The goal of this project is to showcase:
- Practical problem-solving skills  
- Integration of real-time audio streaming APIs  
- Clean, maintainable frontend architecture  
- Understanding of real-world product workflows  

---

##  Key Objectives

- Build a functional **Wispr Flow–style voice transcription app**
- Use **Tauri** for lightweight, native desktop support
- Integrate **Deepgram API** for real-time speech-to-text
- Focus on **functionality, reliability, and clean code**
- Document architectural decisions clearly

---

## Tech Stack

### Desktop Framework
- **Tauri** – Cross-platform desktop app framework  
  - Smaller bundle size than Electron  
  - Native OS access and better performance  

### Frontend
- **React.js**
- React Hooks for state management
- Modular component-based architecture

### Speech Recognition
- **Deepgram API**
  - Real-time / near real-time transcription
  - Low latency speech recognition

---

## Core Features Implemented

###  Push-to-Talk Voice Input
- Hold or click a microphone button to start recording
- Release to stop recording

###  Microphone Access & Audio Capture
- Requests system microphone permission
- Captures high-quality audio input from the device

###  Real-Time Transcription
- Streams audio to Deepgram
- Receives transcribed text with minimal latency

###  Transcript Display
- Displays transcribed text clearly in the UI
- Allows clearing or copying transcript

###  Recording State Feedback
- Visual indicator for recording status
- Clear distinction between idle and active states

###  Error Handling
- Handles common issues such as:
  - Microphone permission denial
  - Network/API failures
  - Invalid or missing API keys

---
##  Getting Started

Follow the steps below to run the application locally.

## 1. Clone the Repository
- git clone <your-github-repo-url> (For cloneing the repo)
- cd voice-to-text-desktop-app

## 2. Install Dependencies
- npm install

## 3. Run the App (Web Mode)
- npm run dev

## 4. Run as Desktop App (Tauri)
- npm run tauri dev

---
## Deepgram API Setup

- Create a free account on Deepgram
- Generate an API key from the dashboard
- Enter the API key inside the application when prompted
- Allow microphone access and start recording
---
## Testing Workflow

- Verified microphone permission handling
- Tested push-to-talk start and stop recording
- Confirmed real-time transcription output
- Handled error cases such as missing API key and network issues
---
## Known Limitations

- User interface is intentionally minimal
- No authentication or user accounts
- Transcript export functionality not implemented
- Limited language configuration
---
## Author
Khushi Samundre


