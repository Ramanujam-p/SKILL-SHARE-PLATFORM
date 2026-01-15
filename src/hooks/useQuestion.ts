import { useEffect, useMemo, useState, useCallback } from "react";
import {
  collection,
  doc,
  query,
  where,
  limit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  increment,
  Timestamp,
  FirestoreError,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "../fireconnection";
import { useAuth } from "./useAuth";

/* ================= TYPES ================= */

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level?: string;
  userId: string;
  views: number;
  upvotes: number;
  status: "open" | "closed";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface UseQuestionsOptions {
  userId?: string;
  onlyOpen?: boolean;
  limit?: number;
  realtime?: boolean;
}

export function useQuestions(
  questionId: string | null = null,
  options: UseQuestionsOptions = {}
) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- STABLE QUERY ---------- */

  const questionsQuery = useMemo(() => {
    const constraints: QueryConstraint[] = [];

    if (options.userId) {
      constraints.push(where("userId", "==", options.userId));
    }
    if (options.onlyOpen) {
      constraints.push(where("status", "==", "open"));
    }
    if (options.limit) {
      constraints.push(limit(options.limit));
    }

    return query(collection(db, "questions"), ...constraints);
  }, [options.userId, options.onlyOpen, options.limit]);

  /* ---------- EFFECT ---------- */

  useEffect(() => {
    setLoading(true);
    setError(null);

    let unsubscribe: (() => void) | undefined;

    if (questionId) {
      const ref = doc(db, "questions", questionId);

      unsubscribe = onSnapshot(
        ref,
        (snap) => {
          setQuestion(
            snap.exists()
              ? ({ id: snap.id, ...snap.data() } as Question)
              : null
          );
          setLoading(false);
        },
        (err: FirestoreError) => {
          setError(err.message);
          setLoading(false);
        }
      );
    } else if (options.realtime !== false) {
      unsubscribe = onSnapshot(
        questionsQuery,
        (snap) => {
          setQuestions(
            snap.docs.map(
              (d) => ({ id: d.id, ...d.data() } as Question)
            )
          );
          setLoading(false);
        },
        (err: FirestoreError) => {
          setError(err.message);
          setLoading(false);
        }
      );
    } else {
      getDocs(questionsQuery)
        .then((snap) => {
          setQuestions(
            snap.docs.map(
              (d) => ({ id: d.id, ...d.data() } as Question)
            )
          );
        })
        .catch((err: FirestoreError) => setError(err.message))
        .finally(() => setLoading(false));
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [questionId, questionsQuery, options.realtime]);

  /* ---------- MUTATIONS ---------- */

  const createQuestion = useCallback(async (data: any) => {
    if (!user) throw new Error("Login required");

    const ref = await addDoc(collection(db, "questions"), {
      ...data,
      userId: user.uid,
      views: 0,
      upvotes: 0,
      status: "open",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return ref.id;
  }, [user]);

  const updateQuestion = useCallback(async (id: string, data: Partial<Question>) => {
    if (!user) throw new Error("Login required");
    await updateDoc(doc(db, "questions", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }, [user]);

  const deleteQuestion = useCallback(async (id: string) => {
    if (!user) throw new Error("Login required");
    await deleteDoc(doc(db, "questions", id));
  }, [user]);

  const incrementViews = (id: string) =>
    updateDoc(doc(db, "questions", id), { views: increment(1) });

  const incrementUpvotes = (id: string) =>
    updateDoc(doc(db, "questions", id), { upvotes: increment(1) });

  return {
    questions,
    question,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    incrementViews,
    incrementUpvotes,
  };
}