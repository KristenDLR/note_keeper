import { Metadata } from "next"
//Todo: update google fonts
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
//   });

export const metadata: Metadata = {
    title: 'My App',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* <head>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
    
            </head> */}
            <body>
                <div id="root">{children}</div>
                <script type="module" src="/src/main.tsx"></script>
            </body>
        </html>

    )
}