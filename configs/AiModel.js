import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

export async function generatePromo(userTopic, userDuration) {
  const prompt = `
Based on the following JSON template:
{
  "totalDuration": 10,
  "frameList": [
    {
      "image": "/footage.png",
      "text": "Exciting",
      "textColor": "rgba(0,0,0,1)",
      "fontSize": 34,
      "duration": 0.5,
      "fontFamily": "Bungee",
      "animation": "slideLeft",
      "bgColor": "#FFFFFF",
      "sticker": "https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif",
      "stickerSize": 0
    }
  ],
  "selectedFrame": 0,
  "music": "audio1.mp3"
}

Now generate a video promo in the same JSON format using:
- Topic: ${userTopic}
- Total duration: ${userDuration} seconds
- Keep 1 to 2 words per frame
- Use 0.5 or 1 second duration per frame
- Avoid repeating bgColor, textColor, and fontFamily
- Choose fontFamily from: Outfit, Bungee, Anton, Rowdies
- Optionally use gradient colors in bgColor
- Choose animation from: zoomIn, zoomOut, slideIn, slideOut, slideUp, slideDown, wobble, bounce, fadeIn, fadeOut
- Use this image: "/footage.png"
- Respond in valid JSON only
`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents,
    });

    let fullText = '';
    for await (const chunk of response) {
      if (chunk.text) {
        fullText += chunk.text;
      }
    }

    // Extract only JSON (if Gemini wraps it in ```json or anything else)
    const match = fullText.match(/```json([\s\S]*?)```/);
    const rawJson = match ? match[1].trim() : fullText.trim();

    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (err) {
      console.error("❌ Invalid JSON received from Gemini.");
      console.error(rawJson);
      return;
    }

    const exportCode = `export const Prompt = ${JSON.stringify(parsed, null, 2)};\n`;
    fs.writeFileSync("promoData.js", exportCode);
    console.log("✅ Promo data saved to promoData.js");

     return parsed;

  } catch (err) {
    console.error("❌ Error generating promo:", err.message);
  }
}
