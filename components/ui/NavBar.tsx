import { Navbar, Button, Link, Text } from "@nextui-org/react"
import Image from "next/image"
import imgPokedex from 'public/img/128x128.png'
 
export const NavBar = () => {
    // const { theme } = useTheme()
    return (
      // "static", "floating", "sticky"
      <>
        <Navbar isBordered variant={"sticky"}>
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
          
          <Navbar.Content hideIn="xs">                      
            <Navbar.Item id="list">
              <Button   auto as={Link} light href="/">
              Favoritos
              </Button>  
            </Navbar.Item> 
            <Navbar.Item id="list">
              <Button   auto as={Link} flat href="/">
              Pokemones
              </Button>  
            </Navbar.Item> 
          </Navbar.Content>
        </Navbar>
      </>
    )
}
