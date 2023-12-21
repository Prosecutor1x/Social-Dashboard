import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Input, InputGroup, Spinner, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginWithEmailPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const router = useRouter();

  const handleSubmitFormValidation = () => {
    return email !== "" && password !== "";
  };

  const handleLoginwithEmailPassword = async () => {
    setLoading(true);
    try {
      await loginWithEmailPassword(email, password);
      router.push("/dashboard");

      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e: any) {
      console.log(e);
      const errorMessages: { [key: string]: string } = {
        "auth/invalid-credential":
          "Oops! Wrong Password. Enter a different Password.",
        "auth/user-not-found": "Oops! User not found. Sign in to get started.",
        "auth/too-many-requests": "Too many login attempts. Try again later.",
      };
      const errorMessage =
        errorMessages[e.code] || "An error occurred. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <div className=" min-h-screen font-monsterrat">
      <div className="h-[92vh] flex justify-center items-center">
        <div className="bg-white border-2 border-[#CACACA] mx-auto lg:w-1/2 sm:w-3/4 w-8/9 h-fit lg:p-8 md:p-6 p-4 lg:rounded-2xl md:rounded-xl rounded-lg flex flex-col justify-between items-center lg:space-y-8 md:space-y-6 space-y-4">
          <div className="lg:w-3/4 w-full space-y-4">
            <h1 className="text-purple lg:text-3xl md:text-2xl text-xl font-semibold text-center">
              Log In
            </h1>
            <div className="space-y-4">
              <div className="flex items-center w-full">
                <div className="h-[1px] w-full " />
                <span className="text-purple px-4 font-semibold">Or</span>
                <div className="h-[1px] w-full " />
              </div>
              <div className="w-full lg:space-y-4 space-y-2 mt-4">
                <InputGroup>
                  <Input
                    type="email"
                    borderColor="gray.500"
                    backgroundColor="#FBFAFF"
                    focusBorderColor="purple.500"
                    placeholder="Email"
                    size="md"
                    fontSize="base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    autoComplete="on"
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    type="password"
                    backgroundColor="#FBFAFF"
                    borderColor="gray.500"
                    focusBorderColor="purple.500"
                    placeholder="Password"
                    size="md"
                    fontSize="base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    autoComplete="on"
                  />
                </InputGroup>
              </div>
              <div className="w-full py-4">
                <Button
                  isDisabled={!handleSubmitFormValidation()}
                  className="btn-audit-secondary w-full min-h-34 py-3"
                  onClick={handleLoginwithEmailPassword}
                >
                  {loading ? <Spinner /> : "Log In"}
                </Button>
              </div>
            </div>
          </div>
          <p>
            Don&apos;t have an Account?{" "}
            <Link
              href="/register"
              className="anchor-custom underline text-purple"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
