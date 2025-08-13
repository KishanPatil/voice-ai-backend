#  Voice AI Backend

This is the **backend** service for the Voice AI application.  
It processes audio recorded from the frontend, converts it to a standard WAV format, and sends it to **Google Gemini API** for transcription or conversational AI responses.

---

##  Features
- **Audio Upload API** (`/api/voice`)
- Audio format conversion using **FFmpeg** (16kHz Mono WAV)
- Integration with **Google Gemini API** for speech-to-text and conversational AI
- **CORS** enabled for frontend communication
- **Multer** for in-memory audio uploads
- Modular structure with controllers, routes, and config

---

##  Project Structure
src/
├── config/
│ └── env.js # Environment variables
├── controllers/
│ └── voiceController.js # Handles audio processing
├── routes/
│ └── voiceRoute.js # API routes
├── services/
│ └── voiceService.js # Future API integrations
├── server.js # App entry point
└── uploads/ # Saved/converted audio files


---

##  Installation

1. **Clone the repository**
```bash
   git clone https://github.com/<your-username>/voice-ai-backend.git
   cd voice-ai-backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create .env file**
```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Running the Server**
```bash
   npm run dev
```

Server will start on:

http://localhost:3000


## API Endpoints
POST /api/voice
Uploads audio, converts it to WAV, and (optionally) sends it to Gemini API.

Request (Form-Data)

audio: Audio file from frontend (e.g., .webm, .m4a, .wav)

Example with curl:
```bash
curl -X POST -F "audio=@Recording.m4a" http://localhost:3000/api/voice
```

Response (Testing Mode)
```json
{
  "message": "Audio received and converted",
  "geminiResult": "UklGRv4qBABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAATElTVCgAAABJTkZPSUNNVAYAAAA4LjQ0OwBJU0ZUDQAAAExhdmY2MC4zLjEwMAAAZGF0YaoqBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
}
```

Response (Gemini Enabled)
```json
{
  "message": "Audio processed successfully",
  "geminiResult": {
    "candidates": [
      {
        "content": {
          "parts": [
            {
              "text": "That sounds like someone is trying to get your attention, perhaps through a phone call or a device with a microphone. The repeated \"Hello\" suggests they're trying to initiate contact.  The \"How are you?\" is a standard greeting. The final sound might be static or interference.\n"
            }
          ],
          "role": "model"
        },
        "finishReason": "STOP",
        "avgLogprobs": -0.38221055370266155
      }
    ],
    "usageMetadata": {
      "promptTokenCount": 201,
      "candidatesTokenCount": 59,
      "totalTokenCount": 260,
      "promptTokensDetails": [
        {
          "modality": "AUDIO",
          "tokenCount": 200
        },
        {
          "modality": "TEXT",
          "tokenCount": 1
        }
      ],
      "candidatesTokensDetails": [
        {
          "modality": "TEXT",
          "tokenCount": 59
        }
      ]
    },
    "modelVersion": "gemini-1.5-flash",
    "responseId": "mIGbaNWOG_acnvgPkP_YwQY"
  }
}
```


## Technologies Used
- Node.js + Express.js
- Multer for file uploads
- FFmpeg + fluent-ffmpeg for audio conversion
- Google Gemini API for AI processing
- CORS for cross-origin requests



## Future Improvements
- Implement real-time WebSocket streaming
- Save transcripts to a database
- Add authentication for API endpoints

## Author
Kishan Patil
Full Stack Developer
