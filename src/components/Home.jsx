import React from "react";
import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];

function Home() {
  const {setActiveLocation} = useLocationStore()
  const { openWindow } = useWindowStore();

  const handelOpenProjectFinder = (project) =>{
    setActiveLocation(project)
    openWindow("finder")
  };

  useGSAP(() => {
    Draggable.create(".folder", {
      type: "x,y",
      edgeResistance: 0.9,
      bounds: "#home",
    });
  }, []);

  return (
    <section id="home" className="relative w-full h-screen">
      <ul className="relative w-full h-full">
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx(
              "folder absolute cursor-pointer flex flex-col items-center",
              project.windowPosition,
            )}
            onClick={() => handelOpenProjectFinder(project)}
          >
            <img
              src="/images/folder.png"
              alt={project.name}
              className="w-16 h-16"
            />
            <p className="text-sm mt-2">{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
