"use client"
import { VideoFrameContext } from "@/app/_context/VideoFramesContext";
import { FontList } from "@/app/_data/List";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { LetterText } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ColorPickerField from "./ColorPickerField";
import DropDown from "./DropDown";
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
        if (videoFrames?.frameList?.length > 0 && frame) {
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


                        {/* Duration DropDown */}
                        <DropDown defaultValue={frame?.duration} label={'Duration (in Sec)'}
                            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            handleInputChange={(value) => handleInputChange('duration', value)} />

                        {/* Font Size Select */}
                        <SliderField label={'Font size'}
                            defaultValue={frame?.fontSize}
                            handleInputChange={(value) => handleInputChange('fontSize', value)} />

                        {/* Font Family */}
                        <DropDown defaultValue={frame?.fontFamily} label={'Font Family'}
                            options={FontList}
                            handleInputChange={(value) => handleInputChange('fontFamily', value)} />

                        <ColorPickerField defaultColor={frame.textColor}
                            handleInputChange={(value) => handleInputChange('textColor', value)} />

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FrameConfig
