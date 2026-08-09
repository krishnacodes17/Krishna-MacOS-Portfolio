import { Finder, Safari, Terminal, Text, Image, Contact, Photo } from "./Windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { lazy, Suspense } from "react";
import {Navbar , Welcome , Dock , Home} from "#components"
gsap.registerPlugin(Draggable)

const Resume = lazy(() => import("./Windows/Resume.jsx"));


function App() {

  return <main>
     <Navbar/>
     <Welcome/>
     <Dock/>
     <Terminal/>
     <Safari />
     <Suspense fallback={null}>
       <Resume />
     </Suspense>
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


