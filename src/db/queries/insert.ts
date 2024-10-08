import { db } from "../index";
import { embeddings, resources } from "../schema";

export async function insertResource(resource: string): Promise<string> {
  try {
    const [newResource] = await db
      .insert(resources)
      .values({
        content: resource,
      })
      .returning({ id: resources.id });
    return newResource.id;
  } catch (error) {
    console.error("Error inserting resource:", error);
    throw error;
  }
}

export async function insertEmbeddings(
  data: {
    resourceId: string;
    content: string;
    embedding: number[];
  }[]
) {
  try {
    await db.insert(embeddings).values(data);
  } catch (error) {
    console.error("Error inserting embeddings:", error);
    throw error;
  }
}
