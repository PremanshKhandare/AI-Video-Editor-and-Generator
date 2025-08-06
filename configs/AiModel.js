// generatePromo.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

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

Now, generate a video promo in the same JSON format using:
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

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 1,
        topK: 40,
        responseMimeType: "application/json",
      },
    });

    const response = await result.response;
    const text = await response.text();  // ✅ Await here

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("❌ Invalid JSON received from Gemini.");
      return;
    }

    const exportCode = `export const Prompt = ${JSON.stringify(parsed, null, 2)};\n`;
    fs.writeFileSync("promoData.js", exportCode);
    console.log("✅ Promo data saved to promoData.js");
  } catch (err) {
    console.error("❌ Error generating promo:", err.message);
  }
}
