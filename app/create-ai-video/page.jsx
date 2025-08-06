"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";
import uuid4 from "uuid4";
import { Prompt } from "../_data/Prompt";
import Header from "../dashboard/_components/Header";
import DropDown from "../editor/_components/DropDown";

function CreateAiVideo() {

    const DurationOption=Array.from({length:10},(_,index)=>index*5)
    console.log(DurationOption);
    const {user}=useUser();

    const [topic,setTopic]=useState('');
    const [duration,setDuration]=useState(5);

    const OnGenerateClick=async()=>{
        const videoId=uuid4();
        // Create new record to DB
        const result = await axios.post('/api/video',{
            videoId:videoId,
            userEmail: user?.primaryEmailAddress?.emailAddress
        })

        console.log(result.data);

        // Generate content for video using AI
        const PROMPT = Prompt.replace('{userTopic}',topic).replace('{userDuration}',duration)
        const aiResult = await axios.post('/api/create-ai-content',{
            videoId:videoId,
            prompt:PROMPT
        })

        console.log(aiResult.data)
    }

    return (
        <div>
            <Header />

            <div className='flex flex-col items-center 
            justify-center px-10 md:px-32 lg:px-48 mt-24'>
                <h2 className='font-bold text-3xl'>Generate Video Content for your Next Video</h2>
                <div className='w-full max-w-xl mt-7 '>
                    <label>Topic:</label>
                    <Textarea className='w-full' 
                    onChange={(event)=>setTopic(event?.target.value)}
                    />
                </div>
                <div className='w-full max-w-xl mt-7 '>
                    <label>Select Duration of Video (In Seconds):</label>
                    <DropDown defaultValue={5} 
                    handleInputChange={(value)=>setDuration(value)}
                    options={DurationOption}
                    />
                </div>

                <Button className='w-full mt-5 max-w-xl'
                onClick={OnGenerateClick}
                disabled={topic?.length<=0 || duration==0}
                >Generate</Button>
            </div>
        </div>
    )
}

export default CreateAiVideo
