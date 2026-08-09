import React from "react";
import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";

function Finder() {
  const openWindow = useWindowStore((state) => state.openWindow);
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (!item) return;

    if (item.fileType === "pdf") return openWindow("resume");

    if (item.kind === "folder") return setActiveLocation(item);

    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    if (item.fileType === "txt")
      return openWindow("txtfile", item);

    if (item.fileType === "img")
      return openWindow("imgfile", item);
  };

  const renderList = (items = []) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          "flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm",
          item.id === activeLocation?.id
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200"
        )}
      >
        <img src={item.icon} alt={item.name} className="w-4 h-4" />
        <span className="truncate">{item.name}</span>
      </li>
    ));

  return (
    <div className="w-[900px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

      {/* HEADER */}
      <div className="flex items-center px-4 py-2 bg-gray-100 border-b">
        <WindowControls target="finder" />

        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold text-gray-700">
            {activeLocation?.name || "Finder"}
          </h2>
        </div>

        <Search className="w-4 h-4 text-gray-600" />
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-56 bg-gray-50 border-r p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-400 mb-2">
              Favorites
            </h3>
            <ul className="space-y-1">
              {renderList(Object.values(locations))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2">
              Work
            </h3>
            <ul className="space-y-1">
              {renderList(locations.work?.children)}
            </ul>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-6 gap-8">
            {activeLocation?.children?.map((item) => (
              <div
                key={item.id}
                onDoubleClick={() => openItem(item)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-14 h-14 object-contain transition-transform duration-150 group-hover:scale-110"
                />
                <p className="text-xs mt-2 text-center truncate w-20">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;