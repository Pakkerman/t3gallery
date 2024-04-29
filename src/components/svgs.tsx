export function SpinnerBlock({ size = 16 }: { size?: number }) {
  return (
    <svg
      fill="white"
      width={size}
      height={size}
      opacity="80"
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

export function UploadSVG({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
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
  );
}

export function DownloadSVG({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
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

export function LoadingSpinnerSVG({ size = 16 }: { size?: number }) {
  return (
    <svg
      fill="white"
      width={size}
      height={size}
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

export function TrashSVG({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}
