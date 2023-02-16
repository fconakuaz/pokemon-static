import { FC } from "react"
import Head from "next/head"
import { NavBar } from "components/ui"

export type PropsWithChildren = {
    children: JSX.Element
    title?: string
}

export const Layout: FC<PropsWithChildren> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>Pokemon App { title ? ' | '+title : ''}</title>
            <meta name="author" content="Paco Acosta" />
            <meta name="description" content={`Pokedex del pokemon ${title}`} />
            <meta name="keywords" content={`pokemon, pokedex, ${title}`} />
        </Head>

        <NavBar />
        
        <main style={{ 
          padding: '20px' 
        }}>
            {children}
        </main>
    </>
  )
}
