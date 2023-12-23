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
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { updateRequestBasedOnType } from "@/functions/addIfluencerReq"; // Replace with your Firebase function path
import { updateInfluencerInUserDoc } from "@/functions/addInfluencerToUserData";
import { useUserContext } from "@/context/user-context";

const InfluencerRequestModal = () => {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [influencerName, setInfluencerName] = useState("");
  const [influencerType, setInfluencerType] = useState<"youtube" | "instagram">(
    "youtube",
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddUser = () => {
    openModal();
  };

  const handleSubmit = async () => {
    if (influencerName && influencerType) {
      await updateRequestBasedOnType(influencerName, influencerType);

      const platform =
        influencerType === "youtube" ? "influencers_yt" : "influencers_in";
      await updateInfluencerInUserDoc(
        user?.uid as string,
        influencerName,
        platform,
      );
      setInfluencerName("");
      setInfluencerType("youtube");
      closeModal();
    } else {
      // Handle validation or display an error message
    }
  };

  return (
    <>
      <Button onClick={handleAddUser}>Add User</Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Influencer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Influencer Name"
                value={influencerName}
                onChange={(e) => setInfluencerName(e.target.value)}
              />
              <RadioGroup
                value={influencerType}
                onChange={(value) =>
                  setInfluencerType(value as "youtube" | "instagram")
                }
              >
                <Stack direction="row">
                  <Radio value="youtube">YouTube</Radio>
                  <Radio value="instagram">Instagram</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfluencerRequestModal;