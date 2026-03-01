import WindowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import React from "react";

function Image() {
  const data = useWindowStore((s) => s.windows.imgfile?.data);
  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <div className="
      min-w-[400px]
      min-h-[300px]
      max-w-[90vw]
      max-h-[85vh]
      bg-white
      rounded-2xl
      shadow-2xl
      flex
      flex-col
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="flex items-center px-4 py-2 border-b bg-gray-100">
        <WindowControls target="imgfile" />

        <div className="flex-1 text-center">
          <h2 className="text-sm font-medium text-gray-700 truncate">
            {name}
          </h2>
        </div>

        <div className="w-[60px]" />
      </div>

      {/* IMAGE AREA */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 overflow-auto">

        <img
          src={imageUrl}
          alt={name}
          className="
            max-w-full
            max-h-full
            object-contain
            select-none
          "
          draggable={false}
        />

      </div>

    </div>
  );
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;