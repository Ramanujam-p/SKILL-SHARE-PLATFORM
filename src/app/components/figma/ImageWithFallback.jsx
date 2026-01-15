import React, { useState } from "react";

/**
 * Base64 inline SVG shown when the image fails to load
 */
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/**
 * ImageWithFallback
 * -----------------
 * - Displays an image normally
 * - If loading fails, shows a clean fallback placeholder
 * - Safe for landing pages, dashboards, cards, avatars
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  ...rest
}) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${
          className || ""
        }`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt="Image failed to load"
            data-original-url={src}
            {...rest}
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => setDidError(true)}
      {...rest}
    />
  );
}
