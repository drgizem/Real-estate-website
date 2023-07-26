import { Container } from "react-bootstrap"
import { About } from "./About"
import { Banner } from "./Banner"
import { Swipe } from "./Swipe"
import { SwipeSale } from "./SwipeSale"
import { Contact } from "./Contact"


export const Home=()=>{

  return (
    <div>
      <Container>
      <Banner/>
      <Swipe/>
      <SwipeSale />
      <hr/>
      <About/>
      <hr/>
      <Contact/>
      </Container>
    </div>
  )
}