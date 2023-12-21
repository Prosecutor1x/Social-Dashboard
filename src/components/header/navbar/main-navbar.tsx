import { useAuth } from "@/context/auth-context";
import { useUserContext } from "@/context/user-context";

import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { authUser, logout } = useAuth();
  const { user } = useUserContext();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#3b42a1] py-2 px-10 font-quicksand font-semibold sticky top-0  ">
      <div className="flex justify-between items-center">
        <div className="flex items-center  gap-10 ">
          <img src="favicon.ico" className="h-12" />
          <h1 className="text-">FrameLux</h1>
        </div>

        {authUser != null ? (
          <Menu>
            <MenuButton>
              <Avatar
                name={user?.displayName as string}
                src={user?.photoURL as string}
              />
            </MenuButton>
            <MenuList zIndex={40} className="font-semibold font-quicksand">
              <MenuItem as="a" href="/">
                Home
              </MenuItem>
              <MenuItem as="a" href="/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem as="a" href="/profile">
                Profile{" "}
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <div className="flex gap-2">
            <Link href="/signup">
              <button className="bg-black text-white p-2 rounded-lg px-8 active:scale-95">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-black text-white p-2 rounded-lg px-8 active:scale-95">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* <button onClick={handleLogOut}>Logout</button> */}
    </div>
  );
}

export default Navbar;
