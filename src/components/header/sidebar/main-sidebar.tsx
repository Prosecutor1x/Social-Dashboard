import React from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="flex ">
      <div className="w-[20vw]  text-white hidden md:block">
        {/* The sidebar content */}
        <h1>Sidebar Content</h1>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
