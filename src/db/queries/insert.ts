import { db } from '../index';
import { embeddings, resources } from '../schema';

export async function insertResource(userID: string, resource: string): Promise<string> {
  try {
    const [newResource] = await db
      .insert(resources)
      .values({
        userId: userID,
        content: resource,
      })
      .returning({ id: resources.id });
    return newResource.id;
  } catch (error) {
    console.error('Error inserting resource:', error);
    throw error;
  }
}

export async function insertEmbeddings(
  userID: string,
  data: {
    userId: string;
    resourceId: string;
    content: string;
    embedding: number[];
  }[],
) {
  try {
    await db.insert(embeddings).values(data);
  } catch (error) {
    console.error('Error inserting embeddings:', error);
    throw error;
  }
}
