"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      className="m-0 h-[100svh] w-screen bg-black/60 text-white backdrop-blur-lg"
      onClick={() => router.back()}
    >
      {children}
      {/* <button onClick={onDismiss} className="w-20 p-4 " /> */}
    </dialog>,
    document.querySelector("#modal-root")!,
  );
}
