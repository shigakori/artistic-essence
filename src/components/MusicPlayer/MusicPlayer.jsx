"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "./MusicPlayer.css";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lottie, setLottie] = useState(null);
  const audioRef = useRef(null);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    import("lottie-web").then((lottieModule) => {
      setLottie(lottieModule.default);
    });
  }, []);

  useEffect(() => {
    if (!lottie || !containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "https://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
    });

    lottieRef.current = animation;

    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/artistic-essence/relax.mp3");
    }

    return () => {
      animation.destroy();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [lottie]);

  const toggleMusic = () => {
    if (!audioRef.current || !lottieRef.current) return;

    if (!isPlaying) {
      audioRef.current.play();
      lottieRef.current.playSegments([0, 120], true);
    } else {
      audioRef.current.pause();
      lottieRef.current.stop();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <div className="music-player__btn" onClick={toggleMusic} data-pointer="hover">
        <div
          ref={containerRef}
          className="music-player__bars"
          style={{ width: "20px", height: "20px" }}
        />
        <p>{isPlaying ? "on" : "off"}</p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MusicToggle), {
  ssr: false,
});
