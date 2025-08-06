import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { prompt, videoId } = await req.json();

    await inngest.send({
        name: "ai/generate-video-data",
        data: {
            prompt:prompt,
            videoId:videoId,
        },
    });

    return NextResponse.json({result:'Event Sent!'})
}