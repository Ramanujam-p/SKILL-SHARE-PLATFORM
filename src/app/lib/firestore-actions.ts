import {
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "./firestore";
import { createNotification } from "./notifications";

/* =====================================================
   POST ANSWER (SUBCOLLECTION SAFE)
===================================================== */

export async function postAnswer({
  questionId,
  content,
  userId,
  userName,
  questionOwnerId,
}: {
  questionId: string;
  content: string;
  userId: string;
  userName: string;
  questionOwnerId: string;
}) {
  if (!questionId || !content || !userId) {
    throw new Error("Missing required fields");
  }

  // ✅ Correct path: questions/{id}/answers
  const answersRef = collection(db, "questions", questionId, "answers");

  await addDoc(answersRef, {
    content,
    userId,
    userName,
    upvotes: 0,
    isAccepted: false,
    createdAt: serverTimestamp(),
  });

  // 🔔 Notify question owner
  if (userId !== questionOwnerId) {
    await createNotification({
      userId: questionOwnerId,
      type: "answer",
      title: "New Answer",
      message: `${userName} replied to your question`,
      link: `/dashboard/helpdesk/${questionId}`,
    });
  }
}

/* =====================================================
   SEND SKILL REQUEST
===================================================== */

export async function sendSkillRequest({
  fromUserId,
  toUserId,
  fromUserName,
}: {
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
}) {
  if (!fromUserId || !toUserId) {
    throw new Error("Invalid skill request");
  }

  await addDoc(collection(db, "skillRequests"), {
    fromUserId,
    toUserId,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  await createNotification({
    userId: toUserId,
    type: "connection",
    title: "New Connection Request",
    message: `${fromUserName} wants to connect with you`,
    link: "/dashboard/skillmatch",
  });
}
