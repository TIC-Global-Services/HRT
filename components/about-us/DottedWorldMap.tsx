import { MapPin } from "lucide-react";

export interface OfficesAndTeamsProps {
  eyebrow?: string;
  title?: string;
  locationLabel?: string;
  address?: string;
  mapHref?: string;
}

function DottedWorldMap() {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[20px] bg-[#eeedeb] sm:min-h-[320px] lg:min-h-[390px]">
      <div
        aria-label="Map showing the Claripa office in Chennai, India"
        className="absolute inset-0"
        role="img"
      >
        <svg
          aria-hidden="true"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 720 420"
        >
          <defs>
            <linearGradient id="map-background" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f4f3f1" />
              <stop offset="100%" stopColor="#e9e8e6" />
            </linearGradient>
            <pattern
              height="12"
              id="map-dots"
              patternUnits="userSpaceOnUse"
              width="12"
            >
              <circle cx="4" cy="4" fill="#fff" r="3.1" />
            </pattern>
            <mask id="world-land">
              <rect fill="black" height="420" width="720" />
              <path
                d="M75 76 101 50 146 42 167 57 193 48 216 67 204 91 218 109 197 126 186 157 166 171 162 202 143 217 129 202 118 174 97 158 89 130 69 117 63 94ZM201 204 223 194 246 208 253 231 270 245 263 267 249 280 244 313 228 342 213 335 207 307 194 282 191 251 180 230ZM293 63 319 45 352 49 370 65 400 58 429 70 447 62 481 73 503 67 536 85 567 88 593 110 622 116 649 142 640 160 613 164 591 150 570 159 547 145 522 150 505 133 483 141 461 125 437 137 414 119 390 125 372 108 350 115 333 101 311 106 292 89ZM327 136 355 122 384 129 401 149 395 177 382 196 372 224 356 247 345 276 326 296 313 278 319 250 308 225 315 196 303 177 308 153ZM394 225 414 209 438 217 452 238 477 243 495 260 516 268 537 286 560 296 581 318 600 332 616 353 607 369 583 360 570 345 547 341 529 325 507 324 490 307 467 307 451 288 430 285 417 266 397 257ZM625 200 645 189 661 198 665 216 649 230 631 224Z"
                fill="white"
              />
            </mask>
          </defs>
          <rect fill="url(#map-background)" height="420" width="720" />
          <rect
            fill="#fff"
            height="420"
            mask="url(#world-land)"
            opacity="0.28"
            width="720"
          />
          <rect
            fill="url(#map-dots)"
            height="420"
            mask="url(#world-land)"
            opacity="0.96"
            width="720"
          />
        </svg>
      </div>
      <div className="absolute left-[67%] top-[61%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[#ff7818] ring-4 ring-[#ff7818]/15"
        />
        <span className="rounded-full bg-[#285768] px-3 py-1.5 font-mono text-[9px] font-medium tracking-wide text-white shadow-sm sm:text-[10px]">
          IND · Chennai
        </span>
      </div>
    </div>
  );
}

export default function OfficesAndTeams({
  eyebrow = "Offices and teams",
  title = "Let’s Transform Performance Together",
  locationLabel = "MAP",
  address =
    "6th Floor, WeWork Lightbridge, Saki Vihar Rd, Tunga Village, Chandivali, Powai, Mumbai, Maharashtra 400072",
  mapHref = "https://maps.google.com/?q=WeWork+Lightbridge+Saki+Vihar+Road+Mumbai",
}: OfficesAndTeamsProps) {
  return (
    <section className="w-full bg-[#f7f6f3] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 rounded-[28px] border border-[#eeece8] bg-white p-4 sm:p-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6 lg:p-5">
        <div className="flex min-h-[320px] flex-col justify-between gap-8 p-1 sm:p-3 lg:min-h-[390px] lg:p-4">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#ff7818] sm:text-[11px]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-current"
              />
              {eyebrow}
            </p>
            <h2 className="max-w-[390px] text-[clamp(2rem,4vw,2.7rem)] font-normal leading-[1.08] tracking-[-0.055em] text-[#285768]">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-[14px] border border-[#efede9] bg-[#f7f6f3] p-3 sm:p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ff7818] text-white">
              <MapPin aria-hidden="true" size={18} strokeWidth={2} />
            </span>
            <p className="min-w-0 flex-1 text-[11px] font-medium leading-[1.4] text-[#334c55] sm:text-xs">
              {address}
            </p>
            <a
              aria-label="Open the Mumbai office location in Google Maps"
              className="ml-1 inline-flex shrink-0 items-center gap-1 font-mono text-[9px] font-medium uppercase tracking-wide text-[#71858c] transition-colors hover:text-[#ff7818] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7818]"
              href={mapHref}
              rel="noreferrer"
              target="_blank"
            >
              {locationLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <DottedWorldMap />
      </div>
    </section>
  );
}
