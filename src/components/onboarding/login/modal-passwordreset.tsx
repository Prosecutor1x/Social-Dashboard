import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { auth } from "@/utils/firebase.config";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
    setEmail("");
  };

  const checkUserExists = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setUserExists(true);
      }
      console.log(methods);
    } catch (error) {
      console.error("Error checking if user exists:", error);
      setUserExists(false); // Set to false in case of an error
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await checkUserExists(email);

      if (userExists) {
        await sendPasswordResetEmail(auth, email);

        setIsOpen(false);
        toast({
          title: "Password Reset Email Sent",
          description: `A password reset email has been sent to ${email}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "User Not Found",
          description: "User with this email does not exist.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      const error = e as { code?: string };
      console.log(error);
      const errorMessages: { [key: string]: string } = {
        "auth/missing-email": "Please enter an email address.",
        "auth/invalid-email": "Please enter a valid email address.",
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
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <Button onClick={() => setIsOpen(true)} backgroundColor="white ">
          Forgot Password
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            maxW="400px"
            mx="auto"
            bg="white"
            p="24px"
            borderRadius="8px"
            boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
          >
            <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
              Reset Password
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb="16px"
              />
            </ModalBody>
            <ModalFooter justifyContent="center" mt="15px">
              <Button
                colorScheme="purple"
                mr={3}
                onClick={handleResetPassword}
                isLoading={loading}
              >
                Reset Password
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                backgroundColor="red "
                color="white"
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
