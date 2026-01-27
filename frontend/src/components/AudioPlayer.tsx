"use client";

import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioTrack {
  url: string;
  title: string;
  tags?: string[];
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  return (
    <div className="audio-player-wrapper space-y-4 grid md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track, index) => (
        <div key={index} className="flex flex-col">
          <H5AudioPlayer
            header={
              <>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {track.title}
                </h3>
              </>
            }
            src={track.url}
            onEnded={() => {}}
            layout="stacked-reverse"
          />
        </div>
      ))}
    </div>
  );
}
