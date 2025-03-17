import { firebaseApp, storage } from "./firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit as limitClause,
    query,
    QueryConstraint,
    where
} from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { BlogEntryWithId } from "@/app/common/types";

function convertDate(data: any) {
    if (!data) return null;
    if (data instanceof Date) {
        return data;
    }
    if (typeof data === "object" && "toDate" in data) {
        return data.toDate();
    }
    return null;
}

export const getBlogEntries = async ({
                                         limit = 10,
                                     }: {
    limit?: number;
}): Promise<BlogEntryWithId[]> => {
    console.log("Getting blog entries", { limit });
    const colRef = collection(getFirestore(firebaseApp), "blog");
    const queryConstraints: QueryConstraint[] = [limitClause(limit)];
    queryConstraints.push(where("status", "==", "published"));
    console.log("Blog entries query constraints", queryConstraints);
    const querySnapshot = await getDocs(query(colRef, ...queryConstraints));
    return Promise.all(querySnapshot.docs.map((doc) => convertBlogEntry(doc.data(), doc.id)));
}

export const getBlogEntry = async (id: string): Promise<BlogEntryWithId | null> => {
    console.log("Getting blog entry", id);
    const docRef = doc(getFirestore(firebaseApp), "blog", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return null;
    }
    return convertBlogEntry(docSnap.data(), docSnap.id,);
}

export async function convertBlogEntry(data: Record<string, any>, id: string): Promise<BlogEntryWithId> {

    const content = await Promise.all((data.content ?? []).map(async (content: any) => {
        if (content.type === "images") {
            return {
                type: "images",
                value: await Promise.all((content.value ?? []).map((image: string) => {
                    return getDownloadURL(ref(storage, image));
                }))
            }
        } else if (content.type === "text") {
            return {
                type: "text",
                value: content.value
            }
        } else if (content.type === "quote") {
            return {
                type: "quote",
                value: content.value
            }
        }else {
            throw new Error("Unexpected content type in blog entry: " + content.type);
        }

    }));

    let headerImage: string | undefined;
    try {
        headerImage = data.header_image ? await getDownloadURL(ref(storage, data.header_image)) : undefined;
    } catch (e) {
        console.error("Error getting header image", data.header_image, e);
        headerImage = "undefined";
    }
    return {
        id,
        name: data.name,
        header_image: headerImage,
        content: content,
        created_on: convertDate(data.created_on),
        reviewed: data.reviewed,
        status: data.status,
        tags: data.tags,
    } as BlogEntryWithId;
}

