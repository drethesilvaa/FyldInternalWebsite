import Image from "next/image";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

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

  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="flex flex-col ">
      <div className="absolute top-0 left-0 right-0 bottom-0">
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
          height={"60vh"}
        />
      </div>
      <div
        className=" z-10 bg-cover bg-center "
        style={
          !playing
            ? {
                backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${bannerImage.url})`,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }
            : {}
        }
        onClick={() => setPlaying(true)}
      >
        <div className=" bg-black/40  ">
          <div className="min-h-[60vh] pt-16 custom-container flex flex-col items-start justify-between w-full h-full ">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.url}`}
              alt={logo.alt || ""}
              width={600}
              height={111}
              className={" object-cover h-full rounded-md"}
            />
            <div className="controls flex gap-4 w-full pb-8">
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
                {playing ? "Pause" : "Play"}
              </button>

              <input
                type="range"
                className="range w-full"
                min={0}
                max={1}
                step="any"
                value={played}
                onChange={(e) => {
                  const newPlayed = parseFloat(e.target.value);
                  setPlayed(newPlayed);
                  playerRef.current?.seekTo(newPlayed, "fraction"); // ✅ Seek to new time
                }}
              />
              <button onClick={() => setMuted(!muted)}>
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
