import { eq } from "drizzle-orm";
import { db } from "../index";
import { chatsTable, messagesTable, SelectChat, resources } from "../schema";

export async function getAllMessages(chatId: SelectChat["id"]): Promise<
  Array<{
    content: string;
    role: string;
  }>
> {
  return db
    .select({
      content: messagesTable.content,
      role: messagesTable.role,
    })
    .from(messagesTable)
    .where(eq(messagesTable.chatId, chatId));
}

export async function getAllChats(): Promise<
  Array<{
    id: string;
    createdAt: string;
  }>
> {
  return db
    .select({
      id: chatsTable.id,
      createdAt: chatsTable.createdAt,
    })
    .from(chatsTable);
}

export async function getFormattedMemories() {
  return db.select().from(resources);
}
