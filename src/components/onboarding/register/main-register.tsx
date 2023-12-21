import { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
}

const MainRegister = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { signUpWithEmailPassword } = useAuth();

  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // To watch form fields
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (data.password !== data.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
        return;
      }

      await signUpWithEmailPassword(data.email, data.password);

      // Save additional data like phone number and address to the database

      router.push("/auth/register/create-profile");

      toast({
        title: "Success",
        description: "Signup successful! You are now logged in.",
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
    <div className="flex justify-center items-center h-screen w-screen horizontal-gradient">
      <div className="flex-col border-2 p-12 rounded-lg bg-white w-1/3">
        <h1 className="text-center text-2xl font-semibold mb-4">SIGN UP</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-6">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
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

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password.current || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                id="confirmPassword"
              />
              {/* <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  backgroundColor="white"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement> */}
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <div>
            <button type="submit" className="btn-primary w-full">
              {loading ? <>Signing Up...</> : <>Sign Up</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainRegister;
