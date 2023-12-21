import React from "react";
import Navbar from "../header/navbar/main-navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const PageLayout = ({ children }: Props) => {
  return (
    <div className="bg-lightpink min-h-screen font-monsterrat text-font1 relative w-full">
      <Navbar />
      <div>{children}</div>
      <div className="bg-[#131532] text-sm text-[#9E9E9E] flex justify-center items-center text-center w-full h-[3vh]">
        All Rights Reserved FrameLux 2022
      </div>
    </div>
  );
};

export default PageLayout;
