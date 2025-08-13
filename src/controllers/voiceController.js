import { processAudioFile } from '../services/voiceService.js';

export const processAudio = async (req, res, next) => {
  try {
    console.log('Processing audio file upload');
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const geminiResult = await processAudioFile(req.file);

    return res.json({
      message: 'Audio received and converted',
      geminiResult 
    });
  } catch (err) {
    next(err);
  }
};
