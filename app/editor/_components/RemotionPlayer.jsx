import { VideoFrameContext } from "@/app/_context/VideoFramesContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Player } from "@remotion/player";
import { Fullscreen } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import RemotionComposition from './RemotionComposition';


function RemotionPlayer() {
    const { videoFrames, setVideoFrames } = useContext(VideoFrameContext)

    const [screenSize, setScreenSize] = useState(({
        width: 500,
        height: 300
    }))

    const playerRef = useRef(null);

    useEffect(() => {
        if (videoFrames?.selectedFrame) {
            let skipDuration = 0;
            for (let i = 0; i < videoFrames?.selectedFrame; i++) {
                skipDuration = skipDuration + videoFrames.frameList[i].duration
            }
            playerRef?.current?.seekTo(skipDuration * 30);
        }
    }, [videoFrames?.selectedFrame])

    return (
        <div>
            <div className='flex items-center justify-center'>
                {Number.isFinite(videoFrames?.totalDuration) &&
                    <Player
                        ref={playerRef}
                        component={RemotionComposition}
                        durationInFrames={Math.floor(videoFrames.totalDuration * 30)}
                        compositionWidth={screenSize.width}
                        compositionHeight={screenSize.height}
                        fps={30}
                        controls
                        style={{
                            borderRadius: 6,
                            width: '100%',
                            height: 300
                        }}
                        inputProps={{
                            frameList: videoFrames?.frameList
                        }}
                    />
                }

            </div>

            <div className='mt-5 flex gap-2 items-center px-15'>
                <Fullscreen />
                <Select onValueChange={(v) => setScreenSize(JSON.parse(v))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="16:9" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={JSON.stringify({ width: 400, height: 400 })}>1:1</SelectItem>
                        <SelectItem value={JSON.stringify({ width: 500, height: 300 })}>16:9</SelectItem>
                        <SelectItem value={JSON.stringify({ width: 300, height: 500 })}>9:16</SelectItem>
                    </SelectContent>
                </Select>

            </div>

        </div>
    )
}

export default RemotionPlayer
