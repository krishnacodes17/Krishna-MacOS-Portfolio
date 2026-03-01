import React from "react";
import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";

function Photo() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <>
      {/* HEADER */}
      <div
        id="window-header"
        className="flex items-center px-4 py-2 border-b bg-gray-100"
      >
        <WindowControls target="photos" />

        <div className="flex-1 flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex w-full h-[70vh] bg-white">

        {/* SIDEBAR */}
        <div className="w-56 border-r p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Photos
          </h2>

          <ul className="space-y-3">
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              >
                <img src={icon} alt={title} className="w-5 h-5" />
                <p className="text-sm">{title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* GALLERY */}
        <div className="flex-1 p-6 overflow-auto">
          <ul className="grid grid-cols-3 gap-6">
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                className="cursor-pointer group"
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img
                  src={img}
                  alt={`gallery image ${id}`}
                  className="rounded-xl shadow-md group-hover:scale-105 transition"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const PhotoWindow = WindowWrapper(Photo, "photos");
export default PhotoWindow;