import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/utils/firebase.config";

export async function updateInfluencerInUserDoc(
  userId: string,
  influencer: string,
  action: "add" | "delete",
  type: "influencers_in" | "influencers_yt",
) {
  try {
    if (!userId || !influencer || !type || !action) {
      throw new Error("User ID, influencer data, action, or type is missing.");
    }

    const userDocRef = doc(db, "users", userId); // Assuming 'users' is your collection name

    const fieldToUpdate =
      type === "influencers_in" ? "influencers_in" : "influencers_yt";

    let updateAction: any = {};
    if (action === "add") {
      updateAction = arrayUnion(influencer);
    } else if (action === "delete") {
      updateAction = arrayRemove(influencer);
    } else {
      throw new Error("Invalid action provided.");
    }

    // Update the specified field inside the user document based on the action
    await updateDoc(userDocRef, {
      [fieldToUpdate]: updateAction,
    });

    console.log(
      `Influencer ${
        action === "add" ? "added" : "deleted"
      } successfully from the '${fieldToUpdate}' field of the user document.`,
    );

    return true; // or any other success indicator if needed
  } catch (error) {
    console.error("Error updating influencer in user document:", error);
    return false; // or any other error indicator if needed
  }
}
