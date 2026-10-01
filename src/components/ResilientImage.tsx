import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  objectPosition?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  objectPosition = 'center center',
  className = '',
  style,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#e5e0d5] text-[#4a463f] p-6 text-center w-full h-full ${className}`}
        style={style}
      >
        <svg
          className="w-8 h-8 mb-2 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
        <span className="font-syne text-xs font-bold tracking-wider">
          {fallbackLabel || alt || 'Mimari Sığınak Görseli'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Mimari Görünüm'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      style={{ objectPosition, ...style }}
      {...rest}
    />
  );
};
