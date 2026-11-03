'use client';

import React, { FC } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

// Helper function to extract YouTube Video ID from various link formats or raw ID
const getYouTubeVideoId = (url: string): string => {
  if (!url) return "";

  const trimmed = url.trim();

  // If directly an 11-char ID without slashes or query params
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Common YouTube URL regex patterns
  // Matches:
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  // - youtube.com/shorts/ID
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : trimmed;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-white/10 bg-black">
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title || "Course Video"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            No video available
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
