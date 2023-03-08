import { FC } from "react";
import { Header, Footer } from "../index";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Lunary Lash</title>
        <meta
          name="description"
          content="Welcome to Lunary Lash, the premier lash tech company for all of your eyelash extension and lash lift needs. We use only the highest quality products to give you beautiful, natural-looking lashes that will enhance your natural beauty. From classic lashes to volume sets, we have a wide range of options to suit your unique style and preferences. Book your appointment today and discover the transformative power of gorgeous, luscious lashes with Lunary Lash."
        />
        <meta
          name="keywords"
          content="Lash extensions, Lash lifts, Eyelash extensions, Eyelash lift, Eyelash tint, Eyelash perming, Eyelash extensions near me, Lash salon, Lash studio, Lash bar, Lash artist, Prattville lash salon, Prattville lash studio, Prattville lash bar, Prattville lash artist, Alabama lash extensions, Alabama lash lifts, Lash cleaning, Classic lashes, Volume sets, Lunary Lash, Lunar, Montgomery lash tech"
        />
        <meta name="author" content="Lunary Lash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
