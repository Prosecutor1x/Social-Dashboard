import { db } from "@/utils/firebase.config";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";

export async function updateRequestBasedOnType(
  request: string,
  type: "youtube" | "instagram",
) {
  try {
    if (!request || !type) {
      throw new Error("Request data or type is missing.");
    }

    let docName = "";
    if (type === "youtube") {
      docName = "youtube_req";
    } else if (type === "instagram") {
      docName = "insta_req";
    } else {
      throw new Error("Invalid request type.");
    }

    const userDocRef = doc(db, "users", docName);

    // Update the 'req' field inside the document based on the specified type
    await updateDoc(userDocRef, {
      req: arrayUnion(request),
    });

    console.log("Request updated successfully in the respective document.");

    return true; // or any other success indicator if needed
  } catch (error) {
    console.error("Error updating request in respective document:", error);
    return false; // or any other error indicator if needed
  }
}
