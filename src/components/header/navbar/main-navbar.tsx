import { useAuth } from "@/context/auth-context";
import { useUserContext } from "@/context/user-context";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  background,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Navbar() {
  const { authUser, logout } = useAuth();
  const { user } = useUserContext();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      as="nav"
      bg="#3b42a1"
      py="2"
      px="4"
      fontWeight="semibold"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="2">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={40}
            height={40}
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <ChakraLink href="/" color="white">
            FrameLux
          </ChakraLink>
        </Flex>
        {authUser !== null ? (
          <>
            {" "}
            <Box display={{ base: "none", md: "block" }}>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Avatar
                    name={user?.displayName as string}
                    src={user?.photoURL as string}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ChakraLink} href="/">
                    Home
                  </MenuItem>
                  <MenuItem as={ChakraLink} href="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem as={ChakraLink} href="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </>
        ) : (
          <div className="space-x-2">
            <button className="btn-primary py-2">Register</button>
            <button className="btn-primary py-2">Log In</button>
          </div>
        )}

        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
          style={{ background: "black", color: "white" }}
        />
      </Flex>

      {/* Drawer for mobile view */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Flex direction="column">
                <Link href="/">
                  <Button variant="ghost" w="full" textAlign="left">
                    Home
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" w="full" textAlign="left">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" w="full" textAlign="left">
                    Profile
                  </Button>
                </Link>
                {authUser !== null ? (
                  <>
                    {" "}
                    <Button
                      variant="ghost"
                      w="full"
                      textAlign="left"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/register">
                      <Button variant="ghost" w="full" textAlign="left">
                        Register
                      </Button>
                    </Link>{" "}
                    <Link href="/auth/login">
                      <Button variant="ghost" w="full" textAlign="left">
                        LogIn
                      </Button>
                    </Link>
                  </>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default Navbar;
