import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){

    const {videoId,userEmail}=await req.json();

    const result=await db.insert(VIDEO_RAW_TABLE).values({
        videoId:videoId,
        createdBy:userEmail
    }).returning(VIDEO_RAW_TABLE)

    return NextResponse.json({result})
}

export async function PUT(req) {

    const {videoId,videoData}=await req.json();

    const result=await db.update(VIDEO_RAW_TABLE).set({
        videoData:videoData,
    }).where(eq(VIDEO_RAW_TABLE.videoId,videoId))
    .returning(VIDEO_RAW_TABLE)

    return NextResponse.json({result})
}

export async function GET(req){
    const {searchParams}= new URL(req.url);

    const videoId=searchParams.get('videoId');

    const result=await db.select().from(VIDEO_RAW_TABLE)
    .where(eq(VIDEO_RAW_TABLE.videoId,videoId));

    return NextResponse.json(result[0])
}