import Link from "next/link";
import React from "react";

import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      NAvbar
      <button onClick={handleLogOut}>Logout</button>
    </>
  );
}
