// pages/influencer/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleInfluencerDetails } from "@/functions/getInstagramInfluencerData";
import { IInfluencerProfile } from "@/models/influencer-profile";
import MainInfluencerPage from "@/components/influencer-page/main-influencer-page";
import { ArrowBackIcon } from "@chakra-ui/icons";

const InfluencerPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the influencer ID from the router

  const [influencerDetails, setInfluencerDetails] = useState<{
    id: string;
    data: Partial<IInfluencerProfile>;
    type: string;
  } | null>(null);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        if (id && typeof id === "string") {
          const fetchedInfluencer = await getSingleInfluencerDetails(id);
          setInfluencerDetails(fetchedInfluencer);
        }
      } catch (error) {
        console.error("Error fetching influencer details:", error);
        setInfluencerDetails(null);
      }
    };

    fetchInfluencer();
  }, [id]);

  if (!influencerDetails) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  // Display influencer details on the page
  return (
    <div className="">
      <MainInfluencerPage {...influencerDetails.data} id={id as string} />

      {/* Display other influencer details */}
    </div>
  );
};

export default InfluencerPage;
