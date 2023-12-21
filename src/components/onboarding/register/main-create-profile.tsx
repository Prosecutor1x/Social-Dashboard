import { useUserContext } from "@/context/user-context";
import { IProfileUser } from "@/models/user-profile";
import {
  InputGroup,
  useToast,
  Input,
  FormLabel,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useState } from "react";

type Props = {};

// ... (Previous imports and setup)

function MainCreateProfile({}: Props) {
  const { user, createUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<IProfileUser>>({
    displayName: "",
    photoURL: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const toast = useToast();
  const router = useRouter();

  console.log(user);

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      // Validation check for username length
      if (formData && formData.displayName && formData.displayName.length < 6) {
        toast({
          title: "Invalid Username",
          description: "Username must be at least 6 characters long.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Create the profile
      await createUser(user?.uid as string, formData);

      // Display success message
      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form data after successful creation
      setFormData({
        displayName: "",
        photoURL: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
      // Display error message if creation fails
      toast({
        title: "Error",
        description: "Failed to create the profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen horizontal-gradient">
      <div className="flex-col border-2 p-12 rounded-lg bg-white w-1/2">
        <h1 className="text-center text-2xl font-semibold mb-4">
          Create Profile
        </h1>

        {/* Username */}
        <InputGroup className="flex-col">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={formData.displayName as string}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
            type="text"
            id="displayName"
            required={true}
          />
        </InputGroup>

        {/* First Name */}
        <InputGroup className="flex-col">
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            value={formData.firstName as string}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            type="text"
            id="firstName"
            required={true}
          />
        </InputGroup>

        {/* Last Name */}
        <InputGroup className="flex-col">
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            value={formData.lastName as string}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            type="text"
            id="lastName"
            required={true}
          />
        </InputGroup>
        {/* Phone Number */}
        <InputGroup className="flex-col">
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            value={formData.phone as string}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            type="text"
            id="phone"
            required={true}
          />
        </InputGroup>

        {/* Address */}
        <InputGroup className="flex-col">
          <FormLabel>Address</FormLabel>
          <Textarea
            placeholder="Address"
            value={formData.address as string}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            id="address"
            required={true}
          />
        </InputGroup>

        {/* Photo URL */}
        {/* <InputGroup className="flex-col">
          <FormLabel>Photo URL</FormLabel>
          <Input
            placeholder="Photo URL"
            value={formData.photoURL as string}
           onChange={(e) => setFormData({...formData, photoURL:  e.target.value })}
            type="text"
            id="photoURL"
          />
        </InputGroup> */}

        {/* Create Profile Button */}
        <Button
          onClick={handleCreateProfile}
          isLoading={loading}
          colorScheme="blue"
          mt={4}
          width="full"
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </Button>
      </div>
    </div>
  );
}

export default MainCreateProfile;
