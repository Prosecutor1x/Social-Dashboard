import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import ForgotPasswordModal from "@/components/onboarding/login/modal-passwordreset";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

const MainLogin = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { loginWithEmailPassword } = useAuth();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await loginWithEmailPassword(data.email, data.password);
      router.push("/dashboard");

      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e: unknown) {
      const error = e as { code?: string };

      const errorMessages: { [key: string]: string } = {
        "auth/invalid-credential":
          "Oops! Wrong Password. Enter a different Password.",
        "auth/user-not-found": "Oops! User not found. Sign in to get started.",
        "auth/too-many-requests": "Too many login attempts. Try again later.",
      };
      const errorMessage =
        errorMessages[error.code ?? ""] ||
        "An error occurred. Please try again.";
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
    <div className="flex md:justify-around justify-center items-center h-screen  ">
      <div className=" md:block hidden">
        <img src="/lg-page.png" alt="login-page" className=" h-screen" />
      </div>
      <div className="flex flex-col  border-2  p-12 rounded-lg bg-gray-800 bg-opacity-50 md:w-1/3 ">
        <h1 className="text-center text-2xl font-semibold  mb-4">LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-6">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel id="email">Email Address</FormLabel>
            <Input
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
              id="email"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            {/* <Input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
            /> */}

            <InputGroup size="md">
              <Input
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                id="password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  backgroundColor="white"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <div>
            {/* <Button
              type="submit"
              isLoading={loading}
              loadingText="Logging in..."
              width="full"
              
            >
              Login
            </Button> */}
            <button type="submit" className="btn-primary w-full">
              {loading ? <>Loggin In...</> : <>Login</>}
            </button>
          </div>
          <p className="center margin-top text-base text-center py-4">
            New to our platform?
            <Link
              href="/auth/register"
              className="sign-up-link text-purple-600 text-xl animate-pulse"
            >
              &nbsp; Sign Up!
            </Link>
          </p>
        </form>
        <ForgotPasswordModal />
      </div>
    </div>
  );
};

export default MainLogin;
