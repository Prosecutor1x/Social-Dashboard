import { db } from "@/utils/firebase.config";
import {
  collection,
  getDocs,
  query,
  where,
  QuerySnapshot,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { IInfluencerProfile } from "@/models/influencer-profile";

const influencersInstaCollection = collection(db, "influencers_insta");

async function getInfluencerDoc(
  influencerId: string,
): Promise<{
  id: string;
  data: Partial<IInfluencerProfile>;
  type: "instagram";
} | null> {
  try {
    const influencerQuery = query(
      influencersInstaCollection,
      where("__name__", "==", influencerId),
    );

    const influencerSnapshot: QuerySnapshot<DocumentData> =
      await getDocs(influencerQuery);

    if (!influencerSnapshot.empty) {
      const influencerData =
        influencerSnapshot.docs[0].data() as Partial<IInfluencerProfile>;
      return { id: influencerId, data: influencerData, type: "instagram" };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching influencer ${influencerId}:`, error);
    return null;
  }
}

export async function getInstaInfluencerDetails(
  influencerIds: string[] | null,
): Promise<
  { id: string; data: Partial<IInfluencerProfile>; type: "instagram" }[]
> {
  try {
    if (!influencerIds || influencerIds.length === 0) {
      return [];
    }

    const influencerDocs: {
      id: string;
      data: Partial<IInfluencerProfile>;
      type: "instagram";
    }[] = [];

    for (const influencerId of influencerIds) {
      const influencerDoc = await getInfluencerDoc(influencerId);
      if (influencerDoc) {
        influencerDocs.push(influencerDoc);
      }
    }

    return influencerDocs;
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return [];
  }
}

export async function getSingleInfluencerDetails(
  influencerId: string,
): Promise<{
  id: string;
  data: Partial<IInfluencerProfile>;
  type: string;
} | null> {
  try {
    const influencerDocRef = doc(influencersInstaCollection, influencerId);
    const influencerDocSnapshot: DocumentSnapshot =
      await getDoc(influencerDocRef);

    if (influencerDocSnapshot.exists()) {
      const influencerData =
        influencerDocSnapshot.data() as Partial<IInfluencerProfile>;
      // Replace 'type' with the appropriate value or field from your influencer document
      const type = "instagram"; // Change this to get the type from the influencer document

      return { id: influencerId, data: influencerData, type };
    } else {
      console.error("Influencer not found");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching influencer ${influencerId}:`, error);
    return null;
  }
}
