"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  Pause,
  Play,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  FrameCorners,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface Props {
  videoUrl: string;
  bannerImage: any;
  logo: any;
}

export const Hero: React.FC<Props> = ({ videoUrl, bannerImage, logo }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`${
        isFullscreen ? "min-h-[100vh]" : "min-h-[60vh]"
      } flex flex-col relative`}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0">
        {videoUrl && (
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={({ played }) => setPlayed(played)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            width={"100%"}
            height={isFullscreen ? "100vh" : "60vh"}
          />
        )}
      </div>
      <div
        className=" z-10 bg-cover bg-center "
        style={
          !playing
            ? {
                backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${bannerImage?.url})`,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }
            : {}
        }
        onClick={() => setPlaying(true)}
      >
        <div className=" bg-black/40  ">
          <div
            className={`${
              isFullscreen ? "min-h-[100vh]" : "min-h-[60vh]"
            }  pt-16 custom-container flex flex-col items-start justify-between w-full h-full `}
          >
            {logo && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logo?.url}`}
                  alt={logo?.alt || ""}
                  width={600}
                  height={111}
                  className="object-cover h-full rounded-md"
                />
              </motion.div>
            )}

            <motion.div
              className="controls flex items-center gap-4 w-full pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              <button
                onClick={() => {
                  const internalPlayer = playerRef.current?.getInternalPlayer();
                  if (playing) {
                    internalPlayer?.pauseVideo?.();
                  } else {
                    internalPlayer?.playVideo?.();
                  }
                }}
              >
                {playing ? (
                  <Pause color={"var(--color-base-100)"} size={32} />
                ) : (
                  <Play color={"var(--color-base-100)"} size={32} />
                )}
              </button>

              <button onClick={() => setMuted(!muted)}>
                {muted ? (
                  <SpeakerSimpleSlash
                    color={"var(--color-base-100)"}
                    size={32}
                  />
                ) : (
                  <SpeakerSimpleHigh
                    color={"var(--color-base-100)"}
                    size={32}
                  />
                )}
              </button>

              <input
                type="range"
                className="range w-full [--range-bg:var(--color-base-300)] [--range-thumb:none] [--range-fill:1] range-sm"
                min={0}
                max={1}
                step="any"
                value={played}
                onChange={(e) => {
                  const newPlayed = parseFloat(e.target.value);
                  setPlayed(newPlayed);
                  playerRef.current?.seekTo(newPlayed, "fraction");
                }}
              />

              <button onClick={toggleFullscreen}>
                <FrameCorners color={"var(--color-base-100)"} size={32} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
