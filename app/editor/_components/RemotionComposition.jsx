import { VideoFrameContext } from '@/app/_context/VideoFramesContext';
import { TextAnimation } from '@/app/_data/Animations';
import * as Anton from '@remotion/google-fonts/AntonSC';
import * as Bungee from '@remotion/google-fonts/Bungee';
import * as Pacifico from '@remotion/google-fonts/Pacifico';
import * as Parkinsans from '@remotion/google-fonts/Parkinsans';
import { useContext } from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionComposition({ frameList }) {
  const { videoFrames, setVideoFrames } = useContext(VideoFrameContext);


  let trackFrame = 0;
  const { width, height, fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();

  Bungee.loadFont();
  Anton.loadFont();
  Parkinsans.loadFont();
  Pacifico.loadFont();

  return (
    <div>
      <AbsoluteFill style={{ backgroundColor: 'black' }}>
        {frameList.map((frame, index) => {
          const duration = Number(frame.duration) * 30 || 30; // fallback to 30 frames
          const fromFrame = index === 0 ? 0 : trackFrame;
          trackFrame += duration;

          if (!Number.isFinite(fromFrame) || !Number.isFinite(duration)) {
            console.warn(`Skipping frame ${index} due to invalid values`, frame);
            return null;
          }

          return (
            <Sequence key={index} from={fromFrame}
              durationInFrames={duration}
              style={{
                background: frame?.bgColor,
              }}>

              <AbsoluteFill>
                {frame?.sticker && <img src={frame?.sticker} alt={'emoji'}
                  width={50} height={50}
                  style={{
                    transform: `scale(${frame?.stickerSize}) translateX(${frame?.stickerPositionX}px) translateY(${frame?.stickerPositionY}px)`,
                  }} 
                  />}
              </AbsoluteFill>

              <AbsoluteFill style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                fontFamily: frame?.fontFamily
                //transform: `translateX(${width / 2 - 50}px) translateY(${height / 2 - 20}px)`
              }}>
                <h2 style={{
                  color: frame?.textColor,
                  fontSize: frame?.fontSize,
                  transform: `${TextAnimation(frame.animation, currentFrame, fps, fromFrame, width, height)}`
                }}>
                  {frame.text}
                </h2>
              </AbsoluteFill>



            </Sequence>
          );
        })}

        {videoFrames?.music && typeof videoFrames.music === 'string' && (
          <Audio volume={0.5} src={staticFile(videoFrames.music)} />
        )}
      </AbsoluteFill>
    </div>
  );
}

export default RemotionComposition;
