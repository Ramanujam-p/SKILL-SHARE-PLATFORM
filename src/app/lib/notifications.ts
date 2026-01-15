import { addDoc, serverTimestamp } from "firebase/firestore";
import { notificationsRef } from "./firestore";

/* ---------------- TYPES ---------------- */

export type NotificationType = "answer" | "connection";

interface CreateNotificationInput {
  userId: string;       // receiver UID
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

/* ---------------- CREATE NOTIFICATION ---------------- */

export async function createNotification(data: CreateNotificationInput) {
  if (!data.userId) return;

  return addDoc(notificationsRef, {
    userId: data.userId,
    type: data.type,
    title: data.title,
    message: data.message,
    link: data.link ?? null,
    read: false,
    createdAt: serverTimestamp(),
  });
}
