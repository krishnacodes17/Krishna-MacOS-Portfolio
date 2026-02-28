import { Terminal } from "./Windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import {Navbar , Welcome , Dock} from "#components"
gsap.registerPlugin(Draggable)


function App() {

  return <main>
     <Navbar/>
     <Welcome/>
     <Dock/>
     <Terminal/>
   </main>;
}

export default App;


