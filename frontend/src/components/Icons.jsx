/* Shared inline SVG icons — stroke icons inherit currentColor. */

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const HomeIcon = () => (
  <svg {...stroke}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

export const MovieIcon = () => (
  <svg {...stroke}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 4v5M16 4v5M8 20v-5M16 20v-5" />
  </svg>
);

export const TvIcon = () => (
  <svg {...stroke}>
    <rect x="2" y="7" width="20" height="13" rx="2" />
    <path d="m7 2 5 5 5-5" />
  </svg>
);

export const BookmarkIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PlusIcon = () => (
  <svg {...stroke}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...stroke}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowLeftIcon = () => (
  <svg {...stroke}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const AlertIcon = () => (
  <svg {...stroke}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
