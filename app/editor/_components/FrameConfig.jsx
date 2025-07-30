"use client"
import { VideoFrameContext } from "@/app/_context/VideoFramesContext";
import { AnimationList, FontList } from "@/app/_data/List";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Layers, LetterText, Smile, SwatchBook } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import BackgroundField from "./BackgroundField";
import ColorPickerField from "./ColorPickerField";
import DropDown from "./DropDown";
import EmojiField from "./EmojiField";
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
                <Accordion type="single" collapsible>
                    <AccordionItem value="background">
                        <AccordionTrigger>
                            <span className='flex gap-2 text-lg items-center'>
                                <SwatchBook />Background</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <BackgroundField defaultValue={frame.bgColor}
                                handleInputChange={(value) => handleInputChange('bgColor', value)} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="animation" collapsible>
                    <AccordionItem value="background">
                        <AccordionTrigger>
                            <span className='flex gap-2 text-lg items-center'>
                                <Layers />Animation</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <DropDown
                                defaultValue={frame?.animation}
                                labei={'Text Animation'}
                                options={AnimationList}
                                handleInputChange={(value) => handleInputChange('animation', value)} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sticker">
                        <AccordionTrigger>
                            <span className='flex gap-2 text-lg items-center'>
                                <Smile />Sticker</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <EmojiField handleInputChange={(value) => handleInputChange('sticker', value)} />
                            <SliderField defaultValue={frame?.stickerSize ?? '0.5'}
                                label={'Size'}
                                max={4}
                                step={0.5}
                                handleInputChange={(value) => handleInputChange('stickerSize', value)}
                            />
                            <div className='flex gap-5 w-full'>
                                <SliderField
                                    label={'PositionX'}
                                    defaultValue={frame?.stickerPositionX ?? '100'}
                                    max={450}
                                    handleInputChange={(value) => handleInputChange('stickerPositionX', value)}
                                />
                                <SliderField
                                    label={'PositionY'}
                                    defaultValue={frame?.stickerPositionY ?? '100'}
                                    max={200}
                                    handleInputChange={(value) => handleInputChange('stickerPositionY', value)}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </Accordion>
        </div>
    )
}

export default FrameConfig
