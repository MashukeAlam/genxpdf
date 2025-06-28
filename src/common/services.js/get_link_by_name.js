import { fetchAllDocuments } from "./file_services";

export async function getDocumentLinkByName(name) {
  try {
    const documents = await fetchAllDocuments(); // this must return the array you mentioned

    if (!Array.isArray(documents)) {
      console.error("Invalid documents response");
      return null;
    }

    console.log(documents, name);
    

    const match = documents.find(doc => doc.title === name);
    return match ? match.file : null;
  } catch (err) {
    console.error("Failed to get document link:", err);
    return null;
  }
}
