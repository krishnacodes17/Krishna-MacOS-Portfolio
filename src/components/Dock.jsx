import React, { useRef } from "react";
import { dockApps } from "../constants/index";
import { Tooltip } from 'react-tooltip'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "../store/window";

function Dock() {
  const { openWindow , closeWindow, windows} = useWindowStore()

  const dockRef = useRef(null);

  useGSAP(() => {
  const dock = dockRef.current;
  if (!dock) return;

  const icons = dock.querySelectorAll(".dock-icon");

  const animateIcons = (mouseX) => {
    const { left } = dock.getBoundingClientRect();

    icons.forEach((el) => {
      const { left: iconLeft, width } = el.getBoundingClientRect();
      const center = iconLeft - left + width / 2;
      const distance = Math.abs(mouseX - center);

      const intensity = Math.exp(-(distance ** 2) / 2000);

      gsap.to(el, {
        scale: 1 + 0.25 * intensity,
        y: -15 * intensity,
        duration: 0.2,
        ease: "power1.out",
        overwrite: true,
      });
    });
  };

  const handleMouseMove = (e) => {
    const { left } = dock.getBoundingClientRect();
    animateIcons(e.clientX - left);
  };

 const resetIcons = () => {
  icons.forEach((el) => {
    gsap.killTweensOf(el);  
    gsap.to(el, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  });
};

dock.addEventListener("pointermove", handleMouseMove);
dock.addEventListener("pointerleave", resetIcons);

return () => {
  dock.removeEventListener("pointermove", handleMouseMove);
  dock.removeEventListener("pointerleave", resetIcons);
};
});



  const toggleApp = (app)=>{
    if(!app.canOpen) return;

    const window = windows[app.id];

    if(window.isOpen){
      closeWindow(app.id)
    }else{
      openWindow(app.id)
    }
  };


 

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
         return (<div key={id ?? name} className=" relative flex justify-center ">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={()=>toggleApp({id, canOpen})}
            >
                <img src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ?"" : "opacity-60"}
                />
            </button>
          </div>);
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip"/>

      </div>
    </section>
  );
}

export default Dock;
