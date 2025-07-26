"use client"
import { VideoFrameContext } from "@/app/_context/VideoFramesContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const defaultFrame = {
    image: '/footage.png',
    text: 'Hello World',
    textColor: 'black',
    fontSize: 20,
    duration: 2,
    fontFamily: 'Bungee',
    bgColor: '#ffffff'
}

function TrackList() {

    const [frameList, setFrameList] = useState([defaultFrame]);
    const [selectedFrame, setSelectedFrame] = useState(0);
    const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);

    const addNewFrame = () => {
        setFrameList(prev => [...prev, defaultFrame])
    }

    const removeFrame = (indexToRemove) => {
        const updatedFrameList = frameList?.filter((_, index) => index !== indexToRemove);
        setFrameList(updatedFrameList);
    }

    useEffect(() => {
        let totalDuration = 0;
        if (frameList) {
            frameList?.forEach(frame => {
                totalDuration = totalDuration + frame.duration;
            })

            frameList && setVideoFrames({
                totalDuration: totalDuration,
                frameList: frameList,
                selectedFrame: selectedFrame
            })
        }

    }, [frameList, selectedFrame])

    useEffect(() => {
        if (videoFrames && videoFrames.frameList !== frameList) {
            setFrameList(videoFrames.frameList);
        }
    }, [videoFrames])

    return (
        <div className='p-5 bg-gray-100 rounded-lg'>
            <div className='h-[65vh] overflow-scroll p-2'>
                {frameList?.map((frame, index) => (
                    <div key={index}
                        className={`flex flex-col items-center border-b p-2 mt-3 rounded-lg cursor-pointer
                    ${selectedFrame == index && 'bg-white'}`} onClick={() => setSelectedFrame(index)}>
                        {frame.image ? (
                            <Image
                                src={frame.image}
                                alt={`frame-${index}`}
                                width={40}
                                height={40}
                                className='w-full h-[40px] object-contain rounded-lg'
                            />
                        ) : null}

                        <h2 className='text-xs line-clamp-2 mt-1'>{frame.text}</h2>

                        {selectedFrame == index &&
                            <Trash2 className='mt-1 h-3 w-3 text-red-500'
                                onClick={() => removeFrame(index)}
                            />}
                    </div>
                ))}
                <Button size='sm' className='mt-5 w-full' onClick={addNewFrame}>Add New Frame</Button>
            </div>
        </div>
    )
}

export default TrackList
