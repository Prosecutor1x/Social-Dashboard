import { IInfluencerProfile } from "@/models/influencer-profile";

import { Avatar } from "@chakra-ui/react";
import Image from "next/image";

import React from "react";
import { GenderPieChart } from "./chart-influencer-page";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type Props = IInfluencerProfile & { id: string };

const MainInfluencerPage = ({
  avg_comments,
  avg_eng,
  avg_fwl_gained,
  avg_likes,
  comments,
  dp,
  engagement,
  followers,
  isConnected,
  likes,
  past14Followers,
  src,
  uploads,
  id,
}: Props) => {
  const formatFollowers = (followers: number): string => {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + " M";
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + " K";
    } else {
      return followers.toString();
    }
  };
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-6 p-6 justify-center">
      <ArrowBackIcon
        className="font-semibold text-2xl border-2 rounded-full cursor-pointer active:scale-95 hover:text-gray-300 "
        onClick={router.back}
      />
      <div className="flex flex-col sm:flex-row bg-secondary justify-around rounded-xl sm:items-center p-6 md:p-12 ">
        <div className="flex  sm:justify-center items-center gap-2 md:gap-3 lg:gap-8 ">
          <Avatar
            src={dp as string}
            size={{ base: "lg", md: "xl", lg: "2xl", sm: "xl" }}
          />

          <h1 className="text-2xl sm:text-xl lg:text-2xl leading-snug">
            {" "}
            Name <br></br>
            {id}
          </h1>
        </div>
        <div className="hidden sm:block">
          {/* <label className="text-2xl ">Followers:</label> */}
          <p className=" text-2xl md:text-3xl lg:text-5xl">
            {formatFollowers(followers as number)}
          </p>
        </div>
        <div className=" hidden sm:block">
          {/* <label className="text-2xl ">Average Engagement:</label> */}
          <p className="text-2xl md:text-3xl lg:text-5xl">
            {avg_eng?.toFixed(2)} hr
          </p>
        </div>
      </div>
      <div className="grid  grid-flow-row sm:grid-cols-2 grid-cols-1  gap-3">
        <div className="bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Average Comments:</label>
          <span>{avg_comments}</span>
        </div>

        <div className="bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Average Followers Gained (Past 14 days):</label>
          <span>{avg_fwl_gained?.toFixed(2)}</span>
        </div>
        <div className="bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Average Likes:</label>
          <span>{avg_likes?.toFixed(2)}</span>
        </div>
        <div className="bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Uploads:</label>
          <span>{uploads}</span>
        </div>
        {/* <div className="bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Avergae Likes (Past 14 days):</label>
          <span>
            {likes && (likes?.reduce((sum, followers) => sum + followers, 0) /
              (likes?.length || 1)).toFixed(2)}
          </span>
        </div> */}
        <div className=" sm:hidden bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Followers:</label>
          <p>{formatFollowers(followers as number)}</p>
        </div>
        <div className=" sm:hidden bg-secondary flex flex-col justify-center items-center p-2 rounded-xl">
          <label>Average Engagement:</label>
          <p>{avg_eng?.toFixed(2)} hr</p>
        </div>
      </div>

      <div className="overflow-x-auto  ">
        <div className="  bg-opacity-50 bg-blur-md bg-gray-900 p-6 rounded-lg w-[1000px] sm:w-full ">
          <h1 className="text-2xl font-semibold pb-6 pt-2 ">Uploads</h1>
          <div className="grid grid-cols-8 gap-4 text-center text-white border-collapse ">
            {/* Table Headers */}
            <div className="col-span-8 grid grid-cols-8 p-1 border-b-2 border-gray-500 text-base text-gray-400 font-semibold ">
              <div className="style-table">Post</div>
              <div className="style-table">Comments</div>
              <div className="style-table">Engagements</div>
              <div className="style-table">Likes</div>
              <div className="style-table">Followers</div>
              <div className="style-table">Shares</div>
              <div className="style-table">Saves</div>
              <div className="style-table">Type</div>
              {/* Add more headers for other fields if needed */}
            </div>

            {/* Influencer Details */}
            <div className="col-span-8">
              {src?.map((detail, index) => (
                <div
                  key={index}
                  className={`p-2 col-span-8 grid grid-cols-8 border-b-2 border-gray-500 mb-4 text-base `}
                >
                  <img src={detail} className="mb-2" alt="upload" />
                  <div className="style-table">
                    <span>{comments && comments[index]}</span>
                  </div>

                  <div className="style-table">
                    <span>{engagement && engagement[index].toFixed(2)} hr</span>
                  </div>

                  <div className="style-table">
                    <span>{likes && likes[index]}</span>
                  </div>
                  <div className="style-table">
                    <span>{past14Followers && past14Followers[index]}</span>
                  </div>

                  <div className="style-table">
                    <span>2</span>
                  </div>
                  <div className="style-table">
                    <span>3</span>
                  </div>
                  <div className="style-table">
                    <span>Picture</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid  grid-flow-row sm:grid-cols-2 grid-cols-1  gap-3 bg-secondary  rounded-xl p-6">
        <GenderPieChart />
      </div>
    </div>
  );
};

export default MainInfluencerPage;
