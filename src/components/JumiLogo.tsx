import React from 'react';

interface JumiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  lightMode?: boolean; // when placed on dark backgrounds
}

export const JumiLogo: React.FC<JumiLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  lightMode = false,
}) => {
  // Height configurations
  const heightMap = {
    sm: { h: 32, w: 140 },
    md: { h: 42, w: 185 },
    lg: { h: 54, w: 236 },
    xl: { h: 72, w: 315 },
  };

  const { h, w } = heightMap[size];

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 240 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Blue gradient for J & left loop */}
          <linearGradient id="jumiBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>

          {/* Teal / Green gradient for u & center loop */}
          <linearGradient id="jumiGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00966B" />
            <stop offset="50%" stopColor="#00C49F" />
            <stop offset="100%" stopColor="#05B374" />
          </linearGradient>

          {/* Yellow / Orange gradient for M & top loop */}
          <linearGradient id="jumiYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC700" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>

          {/* Orange / Red gradient for i & head dots */}
          <linearGradient id="jumiOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>
        </defs>

        {/* ================= LEFT EMBLEM: CONNECTING INTERLOCKED FIGURES ================= */}
        <g transform="translate(4, 8)">
          {/* Yellow/Orange Top Circle Arc */}
          <circle
            cx="34"
            cy="28"
            r="19"
            stroke="url(#jumiYellow)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Blue Left Figure Arc */}
          <path
            d="M 24 16 A 17 17 0 1 0 24 40"
            stroke="url(#jumiBlue)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Teal Center Connection Circle */}
          <circle
            cx="35"
            cy="28"
            r="11"
            stroke="url(#jumiGreen)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Green Right Loop Arc */}
          <path
            d="M 44 16 A 16 16 0 0 1 44 40"
            stroke="url(#jumiGreen)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Orange Head Dots */}
          <circle cx="21" cy="27" r="3.2" fill="#FF5E1E" />
          <circle cx="34" cy="28" r="3.2" fill="#FF5E1E" />
          <circle cx="47" cy="27" r="3.2" fill="#FFB300" />
        </g>

        {/* ================= RIGHT WORDMARK: JuMi connect. ================= */}
        <g transform="translate(76, 4)">
          {/* --- JuMi Letters --- */}
          {/* 'J' - Blue */}
          <path
            d="M 6 8 L 17 8 C 19 8 20 9 20 11 L 20 28 C 20 37 13 42 3 42 C -4 42 -8 38 -8 34 C -8 31 -5 30 -3 30 C 0 30 2 32 4 33 C 7 34 10 33 11 30 C 12 28 12 26 12 22 L 12 11 C 12 9 10 9 7 9 C 5 9 4 7 6 8 Z"
            fill="url(#jumiBlue)"
          />
          {/* Custom sculpted J */}
          <rect x="10" y="8" width="9" height="23" rx="4.5" fill="url(#jumiBlue)" />
          <path
            d="M 19 26 C 19 36 12 40 4 40 C -1 40 -4 37 -4 34 C -4 31.5 -1.5 30.5 1 30.5 C 3.5 30.5 5 32 7.5 32.5 C 10.5 33 11.5 31.5 11.5 28 L 11.5 24 Z"
            fill="url(#jumiBlue)"
          />

          {/* 'u' - Teal Green */}
          <path
            d="M 26 16 L 26 29 C 26 36 31 40 37 40 C 43 40 48 36 48 29 L 48 16 C 48 14 51 14 51 16 L 51 29 C 51 38 44 43 37 43 C 30 43 23 38 23 29 L 23 16 C 23 14 26 14 26 16 Z"
            fill="url(#jumiGreen)"
          />
          {/* Smooth 'u' stem */}
          <rect x="23" y="16" width="7" height="15" rx="3.5" fill="url(#jumiGreen)" />
          <rect x="44" y="16" width="7" height="24" rx="3.5" fill="url(#jumiGreen)" />
          <path
            d="M 23 27 C 23 36 30 41 38.5 41 C 47 41 51 36 51 27 L 44 27 C 44 33 41 36 37 36 C 33 36 30 33 30 27 Z"
            fill="url(#jumiGreen)"
          />

          {/* 'M' - Yellow to Orange */}
          <g transform="translate(56, 14)">
            <rect x="0" y="2" width="7" height="25" rx="3.5" fill="url(#jumiYellow)" />
            <rect x="14" y="2" width="7" height="25" rx="3.5" fill="url(#jumiYellow)" />
            <rect x="28" y="2" width="7" height="25" rx="3.5" fill="url(#jumiYellow)" />
            <path
              d="M 0 5 C 0 0 14 0 14 5"
              stroke="url(#jumiYellow)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 14 5 C 14 0 28 0 28 5"
              stroke="url(#jumiYellow)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          {/* 'i' - Tangerine Orange with 3 radiant spray dots */}
          <g transform="translate(98, 14)">
            <rect x="0" y="2" width="7.5" height="25" rx="3.75" fill="url(#jumiOrange)" />
            
            {/* 3 Spray bursts above 'i' */}
            {/* Left dot: Orange */}
            <circle cx="-3" cy="-7" r="3.2" fill="#FFA000" />
            {/* Middle droplet: Green */}
            <path
              d="M 3.8 -14 C 5 -14 5.5 -10 5.5 -7 C 5.5 -5 4 -4 3.8 -4 C 3.6 -4 2 -5 2 -7 C 2 -10 2.5 -14 3.8 -14 Z"
              fill="#00C853"
            />
            {/* Right droplet: Blue */}
            <path
              d="M 12 -12 C 13.5 -11 12.5 -7 11 -5 C 9.5 -3.5 8 -4.5 8.5 -6 C 9 -7.5 10.5 -13 12 -12 Z"
              fill="#0091EA"
            />
          </g>

          {/* --- connect. in Teal Navy with smile under 'o' --- */}
          <g transform="translate(0, 48)">
            <text
              x="0"
              y="18"
              fontFamily="'Jost', 'Plus Jakarta Sans', sans-serif"
              fontSize="24"
              fontWeight="900"
              letterSpacing="-0.5px"
              fill={lightMode ? "#E0F2F1" : "#014856"}
            >
              connect
            </text>
            {/* The signature smile curve under 'o' */}
            <path
              d="M 23 20 C 26 23 31 23 34 20"
              stroke="#00C49F"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* The golden period dot */}
            <circle cx="89" cy="16" r="3.5" fill="#FFB300" />
          </g>
        </g>

        {/* ================= TAGLINE: — Come Together — ================= */}
        {showTagline && (
          <g transform="translate(36, 75)">
            {/* Left golden rule */}
            <line x1="0" y1="0" x2="32" y2="0" stroke="#FFA700" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Text */}
            <text
              x="42"
              y="3"
              fontFamily="'Jost', sans-serif"
              fontSize="11.5"
              fontWeight="700"
              letterSpacing="0.8px"
              fill={lightMode ? "#B2DFDB" : "#005766"}
            >
              Come Together
            </text>
            
            {/* Right golden rule */}
            <line x1="148" y1="0" x2="180" y2="0" stroke="#FFA700" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
