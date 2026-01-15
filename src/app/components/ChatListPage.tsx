// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import {
// // // // //   collection,
// // // // //   query,
// // // // //   where,
// // // // //   onSnapshot,
// // // // //   orderBy,
// // // // //   doc,
// // // // //   getDoc
// // // // // } from "firebase/firestore";
// // // // // import { db } from "../lib/firestore";
// // // // // import { useAuth } from "../../hooks/useAuth";

// // // // // /* ---------------- TYPES ---------------- */
// // // // // interface ChatItem {
// // // // //   id: string;
// // // // //   participants: string[];
// // // // //   lastMessage?: string;
// // // // //   updatedAt?: any;
// // // // // }

// // // // // interface UserProfile {
// // // // //   displayName: string;
// // // // //   photoURL?: string;
// // // // // }

// // // // // export default function ChatListPage() {
// // // // //   const { user } = useAuth();
// // // // //   const navigate = useNavigate();
// // // // //   const [chats, setChats] = useState<ChatItem[]>([]);
// // // // //   const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   /* ---------- FETCH CHATS ---------- */
// // // // //   useEffect(() => {
// // // // //     if (!user) return;

// // // // //     const q = query(
// // // // //       collection(db, "chats"),
// // // // //       where("participants", "array-contains", user.uid),
// // // // //       orderBy("updatedAt", "desc")
// // // // //     );

// // // // //     const unsub = onSnapshot(
// // // // //   q,
// // // // //   (snap) => {
// // // // //     setChats(
// // // // //       snap.docs.map((d) => ({
// // // // //         id: d.id,
// // // // //         ...(d.data() as any),
// // // // //       }))
// // // // //     );
// // // // //     setLoading(false);
// // // // //   },
// // // // //   () => setLoading(false)
// // // // // );


// // // // //     return () => unsub();
// // // // //   }, [user]);

// // // // //   /* ---------- FETCH USER PROFILES ---------- */
// // // // //   useEffect(() => {
// // // // //     if (!user || chats.length === 0) return;

// // // // //     chats.forEach(async (chat) => {
// // // // //       const otherUserId = chat.participants.find(
// // // // //         (p) => p !== user.uid
// // // // //       );
// // // // //       if (!otherUserId || profiles[otherUserId]) return;

// // // // //       const snap = await getDoc(doc(db, "users", otherUserId));
// // // // //       if (snap.exists()) {
// // // // //         setProfiles((prev) => ({
// // // // //           ...prev,
// // // // //           [otherUserId]: snap.data() as UserProfile
// // // // //         }));
// // // // //       }
// // // // //     });
// // // // //   }, [chats, user]);

// // // // //   if (!user) return null;

// // // // //   return (
// // // // //     <div className="h-screen w-80 border-r bg-white flex flex-col">

// // // // //       {/* ---------- HEADER ---------- */}
// // // // //       <div className="p-4 border-b">
// // // // //         <h2 className="font-semibold text-lg">Chats</h2>
// // // // //       </div>

// // // // //       {/* ---------- CHAT LIST ---------- */}
// // // // //       <div className="flex-1 overflow-y-auto">
// // // // //         {loading && (
// // // // //           <p className="text-center mt-10 text-gray-500">
// // // // //             Loading chats...
// // // // //           </p>
// // // // //         )}

// // // // //         {!loading && chats.length === 0 && (
// // // // //           <p className="text-center mt-10 text-gray-400">
// // // // //             No conversations yet
// // // // //           </p>
// // // // //         )}

// // // // //         {chats.map((chat) => {
// // // // //           const otherUserId =
// // // // //             chat.participants.find((p) => p !== user.uid)!;

// // // // //           const profile = profiles[otherUserId];

// // // // //           return (
// // // // //             <div
// // // // //               key={chat.id}
// // // // //               onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
// // // // //               className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
// // // // //             >
// // // // //               {/* ---------- AVATAR ---------- */}
// // // // //               {profile?.photoURL ? (
// // // // //                 <img
// // // // //                   src={profile.photoURL}
// // // // //                   alt="avatar"
// // // // //                   className="w-10 h-10 rounded-full object-cover"
// // // // //                 />
// // // // //               ) : (
// // // // //                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
// // // // //                   {profile?.displayName?.charAt(0) || "U"}
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* ---------- TEXT ---------- */}
// // // // //               <div className="flex-1">
// // // // //                 <p className="font-medium text-sm truncate">
// // // // //                   {profile?.displayName || "Loading..."}
// // // // //                 </p>
// // // // //                 <p className="text-xs text-gray-500 truncate">
// // // // //                   {chat.lastMessage || "Start chatting"}
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   collection,
// // // //   query,
// // // //   where,
// // // //   onSnapshot,
// // // //   doc,
// // // //   getDoc,
// // // //   orderBy,
// // // // } from "firebase/firestore";

// // // // import { db } from "../lib/firestore";
// // // // import { useAuth } from "../../hooks/useAuth";

// // // // /* ---------------- TYPES ---------------- */

// // // // interface ChatItem {
// // // //   id: string;
// // // //   participants: string[];
// // // //   lastMessage?: string;
// // // //   updatedAt?: any;
// // // //   isGroup?: boolean;
// // // //   name?: string;
// // // // }

// // // // interface UserProfile {
// // // //   displayName: string;
// // // //   photoURL?: string;
// // // // }

// // // // /* ---------------- COMPONENT ---------------- */

// // // // export default function ChatListPage() {
// // // //   const { user } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [chats, setChats] = useState<ChatItem[]>([]);
// // // //   const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
// // // //   const [loading, setLoading] = useState(true);

// // // //   /* ---------- FETCH CHATS (REALTIME) ---------- */
// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     const q = query(
// // // //       collection(db, "chats"),
// // // //       where("participants", "array-contains", user.uid)
// // // //     );

// // // //     const unsub = onSnapshot(q, (snap) => {
// // // //       const list = snap.docs.map((d) => ({
// // // //         id: d.id,
// // // //         ...(d.data() as any),
// // // //       }));

// // // //       // Sort manually to avoid index issues
// // // //       list.sort((a, b) => {
// // // //         const aTime = a.updatedAt?.seconds || 0;
// // // //         const bTime = b.updatedAt?.seconds || 0;
// // // //         return bTime - aTime;
// // // //       });

// // // //       setChats(list);
// // // //       setLoading(false);
// // // //     });

// // // //     return () => unsub();
// // // //   }, [user]);

// // // //   /* ---------- FETCH USER PROFILES ---------- */
// // // //   useEffect(() => {
// // // //     if (!user) return;

// // // //     chats.forEach(async (chat) => {
// // // //       if (chat.isGroup) return;

// // // //       const otherUserId = chat.participants.find(
// // // //         (p) => p !== user.uid
// // // //       );

// // // //       if (!otherUserId || profiles[otherUserId]) return;

// // // //       const snap = await getDoc(doc(db, "users", otherUserId));
// // // //       if (snap.exists()) {
// // // //         setProfiles((prev) => ({
// // // //           ...prev,
// // // //           [otherUserId]: snap.data() as UserProfile,
// // // //         }));
// // // //       }
// // // //     });
// // // //   }, [chats, user]);

// // // //   if (!user) return null;

// // // //   return (
// // // //     <div className="h-screen w-80 border-r bg-white flex flex-col">

// // // //       {/* ---------- HEADER ---------- */}
// // // //       <div className="p-4 border-b">
// // // //         <h2 className="font-semibold text-lg">Chats</h2>
// // // //       </div>

// // // //       {/* ---------- CHAT LIST ---------- */}
// // // //       <div className="flex-1 overflow-y-auto">

// // // //         {loading && (
// // // //           <p className="text-center mt-10 text-gray-500">
// // // //             Loading chats...
// // // //           </p>
// // // //         )}

// // // //         {!loading && chats.length === 0 && (
// // // //           <p className="text-center mt-10 text-gray-400">
// // // //             No conversations yet
// // // //           </p>
// // // //         )}

// // // //         {chats.map((chat) => {
// // // //           const isGroup = chat.isGroup;

// // // //           let title = "Chat";
// // // //           let avatarLetter = "G";

// // // //           if (isGroup) {
// // // //             title = chat.name || "Group Chat";
// // // //             avatarLetter = title.charAt(0);
// // // //           } else {
// // // //             const otherUserId =
// // // //               chat.participants.find((p) => p !== user.uid)!;

// // // //             const profile = profiles[otherUserId];
// // // //             title = profile?.displayName || "Loading...";
// // // //             avatarLetter = title.charAt(0);
// // // //           }

// // // //           return (
// // // //             <div
// // // //               key={chat.id}
// // // //               onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
// // // //               className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
// // // //             >
// // // //               {/* ---------- AVATAR ---------- */}
// // // //               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
// // // //                 {avatarLetter}
// // // //               </div>

// // // //               {/* ---------- TEXT ---------- */}
// // // //               <div className="flex-1">
// // // //                 <p className="font-medium text-sm truncate">
// // // //                   {title}
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-500 truncate">
// // // //                   {chat.lastMessage || "Start chatting"}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   collection,
// // //   query,
// // //   where,
// // //   onSnapshot,
// // //   doc,
// // //   getDoc,
// // // } from "firebase/firestore";

// // // import { db } from "../lib/firestore";
// // // import { useAuth } from "../../hooks/useAuth";

// // // interface ChatItem {
// // //   id: string;
// // //   participants: string[];
// // //   lastMessage?: string;
// // //   updatedAt?: any;
// // //   isGroup?: boolean;
// // //   name?: string;
// // // }

// // // export default function ChatListPage() {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [chats, setChats] = useState<ChatItem[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const q = query(
// // //       collection(db, "chats"),
// // //       where("participants", "array-contains", user.uid)
// // //     );

// // //     const unsub = onSnapshot(q, snap => {
// // //       const list = snap.docs.map(d => ({
// // //         id: d.id,
// // //         ...(d.data() as any),
// // //       }));

// // //       list.sort((a, b) => {
// // //         const aTime = a.updatedAt?.seconds || 0;
// // //         const bTime = b.updatedAt?.seconds || 0;
// // //         return bTime - aTime;
// // //       });

// // //       setChats(list);
// // //       setLoading(false);
// // //     });

// // //     return () => unsub();
// // //   }, [user]);

// // //   return (
// // //     <div className="h-screen w-80 border-r bg-white flex flex-col">

// // //       <div className="p-4 border-b flex justify-between">
// // //         <h2 className="font-semibold text-lg">Chats</h2>
// // //         <button
// // //           onClick={() => navigate("/dashboard/chats/create-group")}
// // //           className="text-sm text-blue-600"
// // //         >
// // //           + Group
// // //         </button>
// // //       </div>

// // //       <div className="flex-1 overflow-y-auto">
// // //         {loading && <p className="text-center mt-10">Loading...</p>}

// // //         {chats.map(chat => (
// // //           <div
// // //             key={chat.id}
// // //             onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
// // //             className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
// // //           >
// // //             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
// // //               {(chat.isGroup ? chat.name : "U")?.charAt(0)}
// // //             </div>

// // //             <div className="flex-1">
// // //               <p className="font-medium text-sm truncate">
// // //                 {chat.isGroup ? chat.name : "Private Chat"}
// // //               </p>
// // //               <p className="text-xs text-gray-500 truncate">
// // //                 {chat.lastMessage || "Start chatting"}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// //   doc,
// //   getDoc,
// // } from "firebase/firestore";
// // import { db } from "../lib/firestore";
// // import { useAuth } from "../../hooks/useAuth";

// // interface ChatItem {
// //   id: string;
// //   participants: string[];
// //   lastMessage?: string;
// //   updatedAt?: any;
// //   isGroup?: boolean;
// //   name?: string;
// // }

// // interface UserProfile {
// //   displayName: string;
// //   photoURL?: string;
// // }

// // export default function ChatListPage() {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   const [chats, setChats] = useState<ChatItem[]>([]);
// //   const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!user) return;

// //     const q = query(
// //       collection(db, "chats"),
// //       where("participants", "array-contains", user.uid)
// //     );

// //     const unsub = onSnapshot(q, snap => {
// //       const list = snap.docs.map(d => ({
// //         id: d.id,
// //         ...(d.data() as any),
// //       }));

// //       list.sort((a, b) => {
// //         const aTime = a.updatedAt?.seconds || 0;
// //         const bTime = b.updatedAt?.seconds || 0;
// //         return bTime - aTime;
// //       });

// //       setChats(list);
// //       setLoading(false);
// //     });

// //     return () => unsub();
// //   }, [user]);

// //   useEffect(() => {
// //     if (!user) return;

// //     chats.forEach(async chat => {
// //       if (chat.isGroup) return;

// //       const otherUserId = chat.participants.find(p => p !== user.uid);
// //       if (!otherUserId || profiles[otherUserId]) return;

// //       const snap = await getDoc(doc(db, "users", otherUserId));
// //       if (snap.exists()) {
// //         setProfiles(prev => ({
// //           ...prev,
// //           [otherUserId]: snap.data() as UserProfile,
// //         }));
// //       }
// //     });
// //   }, [chats, user]);

// //   if (!user) return null;

// //   return (
// //     <div className="h-screen w-80 border-r bg-white flex flex-col">

// //       <div className="p-4 border-b flex justify-between">
// //         <h2 className="font-semibold text-lg">Chats</h2>
// //         <button
// //           onClick={() => navigate("/dashboard/chats/create-group")}
// //           className="text-sm text-blue-600"
// //         >
// //           + Group
// //         </button>
// //       </div>

// //       <div className="flex-1 overflow-y-auto">
// //         {loading && <p className="text-center mt-10">Loading...</p>}

// //         {chats.map(chat => {
// //           let title = "Chat";
// //           let avatar = null;
// //           let letter = "C";

// //           if (chat.isGroup) {
// //             title = chat.name || "Group Chat";
// //             letter = title.charAt(0).toUpperCase();
// //           } else {
// //             const otherUserId = chat.participants.find(p => p !== user.uid)!;
// //             const profile = profiles[otherUserId];
// //             title = profile?.displayName || "User";
// //             avatar = profile?.photoURL || null;
// //             letter = title.charAt(0).toUpperCase();
// //           }

// //           return (
// //             <div
// //               key={chat.id}
// //               onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
// //               className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
// //             >
// //               {avatar ? (
// //                 <img
// //                   src={avatar}
// //                   className="w-10 h-10 rounded-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
// //                   {letter}
// //                 </div>
// //               )}

// //               <div className="flex-1">
// //                 <p className="font-medium text-sm truncate">{title}</p>
// //                 <p className="text-xs text-gray-500 truncate">
// //                   {chat.lastMessage || "Start chatting"}
// //                 </p>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";

// export default function ChatListPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [chats, setChats] = useState<any[]>([]);
//   const [profiles, setProfiles] = useState<any>({});

//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "chats"),
//       where("participants", "array-contains", user.uid)
//     );

//     return onSnapshot(q, snap => {
//       setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });
//   }, [user]);

//   useEffect(() => {
//     chats.forEach(async chat => {
//       if (chat.isGroup) return;

//       const other = chat.participants.find((p: string) => p !== user!.uid);
//       if (!other || profiles[other]) return;

//       const snap = await getDoc(doc(db, "users", other));
//       if (snap.exists()) {
//         setProfiles((prev: any) => ({ ...prev, [other]: snap.data() }));
//       }
//     });
//   }, [chats]);

//   return (
//     <div className="h-screen w-80 border-r bg-white flex flex-col">

//       <div className="p-4 border-b flex justify-between">
//         <h2 className="font-semibold text-lg">Chats</h2>
//         <button
//           onClick={() => navigate("/dashboard/chats/create-group")}
//           className="text-sm text-blue-600"
//         >
//           + Group
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {chats.map(chat => {
//           let title = chat.isGroup
//             ? chat.name
//             : profiles[chat.participants.find((p: string) => p !== user!.uid)]?.displayName || "User";

//           return (
//             <div
//               key={chat.id}
//               onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
//               className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
//             >
//               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//                 {title.charAt(0).toUpperCase()}
//               </div>

//               <div className="flex-1">
//                 <p className="font-medium text-sm">{title}</p>
//                 <p className="text-xs text-gray-500 truncate">
//                   {chat.lastMessage || "Start chatting"}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";

interface ChatItem {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt?: any;
  isGroup?: boolean;
  name?: string;
}

interface UserProfile {
  displayName: string;
  email?: string;
  photoURL?: string;
}

export default function ChatListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState<ChatItem[]>([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CHATS ================= */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid)
    );

    return onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({
        id: d.id,
        ...(d.data() as any),
      }));

      // sort latest first
      list.sort((a, b) => {
        const aTime = a.updatedAt?.seconds || 0;
        const bTime = b.updatedAt?.seconds || 0;
        return bTime - aTime;
      });

      setChats(list);
      setLoading(false);
    });
  }, [user]);

  /* ================= LOAD USER PROFILES ================= */
  useEffect(() => {
    if (!user) return;

    chats.forEach(async chat => {
      if (chat.isGroup) return;

      const otherUserId = chat.participants.find(p => p !== user.uid);
      if (!otherUserId || profiles[otherUserId]) return;

      const snap = await getDoc(doc(db, "users", otherUserId));
      if (snap.exists()) {
        setProfiles(prev => ({
          ...prev,
          [otherUserId]: snap.data() as UserProfile,
        }));
      }
    });
  }, [chats, user]);

  if (!user) return null;

  return (
    <div className="h-screen w-80 border-r bg-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg">Chats</h2>
        <button
          onClick={() => navigate("/dashboard/chats/create-group")}
          className="text-sm text-blue-600"
        >
          + Group
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">

        {loading && (
          <p className="text-center mt-10 text-gray-500">Loading chats...</p>
        )}

        {!loading && chats.length === 0 && (
          <p className="text-center mt-10 text-gray-400">No conversations yet</p>
        )}

        {chats.map(chat => {
          let title = "Chat";
          let avatar: string | null = null;
          let letter = "C";

          if (chat.isGroup) {
            title = chat.name || "Group Chat";
            letter = title.charAt(0).toUpperCase();
          } else {
            const otherUserId = chat.participants.find(p => p !== user.uid)!;
            const profile = profiles[otherUserId];

            title = profile?.displayName || "User";
            avatar = profile?.photoURL || null;
            letter = title.charAt(0).toUpperCase();
          }

          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/dashboard/chats/${chat.id}`)}
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
            >
              {/* AVATAR */}
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {letter}
                </div>
              )}

              {/* TEXT */}
              <div className="flex-1">
                <p className="font-medium text-sm truncate">{title}</p>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage || "Start chatting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
