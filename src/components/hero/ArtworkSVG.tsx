import { useId, type ReactNode } from "react";

export type ArtMode = "raster" | "stitch" | "vector";

/**
 * One piece of sample artwork rendered three ways from the same geometry:
 *  - raster: the blurry, posterised JPG a customer typically emails in
 *  - stitch: a digitized preview — satin/fill thread patterns on twill
 *  - vector: the clean redraw with bezier anchors exposed
 * Everything is inline SVG so the hero ships with zero image requests.
 */

// Muted thread palette: walnut, ochre, dusty blue, sage on cream.
const C = {
  navy: "#4a3f36",
  ring: "#7a5a43",
  cream: "#f3ebdd",
  sun: "#c99a4b",
  mtn: "#6f8291",
  snow: "#fbf8f2",
  hill: "#8e9a7e",
  banner: "#7a5a43",
  text: "#fbf8f2",
} as const;

type Key = keyof typeof C;

// Stitch direction per region. Varying angles is what makes real embroidery catch light.
const ANGLE: Record<Key, number> = {
  navy: 0,
  ring: 0,
  cream: 35,
  sun: 90,
  mtn: -40,
  snow: 50,
  hill: 20,
  banner: 90,
  text: 0,
};

const MOUNTAIN = "70,290 165,150 225,230 260,190 330,290";
const SNOW = "165,150 189,182 180,188 170,180 160,190 152,178 141,185";
const HILL = "M58 300 Q140 248 210 278 T344 286 L344 344 L58 344 Z";
const BANNER = "M42 262 H358 L344 290 L358 318 H42 L56 290 Z";

// Vertices shown as anchor handles in vector mode.
const ANCHORS: [number, number][] = [
  [70, 290], [165, 150], [225, 230], [260, 190], [330, 290],
  [58, 300], [210, 278], [344, 286], [42, 262], [358, 262], [358, 318], [42, 318],
];

export function ArtworkSVG({ mode, className = "" }: { mode: ArtMode; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${uid}-${mode}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  const paint = (k: Key) => (mode === "stitch" ? url(`satin-${k}`) : C[k]);

  const art = (
    <>
      <circle cx="200" cy="200" r="180" fill={paint("navy")} />
      <g clipPath={url("inner")}>
        <circle cx="200" cy="200" r="140" fill={paint("cream")} />
        <circle cx="252" cy="168" r="34" fill={paint("sun")} />
        <polygon points={MOUNTAIN} fill={paint("mtn")} />
        <polygon points={SNOW} fill={paint("snow")} />
        <path d={HILL} fill={paint("hill")} />
      </g>
      <path d={BANNER} fill={paint("banner")} />
      <text
        x="200"
        y="301"
        textAnchor="middle"
        fontSize="32"
        fontWeight="800"
        letterSpacing="5"
        fill={paint("text")}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        SUMMIT CREW
      </text>
    </>
  );

  let body: ReactNode;

  if (mode === "stitch") {
    body = (
      <>
        <rect width="400" height="400" fill={url("twill")} />
        <g filter={url("raise")}>
          {art}
          {/* Satin border: dashed wide stroke reads as a column of thread. */}
          <circle cx="200" cy="200" r="174" fill="none" stroke={C.ring} strokeWidth="14" strokeDasharray="1.4 1.1" />
          <circle cx="200" cy="200" r="174" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="14" strokeDasharray="0.4 2.1" />
          {/* Running-stitch outlines */}
          <g fill="none" stroke="#2b241e" strokeOpacity=".4" strokeWidth="1.6" strokeDasharray="5 2.5" strokeLinejoin="round">
            <circle cx="200" cy="200" r="141" />
            <polygon points={MOUNTAIN} />
            <path d={BANNER} />
          </g>
        </g>
      </>
    );
  } else if (mode === "raster") {
    body = (
      <>
        <rect width="400" height="400" fill="#efe9df" />
        <g filter={url("lowres")}>{art}</g>
        <rect width="400" height="400" filter={url("noise")} opacity=".14" />
      </>
    );
  } else {
    body = (
      <>
        <rect width="400" height="400" fill="#fbf8f2" />
        <rect width="400" height="400" fill={url("grid")} />
        {art}
        <g fill="none" stroke="#6f8291" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <circle cx="200" cy="200" r="180" />
          <circle cx="200" cy="200" r="140" />
          <circle cx="252" cy="168" r="34" />
          <polygon points={MOUNTAIN} />
          <path d={HILL} />
          <path d={BANNER} />
          {/* Bezier handles on the hill curve */}
          <path d="M58 300 L140 248 L210 278 M210 278 L280 308" strokeDasharray="3 3" strokeOpacity=".7" />
        </g>
        <g fill="#fbf8f2" stroke="#6f8291" strokeWidth="1.25">
          {ANCHORS.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" />
          ))}
          <circle cx="140" cy="248" r="3.5" fill="#6f8291" />
          <circle cx="280" cy="308" r="3.5" fill="#6f8291" />
        </g>
      </>
    );
  }

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id("inner")}>
          <circle cx="200" cy="200" r="140" />
        </clipPath>

        {mode === "stitch" && (
          <>
            <pattern id={id("twill")} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" fill="#e6dccb" />
              <rect width="3" height="6" fill="#ece3d4" />
              <rect width="0.6" height="6" fill="#d8ccb8" />
            </pattern>
            {(Object.keys(C) as Key[]).map((k) => (
              <pattern
                key={k}
                id={id(`satin-${k}`)}
                width="3"
                height="3"
                patternUnits="userSpaceOnUse"
                patternTransform={`rotate(${ANGLE[k]})`}
              >
                <rect width="3" height="3" fill={C[k]} />
                <rect width="3" height="0.7" fill="#fff" fillOpacity=".28" />
                <rect y="2.2" width="3" height="0.8" fill="#000" fillOpacity=".26" />
              </pattern>
            ))}
            <filter id={id("raise")} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#3b2e24" floodOpacity=".35" />
            </filter>
          </>
        )}

        {mode === "raster" && (
          <>
            <filter id={id("lowres")}>
              {/* Soft focus + washed-out colour reads as a low-res phone photo of a logo. */}
              <feGaussianBlur stdDeviation="2.6" />
              <feColorMatrix type="saturate" values=".75" />
            </filter>
            <filter id={id("noise")}>
              <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </>
        )}

        {mode === "vector" && (
          <pattern id={id("grid")} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#6f8291" strokeOpacity=".08" />
          </pattern>
        )}
      </defs>
      {body}
    </svg>
  );
}
