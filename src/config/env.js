import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: 'models/gemini-2.5-flash-preview-native-audio-dialog'
};
