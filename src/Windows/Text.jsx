import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import React from "react";

function Text() {
  const data = useWindowStore((s) => s.windows.txtfile?.data);
  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-2 border-b bg-gray-100">
        <WindowControls target="txtfile" />

        <div className="flex-1 text-center">
          <h2 className="text-sm font-medium text-gray-700 truncate">
            {name}
          </h2>
        </div>

        <div className="w-[60px]" />
      </div>

      {/* CONTENT */}
      <div className="p-8 space-y-6 bg-white">

        {image && (
          <img
            src={image}
            alt={name}
            className="max-w-full object-contain rounded-lg"
          />
        )}

        {subtitle && (
          <h3 className="text-xl font-semibold text-gray-800">
            {subtitle}
          </h3>
        )}

        {description?.map((para, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed">
            {para}
          </p>
        ))}

      </div>
    </>
  );
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;