import { Navbar, Button, Link, Text } from "@nextui-org/react"

import Image from "next/image"
import NextLink from "next/link"
import imgPokedex from 'public/img/128x128.png'
 
export const NavBar = () => {
    // const { theme } = useTheme()
    return (
      // "static", "floating", "sticky"
      <>
        <Navbar isBordered variant={"sticky"}>
                    
            <Link href='/' as={NextLink}> 
              <Navbar.Brand>
                <Image
                  width={50}
                  height={50}
                  src={imgPokedex}
                  alt="Pokedex"
                  />  
                <Text b h2 color="inherit" hideIn="xs" style={{padding:'8px 0px 0px 12px'}}>
                  P
                </Text>
                <Text b h3 color="inherit" hideIn="xs">
                  anchodex
                </Text> 
              </Navbar.Brand> 
            </Link> 
          
          <Navbar.Content hideIn="xs">                      
            <Navbar.Item id="list">
              <Button auto as={NextLink} light href="/favorities">
              Favoritos
              </Button>  
            </Navbar.Item> 
            <Navbar.Item id="list">
              <Button auto as={NextLink} flat href="/">
              Pokemones
              </Button>  
            </Navbar.Item> 
          </Navbar.Content>
        </Navbar>
      </>
    )
}
