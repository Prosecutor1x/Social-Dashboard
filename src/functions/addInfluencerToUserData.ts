import { db } from "@/utils/firebase.config";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";

export async function updateInfluencerInUserDoc(
  userId: string,
  influencer: string,
  type: "influencers_in" | "influencers_yt",
) {
  try {
    if (!userId || !influencer || !type) {
      throw new Error("User ID, influencer data, or type is missing.");
    }

    const userDocRef = doc(db, "users", userId); // Assuming 'users' is your collection name

    const fieldToUpdate =
      type === "influencers_in" ? "influencers_in" : "influencers_yt";

    // Update the specified field inside the user document by appending the new influencer
    await updateDoc(userDocRef, {
      [fieldToUpdate]: arrayUnion(influencer),
    });

    console.log(
      `Influencer updated successfully in the '${fieldToUpdate}' field of the user document.`,
    );

    return true; // or any other success indicator if needed
  } catch (error) {
    console.error("Error updating influencer in user document:", error);
    return false; // or any other error indicator if needed
  }
}
