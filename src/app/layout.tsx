import type { Metadata } from "next";

import "@/app/common/index.css";
import "@fontsource/poppins";
import "@fontsource/playfair-display";
import "@fontsource/jetbrains-mono";

export const metadata: Metadata = {
    title: "Leo Prime CMS",
    description: "Leo Prime CMS",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body>

        {children}

        </body>
        </html>
    );
}

