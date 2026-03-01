import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photo } from "./Windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import {Navbar , Welcome , Dock , Home} from "#components"
gsap.registerPlugin(Draggable)


function App() {

  return <main>
     <Navbar/>
     <Welcome/>
     <Dock/>
     <Terminal/>
     <Safari />
     <Resume />
     <Finder />
     <Text />
     <Image />
     <Contact />
     <Home />
     <Photo />
   </main>;
}


//  2:22
export default App;


