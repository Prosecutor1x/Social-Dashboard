import { useUserContext } from "@/context/user-context";
import { IInfluencerProfile } from "@/models/influencer-profile";
import React, { useEffect, useState } from "react";
import { RiInstagramFill } from "react-icons/ri";

import InfluencerRequestModal from "./modal-addInfluencer-dashboard";
import { getInstaInfluencerDetails } from "@/functions/getInstagramInfluencerData";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { updateInfluencerInUserDoc } from "@/functions/addInfluencerToUserData";

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

  const formatFollowers = (followers: number): string => {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + " M";
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + " K";
    } else {
      return followers.toString();
    }
  };

  return (
    <div className="flex flex-col  text-xs  lg:text-base  gap-6 md:p-6">
      <div className="bg-opacity-50 bg-blur-md bg-gray-900 px-6 py-2 rounded-xl ">
        <h1 className="text-xl leading-none ">
          Welcome Back{" "}
          <span className="text-4xl ">
            {" "}
            <br />
            {user?.firstName}
          </span>
        </h1>

        <h1 className="text-xl py-8 ">
          Glad To See You!!
          <span className="text-2xl">
            {" "}
            <br />
            Explore Your Data
          </span>{" "}
        </h1>
      </div>

      <div className="overflow-x-auto  ">
        <div className="  bg-opacity-50 bg-blur-md bg-gray-900 p-6 rounded-lg w-[1000px] sm:w-full ">
          <h1 className="text-2xl font-semibold pb-6 pt-2 ">Creators</h1>
          <div className="grid grid-cols-5 gap-4 text-center text-white border-collapse ">
            {/* Table Headers */}
            <div className="col-span-6 grid grid-cols-6 p-1 border-b-2 border-gray-500 text-base text-gray-400 font-semibold ">
              <div className="style-table">Account</div>
              <div className="style-table">Uploads</div>
              <div className="style-table">Followers/Subscribers</div>
              <div className="style-table">Engagements</div>
              <div className="style-table">Followers Gained</div>
              {/* Add more headers for other fields if needed */}
            </div>

            {/* Influencer Details */}
            <div className="col-span-6 ">
              {influencerDetails?.map((detail, index) => (
                <div
                  key={index}
                  className={`p-2 col-span-6 grid grid-cols-6 border-b-2 border-gray-500 mb-4 text-base `}
                >
                  <div className="style-table">
                    <Link href={`/dashboard/influencer/${detail.id}`}>
                      {detail.id}
                    </Link>
                  </div>
                  <div className="style-table">{detail.data.uploads}</div>
                  <div className="style-table">
                    {formatFollowers(detail.data.followers as number)}
                  </div>
                  <div className="style-table">
                    {detail.data.avg_eng?.toFixed(2)}
                  </div>
                  <div className="style-table">
                    {detail.data.avg_fwl_gained?.toFixed(2)}
                  </div>
                  <div className="style-table flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/influencer/${detail.id}`}
                      className="text-[26px]"
                    >
                      {detail.type === "instagram" && <RiInstagramFill />}
                    </Link>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={async () => {
                        const platform =
                          detail?.type === "instagram"
                            ? "influencers_in"
                            : "influencers_yt";
                        await updateInfluencerInUserDoc(
                          user?.uid as string,
                          detail.id,
                          "delete",
                          platform,
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <InfluencerRequestModal />
      <div className="">
        <h1 className=" p-2 rounded-lg  font-semibold">
          List of Influencers Requested
        </h1>
        {user?.influencers_in && user?.influencers_in?.length > 0 && (
          <div className="flex flex-col px-2 py-2">
            {user.influencers_in
              .filter(
                (influencerId) =>
                  !influencerDetails.some(
                    (detail) => detail.id === influencerId,
                  ),
              )
              .map((filteredId, index) => (
                <h1 key={index} className="font-semibold ">
                  • {filteredId}
                </h1>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabInfluencer;
