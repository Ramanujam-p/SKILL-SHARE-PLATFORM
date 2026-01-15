import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../hooks/useAuth";

export async function ensureUserDocument(user) {
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      name: user.displayName ?? "Guest",
      email: user.email,
      avatar: user.photoURL,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}
