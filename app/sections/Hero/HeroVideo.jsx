import {useEffect, useRef} from 'react';

export function HeroVideo({isVisible, posterSrc, videoSrc}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      controls={false}
      loop
      muted
      playsInline
      poster={posterSrc}
      ref={videoRef}
    >
      {isVisible && videoSrc && <source src={videoSrc} type="video/mp4" />}
    </video>
  );
}

HeroVideo.displayName = 'HeroVideo';
