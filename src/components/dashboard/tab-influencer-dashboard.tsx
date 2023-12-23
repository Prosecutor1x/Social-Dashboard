import { useUserContext } from "@/context/user-context";
import { IInfluencerProfile } from "@/models/influencer-profile";
import React, { useEffect, useState } from "react";
import { RiInstagramFill } from "react-icons/ri";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import InfluencerRequestModal from "./modal-addInfluencer-dashboard";
import { getInstaInfluencerDetails } from "@/functions/getInstagramInfluencerData";
import Link from "next/link";

const TabInfluencer = () => {
  const [influencerDetails, setInfluencerDetails] = useState<
    { id: string; data: Partial<IInfluencerProfile>; type: "instagram" }[]
  >([]);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        if (user?.influencers_in && user.influencers_in.length > 0) {
          const fetchedInfluencers = await getInstaInfluencerDetails(
            user.influencers_in as [string],
          );
          setInfluencerDetails(fetchedInfluencers);
        }
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setInfluencerDetails([]);
      }
    };

    if (user?.influencers_in && user?.influencers_in?.length > 0) {
      fetchInfluencers();
    }
  }, [user?.influencers_in]);

  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Influencer Details</TableCaption>
        <Thead>
          <Tr>
            <Th>Account</Th>
            <Th>Uploads</Th>
            <Th>Followers/Subscribers</Th>
            <Th>Engagements</Th>
            <Th>Followers Gained</Th>
            {/* Add more headers for other fields if needed */}
          </Tr>
        </Thead>
        <Tbody>
          {influencerDetails?.map((detail, index) => (
            <Tr key={index}>
              <Td>
                <Link href={`/dashboard/influencer/${detail.id}`}>
                  {detail.id},
                  {detail.type === "instagram" && (
                    <>
                      <RiInstagramFill />
                    </>
                  )}
                </Link>
              </Td>
              <Td>{detail.data.uploads}</Td>
              <Td>{detail.data.followers}</Td>
              <Td>{detail.data.avg_eng?.toFixed(2)}</Td>
              <Td>{detail.data.avg_fwl_gained?.toFixed(2)}</Td>
              {/* Render other fields similarly */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <InfluencerRequestModal />
    </>
  );
};

export default TabInfluencer;
