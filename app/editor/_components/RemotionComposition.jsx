import * as Anton from '@remotion/google-fonts/AntonSC';
import * as Bungee from '@remotion/google-fonts/Bungee';
import * as Pacifico from '@remotion/google-fonts/Pacifico';
import * as Parkinsans from '@remotion/google-fonts/Parkinsans';
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

function RemotionComposition({ frameList }) {

  let trackFrame = 0;
  const { width, height } = useVideoConfig();

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
            <Sequence key={index} from={fromFrame} durationInFrames={duration}>
              <AbsoluteFill style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: frame?.fontFamily
                //transform: `translateX(${width / 2 - 50}px) translateY(${height / 2 - 20}px)`
              }}>
                <h2 style={{ 
                  color: frame?.textColor,
                  fontSize: frame?.fontSize 
                  }}>
                  {frame.text}
                </h2>
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </div>
  );
}

export default RemotionComposition;
