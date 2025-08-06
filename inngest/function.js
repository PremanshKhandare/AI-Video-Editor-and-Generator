import { generatePromo } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { inngest } from "./client";

export const GenerateAIVideoData = inngest.createFunction(
  { id: "generate-ai-video-data" },
  { event: "ai/generate-video-data" },
  async ({ event, step }) => {
    const { prompt, videoId } = event.data;

    // Generate AI Content
    const generateVideoData = await step.run("Generate AI Video Data", async () => {
      return await generatePromo(prompt); // ✅ Direct call
    });

    // Update our Record using videoId
    const updateRecord = await step.run("Update record using videoId", async () => {
      const result = await db
        .update(VIDEO_RAW_TABLE)
        .set({ videoData: generateVideoData })
        .where(eq(VIDEO_RAW_TABLE.videoId, videoId))
        .returning(VIDEO_RAW_TABLE);

      return result;
    });

    return updateRecord;
  }
);
