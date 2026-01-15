// import { useState, useEffect, useCallback, useRef } from "react";

// import {
//   onAuthStateChanged,
//   signInWithPopup,
//   signInAnonymously,
//   signOut,
//   GoogleAuthProvider,
//   type AuthError as FirebaseAuthError,
// } from "firebase/auth";

// import { onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

// import { auth, db } from "../lib/firebase";

// // Ensure a user document exists in Firestore for the authenticated user
// async function ensureUserDocument(firebaseUser: import("firebase/auth").User) {
//   try {
//     const ref = doc(db, "users", firebaseUser.uid);
//     const snap = await getDoc(ref);
//     if (!snap.exists()) {
//       await setDoc(ref, {
//         displayName: firebaseUser.displayName ?? null,
//         photoURL: firebaseUser.photoURL ?? null,
//         email: firebaseUser.email ?? null,
//         createdAt: Date.now(),
//         verified : firebaseUser.emailVerified ?? false,
//         onboardingCompleted : false
//       });
//       return true;
//     }
//     return false;
//   } catch (err) {
//     console.error("ensureUserDocument error:", err);
//   }
// }

// import type { User, AuthError, SignInResult } from "../types/auth";

// /* -------------------- HOOK -------------------- */

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<AuthError | null>(null);

//   const firestoreUnsubRef = useRef<(() => void) | null>(null);
//   const googleProviderRef = useRef(new GoogleAuthProvider());

//   /* -------------------- HELPERS -------------------- */

//   const createAuthError = (err: unknown): AuthError => ({
//     code: (err as any)?.code ?? "unknown",
//     message: (err as any)?.message ?? "Unexpected error",
//     timestamp: Date.now(),
//   });

//   const clearError = useCallback((delay = 5000) => {
//     const timeout = setTimeout(() => setError(null), delay);
//     return () => clearTimeout(timeout);
//   }, []);

//   /* -------------------- FIRESTORE LISTENER -------------------- */

//   const setupFirestoreListener = useCallback((uid: string) => {
//     const ref = doc(db, "users", uid);

//     firestoreUnsubRef.current = onSnapshot(
//       ref,
//       (snap) => {
//         if (!snap.exists()) return;

//         const data = snap.data();

//         setUser((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 displayName: data.displayName ?? prev.displayName,
//                 photoURL: data.photoURL ?? prev.photoURL,
//               }
//             : null
//         );
//       },
//       (err) => console.error("Firestore listener error:", err)
//     );
//   }, []);

//   const cleanupFirestoreListener = useCallback(() => {
//     firestoreUnsubRef.current?.();
//     firestoreUnsubRef.current = null;
//   }, []);

//   /* -------------------- AUTH STATE -------------------- */

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       async (firebaseUser) => {
//         if (!firebaseUser) {
//           setUser(null);
//           cleanupFirestoreListener();
//           setLoading(false);
//           return;
//         }

//         // ✅ ENSURE USER DOCUMENT EXISTS (CRITICAL FIX)
//         await ensureUserDocument(firebaseUser);

//         const isNewUser = await ensureUserDocument(firebaseUser);

//         const mappedUser: User = {
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           displayName: firebaseUser.displayName,
//           photoURL: firebaseUser.photoURL,
//           emailVerified: firebaseUser.emailVerified,
//           isAnonymous: firebaseUser.isAnonymous,
//           createdAt: firebaseUser.metadata.creationTime ?? undefined,
//           lastSignIn: firebaseUser.metadata.lastSignInTime ?? undefined,
//           isNewUser,
//         };

//         setUser(mappedUser);
//         setupFirestoreListener(firebaseUser.uid);
//         setLoading(false);
//       },
//       (err) => {
//         setError(createAuthError(err));
//         setUser(null);
//         setLoading(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//       cleanupFirestoreListener();
//     };
//   }, [setupFirestoreListener, cleanupFirestoreListener]);

//   /* -------------------- ACTIONS -------------------- */

//   const signInWithGoogle = useCallback(async (): Promise<SignInResult> => {
//     try {
//       setLoading(true);
//       googleProviderRef.current.setCustomParameters({
//         prompt: "select_account",
//       });

//       const res = await signInWithPopup(auth, googleProviderRef.current);
//       const isNewUser = await ensureUserDocument(res.user);

//       const mappedUser: User = {
//       uid: res.user.uid,
//       email: res.user.email,
//       displayName: res.user.displayName,
//       photoURL: res.user.photoURL,
//       emailVerified: res.user.emailVerified,
//       isAnonymous: res.user.isAnonymous,
//       createdAt: res.user.metadata.creationTime ?? "",
//       lastSignIn: res.user.metadata.lastSignInTime ?? "",
//       isNewUser,
//     };

//       return { success: true, user: mappedUser, error: null };
//     } catch (err) {
//       const authErr = createAuthError(err as FirebaseAuthError);
//       setError(authErr);
//       clearError();
//       return { success: false, user: null, error: authErr };
//     } finally {
//       setLoading(false);
//     }
//   }, [clearError]);

//   const signInAnon = useCallback(async (): Promise<SignInResult> => {
//     try {
//       setLoading(true);
//       const res = await signInAnonymously(auth);

//       const mappedUser: User = {
//       uid: res.user.uid,
//       email: null,
//       displayName: null,
//       photoURL: null,
//       emailVerified: false,
//       isAnonymous: true,
//       createdAt: "",
//       lastSignIn: "",
//       isNewUser: true, // ✅ Guests always onboard
//     };

//       return { success: true, user: mappedUser, error: null };
//     } catch (err) {
//       const authErr = createAuthError(err as FirebaseAuthError);
//       setError(authErr);
//       clearError();
//       return { success: false, user: null, error: authErr };
//     } finally {
//       setLoading(false);
//     }
//   }, [clearError]);

//   const logout = useCallback(async (): Promise<SignInResult> => {
//     try {
//       setLoading(true);
//       cleanupFirestoreListener();
//       await signOut(auth);
//       return { success: true, user: null, error: null };
//     } catch (err) {
//       const authErr = createAuthError(err as FirebaseAuthError);
//       setError(authErr);
//       clearError();
//       return { success: false, user: null, error: authErr };
//     } finally {
//       setLoading(false);
//     }
//   }, [cleanupFirestoreListener, clearError]);

//   /* -------------------- RETURN -------------------- */

//   return {
//     user,
//     loading,
//     error,
//     signInWithGoogle,
//     signInAnon,
//     logout,
//     clearAuthError: () => setError(null),
//     isAuthenticated: !!user && !user.isAnonymous,
//     isAnonymous: user?.isAnonymous ?? false,
//   };
// };
import { useState, useEffect, useRef } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInAnonymously,
  signOut,
  GoogleAuthProvider,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";
import type { User, AuthError, SignInResult } from "../types/auth";

/* ----------------------------------------------------
   Ensure users/{uid} exists (called ONCE per login)
---------------------------------------------------- */
async function ensureUserDocument(firebaseUser: FirebaseUser): Promise<boolean> {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: firebaseUser.email ?? null,
      displayName: firebaseUser.displayName ?? null,
      photoURL: firebaseUser.photoURL ?? null,
      interests: [],
      skillLevel: null,
      college: null,
      course: null,
      studentId: null,
      onboardingCompleted: false,
      verified: false,
      createdAt: Date.now(),
    });
    return true; // NEW USER
  }

  return false; // EXISTING USER
}

/* ----------------------------------------------------
   useAuth Hook
---------------------------------------------------- */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const firestoreUnsubRef = useRef<(() => void) | null>(null);
  const provider = new GoogleAuthProvider();

  /* ----------------------------------------------------
     Auth state + Firestore listener
  ---------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // USER LOGGED OUT
      if (!firebaseUser) {
        setUser(null);
        firestoreUnsubRef.current?.();
        setLoading(false);
        return;
      }

      // Ensure Firestore doc
      const isNewUser = await ensureUserDocument(firebaseUser);

      // Base user from Firebase Auth
      const baseUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        isAnonymous: firebaseUser.isAnonymous,
        createdAt: firebaseUser.metadata.creationTime ?? "",
        lastSignIn: firebaseUser.metadata.lastSignInTime ?? "",
        isNewUser,
      };

      setUser(baseUser);

      // 🔥 REAL-TIME FIRESTORE LISTENER (THIS BELONGS HERE)
      firestoreUnsubRef.current = onSnapshot(
        doc(db, "users", firebaseUser.uid),
        (snap) => {
          if (!snap.exists()) return;

          const data = snap.data();

          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  displayName: data.displayName ?? prev.displayName,
                  photoURL: data.photoURL ?? prev.photoURL,

                  interests: data.interests ?? prev.interests,
                  skillLevel: data.skillLevel ?? prev.skillLevel,
                  college: data.college ?? prev.college,
                  course: data.course ?? prev.course,
                  studentId: data.studentId ?? prev.studentId,

                  onboardingCompleted: data.onboardingCompleted ?? false,
                  verified: data.verified ?? false,
                }
              : null
          );
        }
      );

      setLoading(false);
    });

    return () => {
      unsubscribe();
      firestoreUnsubRef.current?.();
    };
  }, []);

  /* ----------------------------------------------------
     ACTIONS
  ---------------------------------------------------- */

  const signInWithGoogle = async (): Promise<SignInResult> => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, provider);

      const isNewUser = await ensureUserDocument(res.user);

      const mappedUser: User = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        emailVerified: res.user.emailVerified,
        isAnonymous: res.user.isAnonymous,
        createdAt: res.user.metadata.creationTime ?? "",
        lastSignIn: res.user.metadata.lastSignInTime ?? "",
        isNewUser,
      };

      return { success: true, user: mappedUser, error: null };
    } catch (err: any) {
      return {
        success: false,
        user: null,
        error: {
          code: err.code ?? "auth-error",
          message: err.message ?? "Login failed",
          timestamp: Date.now(),
        },
      };
    } finally {
      setLoading(false);
    }
  };

  const signInAnon = async (): Promise<SignInResult> => {
    const res = await signInAnonymously(auth);

    const mappedUser: User = {
      uid: res.user.uid,
      email: null,
      displayName: null,
      photoURL: null,
      emailVerified: false,
      isAnonymous: true,
      createdAt: "",
      lastSignIn: "",
      isNewUser: true,
    };

    return { success: true, user: mappedUser, error: null };
  };

  const logout = async () => {
    firestoreUnsubRef.current?.();
    await signOut(auth);
    setUser(null);
  };

  /* ----------------------------------------------------
     RETURN
  ---------------------------------------------------- */
  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInAnon,
    logout,
    isAuthenticated: !!user && !user.isAnonymous,
    isAnonymous: user?.isAnonymous ?? false,
  };
};

