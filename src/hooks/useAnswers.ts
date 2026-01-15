import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  increment,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../fireconnection";
import { useAuth } from "./useAuth";

/* ================= TYPES ================= */

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  createdAt?: any;
  updatedAt?: any;
  upvotes: number;
  isAccepted: boolean;
}

type UseAnswersReturn = {
  answers: Answer[];
  loading: boolean;
  error: string | null;
  createAnswer: (questionId: string, content: string) => Promise<string>;
  updateAnswer: (id: string, content: string) => Promise<void>;
  deleteAnswer: (id: string) => Promise<void>;
  upvoteAnswer: (id: string) => Promise<void>;
  markAsAccepted: (id: string) => Promise<void>;
  clearError: () => void;
};

/* ================= HOOK ================= */

export function useAnswers(questionId?: string): UseAnswersReturn {
  const { user } = useAuth();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- REALTIME LISTENER ---------- */

  useEffect(() => {
    if (!questionId) {
      setAnswers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "answers"),
      where("questionId", "==", questionId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snap: QuerySnapshot<DocumentData>) => {
        const docs: Answer[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Answer, "id">),
        }));

        setAnswers(docs);
        setLoading(false);
      },
      (err) => {
        console.error("❌ Answers listener error:", err);
        setError(err.message ?? "Failed to load answers");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [questionId]);

  /* ---------- CREATE ---------- */

  const createAnswer = useCallback(
    async (qId: string, content: string): Promise<string> => {
      if (!user) throw new Error("Must be logged in to answer");
      if (!content.trim())
        throw new Error("Answer content cannot be empty");

      try {
        setError(null);

        const docRef = await addDoc(collection(db, "answers"), {
          questionId: qId,
          userId: user.uid,
          content: content.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          upvotes: 0,
          isAccepted: false,
        });

        return docRef.id;
      } catch (err: any) {
        console.error("❌ Create answer error:", err);
        setError(err.message ?? "Failed to create answer");
        throw err;
      }
    },
    [user]
  );

  /* ---------- UPDATE ---------- */

  const updateAnswer = useCallback(
    async (id: string, content: string): Promise<void> => {
      if (!user) throw new Error("Must be logged in");

      try {
        const docRef = doc(db, "answers", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) throw new Error("Answer not found");
        if (snap.data().userId !== user.uid)
          throw new Error("You can only update your own answers");

        setError(null);

        await updateDoc(docRef, {
          content: content.trim(),
          updatedAt: serverTimestamp(),
        });
      } catch (err: any) {
        console.error("❌ Update answer error:", err);
        setError(err.message ?? "Failed to update answer");
        throw err;
      }
    },
    [user]
  );

  /* ---------- DELETE ---------- */

  const deleteAnswer = useCallback(
    async (id: string): Promise<void> => {
      if (!user) throw new Error("Must be logged in");

      try {
        const docRef = doc(db, "answers", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) throw new Error("Answer not found");
        if (snap.data().userId !== user.uid)
          throw new Error("You can only delete your own answers");

        setError(null);
        await deleteDoc(docRef);
      } catch (err: any) {
        console.error("❌ Delete answer error:", err);
        setError(err.message ?? "Failed to delete answer");
        throw err;
      }
    },
    [user]
  );

  /* ---------- UPVOTE ---------- */

  const upvoteAnswer = useCallback(async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, "answers", id);
      await updateDoc(docRef, { upvotes: increment(1) });
    } catch (err) {
      console.error("❌ Upvote error:", err);
      throw err;
    }
  }, []);

  /* ---------- MARK AS ACCEPTED ---------- */

  const markAsAccepted = useCallback(
    async (id: string): Promise<void> => {
      if (!user) throw new Error("Must be logged in");

      try {
        const answerRef = doc(db, "answers", id);
        const snap = await getDoc(answerRef);

        if (!snap.exists()) throw new Error("Answer not found");

        setError(null);
        await updateDoc(answerRef, { isAccepted: true });
      } catch (err: any) {
        console.error("❌ Mark accepted error:", err);
        setError(err.message ?? "Failed to mark as accepted");
        throw err;
      }
    },
    [user]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    answers,
    loading,
    error,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    upvoteAnswer,
    markAsAccepted,
    clearError,
  };
}
