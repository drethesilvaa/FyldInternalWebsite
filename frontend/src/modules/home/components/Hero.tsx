import { useState, useRef } from "react";
import ReactPlayer from "react-player";

interface Props {
  videoUrl: string;
  bannerImage: any;
}

export const Hero: React.FC<Props> = ({ videoUrl, bannerImage }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="flex flex-col min-h-[60vh]">
      <div className="h-full w-full" style={{ position: "relative" }}>
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
        {!playing && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-2xl cursor-pointer transition-opacity bg-cover bg-center"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${bannerImage.url})`,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => setPlaying(true)}
          ></div>
        )}
        <div className="controls">
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            className="range"
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
  );
};
