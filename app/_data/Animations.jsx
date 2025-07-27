import { interpolate, spring } from "remotion";

export const ZoomIn = (frame, fps, fromFrame) => {
    // Calculate scale using spring animation
    const scale = spring({
        frame: frame - fromFrame,
        fps,
        config: {
            damping: 20,
            mass: 0.5,
        },
    });

    const zoom = interpolate(scale, [0, 1], [0.5, 1.5]);
    // Determine the final scale based on direction
 

    return `scale(${zoom})`;

}

export const ZoomOut = (frame, fps, fromFrame) => {
    // Calculate scale using spring animation
    const scale = spring({
        frame: frame - fromFrame,
        fps,
        config: {
            damping: 10,
            mass: 0.5,
        },
    });

    const zoom = interpolate(scale, [0, 1], [4.5, 3.0]);
    // Determine the final scale based on direction

    return `scale(${zoom})`;
}

const SlideLeft = (frame,fps,fromFrame,width ) => {
    // Spring for smooth slide-in from left
    const slide = spring({
        frame: frame - fromFrame,
        fps,
        config: {
            damping: 20,
            stiffness: 100,
        },
    });

    // Interpolate position from off-screen to the center
    const translateX = interpolate(slide, [0, 1], [-width, 0]);
    return `translateX(${translateX}px)`;
}

const SlideRight = (frame,fps,fromFrame,width ) => {
    // Spring for smooth slide-in from left
    const slide = spring({
        frame: frame - fromFrame,
        fps,
        config: {
            damping: 20,
            stiffness: 100,
        },
    });

    // Interpolate position from off-screen to the center
     const translateX = interpolate(isNaN(slide) ? 0 : Number(slide.toFixed(0)), [0, 1], [width,0 ]);
    return `translateX(${translateX}px)`;
}

export const SlideUp = (frame, fps, fromFrame, height) => {
    const slide = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 20,
        stiffness: 100,
      },
    });
  
    const translateY = interpolate(slide, [0, 1], [height, 0]);
    return `translateY(${translateY}px)`;
  };

  export const SlideDown = (frame, fps, fromFrame, height) => {
    const slide = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 20,
        stiffness: 100,
      },
    });
  
    const translateY = interpolate(slide, [0, 1], [-height, 0]);
    return `translateY(${translateY}px)`;
  };

  export const Bounce = (frame, fps, fromFrame, intensity = 20) => {
    const bounce = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 10,
        stiffness: intensity,
      },
    });
  
    const translateY = interpolate(bounce, [0, 1], [0, -20]);
    return `translateY(${translateY}px)`;
  };

  export const Wobble = (frame, fps, fromFrame, intensity = 10) => {
    const wobble = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 10,
        stiffness: intensity,
      },
    });
  
    const rotate = interpolate(wobble, [0, 1], [-10, 10]);
    return `rotate(${rotate}deg)`;
  };

  export const FadeIn = (frame, fps, fromFrame) => {
    const opacity = interpolate(
      frame - fromFrame,
      [0, fps],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  
    return`${opacity}`;
  };

  export const FadeOut = (frame, fps, fromFrame) => {
    const opacity = interpolate(
      frame - fromFrame,
      [0, fps],
      [1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  
    return `${opacity}`;
  };

  export const ScaleIn = (frame, fps, fromFrame, startScale = 0.5, endScale = 1) => {
    const scale = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 20,
        stiffness: 100,
      },
    });
  
    const scaleValue = interpolate(scale, [0, 1], [startScale, endScale]);
    return `scale(${scaleValue})`;
  };

  export const ZoomBounceText = (frame, fps, fromFrame, startScale = 0.5, endScale = 1.2) => {
    const zoom = spring({
      frame: frame - fromFrame,
      fps,
      config: {
        damping: 10,
        stiffness: 120,
      },
    });
  
    const scale = interpolate(zoom, [0, 1], [startScale, endScale]);
    return `scale(${scale})`;
  };
  
  

export const TextAnimation = (type, frame=30, fps, fromFrame=0,width,height) => {
//   if (isNaN(frame) || isNaN(fromFrame)) {
//     return 0; // Default value or early return
// }
   
    if (type == 'zoomIn') {
        return ZoomIn(frame, fps, fromFrame);
    }
    else if (type == 'zoomOut') {
        return ZoomOut(frame, fps, fromFrame);
    }
    else if (type == 'slideLeft') {
        return SlideLeft(frame, fps, fromFrame,width);
    }
    // else if (type == 'slideRight') {
    //     return SlideRight(frame, fps, fromFrame,height);
    // }
    else if (type == 'slideUp') {
        return SlideUp(frame, fps, fromFrame,height);
    }
    else if (type == 'slideDown') {
        return SlideDown(frame, fps, fromFrame,height);
    }
    else if (type == 'bounce') {
        return Bounce(frame, fps, fromFrame,50);
    }
    else if (type == 'wobble') {
        return Wobble(frame, fps, fromFrame);
    }
    else if (type == 'fadeIn') {
        return FadeIn(frame, fps, fromFrame);
    }
    else if (type == 'fadeOut') {
        return FadeOut(frame, fps, fromFrame);
    }
    else if (type == 'scaleIn') {
        return ScaleIn(frame, fps, fromFrame);
    }
    else if (type == 'zoomBounceText') {
        return ZoomBounceText(frame, fps,fromFrame);
    }else{
      return ZoomIn(frame, fps, fromFrame);

    }

}