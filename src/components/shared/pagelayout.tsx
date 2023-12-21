import React from "react";
import Navbar from "../header/navbar/main-navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const PageLayout = ({ children }: Props) => {
  return (
    <div className=" flex flex-col  font-monsterrat text-font1 relative w-screen min-h-screen">
      <Navbar />
      <div>{children}</div>
      <div className="bg-[#131532] text-sm text-white font-semibold p-3 fixed flex justify-center items-center  w-full bottom-0 ">
        <h1 className="text-center">All Rights Reserved @FrameLux 2022</h1>
      </div>
    </div>
  );
};

export default PageLayout;
