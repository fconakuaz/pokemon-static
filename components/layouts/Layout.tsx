import { FC } from "react";
import Head from "next/head";
import { NavBar } from "components/ui";
import { useRouter } from "next/router";

export type PropsWithChildren = {
  children: JSX.Element;
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Pokemon App {title ? " | " + title : ""}</title>
        <meta name="author" content="Paco Acosta" />
        <meta name="description" content={`Pokedex del pokemon ${title}`} />
        <meta name="keywords" content={`pokemon, pokedex, ${title}`} />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        {/* Siempre se sugiere que se ponga un path estático */}
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <NavBar />

      <main
        style={{
          padding: "20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
