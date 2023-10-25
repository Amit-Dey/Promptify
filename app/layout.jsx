import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Main from "@components/Main";

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
    <html lang='en' className="">
        <head>
        <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
        </head>
        <body suppressHydrationWarning={true}>
            <Provider>
                <Main />
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
);

export default RootLayout;