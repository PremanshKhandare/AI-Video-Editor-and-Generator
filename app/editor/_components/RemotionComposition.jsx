import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

function RemotionComposition({ frameList }) {

  let trackFrame = 0;
  const { width, height } = useVideoConfig();

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
                transform: `translateX(${width / 2 - 50}px) translateY(${height / 2 - 20}px)`
              }}>
                <h2 style={{ 
                  color: 'white',
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
