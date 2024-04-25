export function SpinnerBlock() {
  return (
    <svg
      fill="white"
      opacity="80"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="spinner_9y7u opacity-70"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
      <rect
        className="spinner_9y7u spinner_DF2s opacity-80"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
      <rect
        className="spinner_9y7u spinner_q27e opacity-90"
        x="1"
        y="1"
        rx="1"
        width="10"
        height="10"
      />
    </svg>
  );
}

export function UploadSVG() {
  return (
    <div className="h-8 w-8 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
    </div>
  );
}

export function DownloadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}

export function LoadingSpinnerSVG() {
  return (
    <svg
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="spinner_GmWz" x="1" y="4" width="6" height="14" />
      <rect
        className="spinner_GmWz spinner_NuDr"
        x="9"
        y="4"
        width="6"
        height="14"
      />
      <rect
        className="spinner_GmWz spinner_OlQ0"
        x="17"
        y="4"
        width="6"
        height="14"
      />
    </svg>
  );
}
