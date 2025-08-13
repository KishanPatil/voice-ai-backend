import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';


ffmpeg.setFfmpegPath(ffmpegStatic);

const UPLOAD_DIR = path.resolve('uploads');
await fs.mkdir(UPLOAD_DIR, { recursive: true });

async function sendAudioToGemini(wavBuffer) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{
            inlineData: {
              mimeType: 'audio/wav',
              data: wavBuffer.toString('base64')
            }
          }]
        }]
      })
    }
  );
  return await response.json();
}

export async function processAudioFile(file) {
  // Save incoming file
  const id = uuidv4();
  const inputPath = path.join(UPLOAD_DIR, `${id}-input`);
  const originalExt = file.originalname.split('.').pop() || 'webm';
  const inputFile = `${inputPath}.${originalExt}`;
  await fs.writeFile(inputFile, file.buffer);

  // Convert to 16kHz mono WAV
  const outWav = path.join(UPLOAD_DIR, `${id}.wav`);
  await new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .audioChannels(1)
      .audioFrequency(16000)
      .toFormat('wav')
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(outWav);
  });

  const wavBuffer = await fs.readFile(outWav);
  // enable this for dev testing checking api response
    // const wavBase64 = wavBuffer.toString('base64');

  // for live production, send to Gemini
  const geminiResult = await sendAudioToGemini(wavBuffer);

  return geminiResult;

  // for testing, return the first 200 characters of the base64 string
  // return wavBase64.slice(0, 200)
}
