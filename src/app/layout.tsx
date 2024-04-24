import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import "@uploadthing/react/styles.css";
import { Nunito_Sans as Font } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import { TopNav } from "./_components/topnav";
import { ourFileRouter } from "./api/uploadthing/core";

const font = Font({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "T3 Gallery",
  description: "By Theo's subscriber",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body
            className={`${font.variable} dark h-[100svh] bg-zinc-950 font-sans`}
          >
            <div className="fixed left-[-150px] z-[-1] h-96 w-96 rounded-full bg-emerald-400/15 blur-[8rem]"></div>
            <div className="fixed bottom-[-250px] right-[-100px] z-[-1] h-96 w-96 rounded-full bg-yellow-300/10 blur-[8rem]"></div>
            <div className="flex h-full flex-col">
              <TopNav />
              <main className="h-full grow overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
