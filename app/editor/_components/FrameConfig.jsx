"use client"
import { VideoFrameContext } from "@/app/_context/VideoFramesContext";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LetterText } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import SliderField from "./SliderField";
import TextAreaBox from "./TextAreaBox";

function FrameConfig() {

    const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);
    const [frame, setFrame] = useState([]);

    useEffect(() => {
        if (videoFrames?.frameList) {
            setFrame(videoFrames.frameList[videoFrames?.selectedFrame]);
            //console.log(videoFrames.frameList[videoFrames?.selectedFrame]);
        }
    }, [videoFrames])

    const handleInputChange = (field, value) => {
        setFrame(prev => ({
            ...prev,
            [field]: value
        }));
    };


    useEffect(() => {
        console.log(frame)
        if (videoFrames?.frameList?.length>0 && frame) {
            const frameList = videoFrames?.frameList;

            frameList[videoFrames?.selectedFrame] = frame;
            setVideoFrames(prev => ({
                ...prev,
                frameList: frameList
            }))
        }
    }, [frame])

    return (
        <div className='p-3 bg-zinc-200 rounded-lg'>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span className='flex gap-2 text-lg items-center'><LetterText />Text</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <TextAreaBox frame={frame}
                            handleInputChange={(value) => handleInputChange('text', value)} />
                            <SliderField label={'Font size'}
                            defaultValue={frame?.fontSize}
                            handleInputChange={(value) => handleInputChange('fontSize', value)} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FrameConfig
