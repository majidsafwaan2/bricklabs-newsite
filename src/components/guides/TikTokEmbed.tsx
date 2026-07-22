"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import type { VerifiedTikTokVideo } from "@/content/guides/types";

export function TikTokEmbed({ video }: { video: VerifiedTikTokVideo }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedUrl = `https://www.tiktok.com/player/v1/${video.postId}?autoplay=0`;

  return (
    <section className="guide-media-block" aria-labelledby="original-video-title">
      <div>
        <p className="eyebrow">First-party media</p>
        <h2 id="original-video-title">Watch the original BrickLabClips build</h2>
        <p>{video.caption}</p>
      </div>
      {isLoaded ? (
        <iframe
          src={embedUrl}
          title={`BrickLabClips TikTok: ${video.caption}`}
          allow="fullscreen"
          loading="lazy"
        />
      ) : (
        <button className="video-consent" type="button" onClick={() => setIsLoaded(true)}>
          <Play size={28} aria-hidden="true" />
          <span><strong>Load TikTok video</strong><small>This connects to TikTok only after you choose to load it.</small></span>
        </button>
      )}
      <a className="text-link" href={video.url} target="_blank" rel="noreferrer">Open the original post on TikTok</a>
    </section>
  );
}
