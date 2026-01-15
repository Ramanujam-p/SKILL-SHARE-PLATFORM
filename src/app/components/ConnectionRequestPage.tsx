// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { Button } from "./ui/button";
// import { toast } from "sonner";

// export function ConnectionRequestPage() {
//   const { requestId } = useParams();
//   const navigate = useNavigate();
//   const [request, setRequest] = useState<any>(null);
//   const [sender, setSender] = useState<any>(null);

//   useEffect(() => {
//     async function load() {
//       if (!requestId) return;

//       const reqSnap = await getDoc(doc(db, "skillRequests", requestId));
//       if (!reqSnap.exists()) return;

//       setRequest(reqSnap.data());

//       const userSnap = await getDoc(
//         doc(db, "users", reqSnap.data().fromUserId)
//       );
//       setSender(userSnap.data());
//     }

//     load();
//   }, [requestId]);

//   const updateStatus = async (status: "accepted" | "rejected") => {
//     if (!requestId) return;

//     await updateDoc(doc(db, "skillRequests", requestId), {
//       status,
//     });

//     toast.success(`Request ${status}`);
//     navigate("/dashboard");
//   };

//   if (!request || !sender) return null;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">
//         Connection Request
//       </h2>

//       <p className="font-medium">{sender.displayName}</p>
//       <p className="text-sm text-gray-600 mb-4">
//         Interests: {sender.interests?.join(", ")}
//       </p>

//       <div className="flex gap-4">
//         <Button onClick={() => updateStatus("accepted")}>
//           Accept
//         </Button>
//         <Button
//           variant="outline"
//           onClick={() => updateStatus("rejected")}
//         >
//           Reject
//         </Button>
//       </div>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";
// import { Button } from "./ui/button";
// import { motion } from "motion/react";

// const navigate = useNavigate();


// export function ConnectionsPage() {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState<any[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "skillRequests"),
//       where("toUserId", "==", user.uid),
//       where("status", "==", "pending")
//     );

//     return onSnapshot(q, (snap) => {
//       setRequests(
//         snap.docs.map(d => ({ id: d.id, ...d.data() }))
//       );
//     });
//   }, [user]);

//   const acceptRequest = async (req: any) => {
//   await updateDoc(doc(db, "skillRequests", req.id), {
//     status: "accepted",
//   });

//   const chatRef = await addDoc(collection(db, "chats"), {
//     participants: [req.fromUserId, req.toUserId],
//     lastMessage: "",
//     updatedAt: serverTimestamp(),
//   });

//   navigate(`/dashboard/chats/${chatRef.id}`); // ✅ instant chat
// };


//     await addDoc(collection(db, "chats"), {
//       participants: [req.fromUserId, req.toUserId],
//       lastMessage: "",
//       updatedAt: serverTimestamp(),
//     });
//   };

//   const rejectRequest = async (id: string) => {
//     await updateDoc(doc(db, "skillRequests", id), {
//       status: "rejected",
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Connection Requests</h2>

//       {requests.map(req => (
//         <motion.div
//           key={req.id}
//           className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <span className="font-medium">New request</span>

//           <div className="flex gap-2">
//             <Button onClick={() => acceptRequest(req)}>Accept</Button>
//             <Button variant="outline" onClick={() => rejectRequest(req.id)}>
//               Reject
//             </Button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "./ui/button";
import { motion } from "motion/react";

/* ---------------- TYPES ---------------- */

export interface SkillRequest {
  id: string;

  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  fromUserSkills?: string[];

  toUserId: string;
  status: "pending" | "accepted" | "rejected";
}


/* ---------------- COMPONENT ---------------- */

export function ConnectionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ MUST be inside component
  const [requests, setRequests] = useState<SkillRequest[]>([]);

  /* ---------------- LOAD REQUESTS ---------------- */

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "skillRequests"),
      where("toUserId", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
  setRequests(
    snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<SkillRequest, "id">),
    }))
  );
});


    return unsubscribe;
  }, [user]);

  /* ---------------- ACTIONS ---------------- */

  const acceptRequest = async (req: SkillRequest) => {
    // 1️⃣ Update request status
    await updateDoc(doc(db, "skillRequests", req.id), {
      status: "accepted",
    });

    // 2️⃣ Create chat
    const chatRef = await addDoc(collection(db, "chats"), {
      participants: [req.fromUserId, req.toUserId],
      lastMessage: "",
      updatedAt: serverTimestamp(),
    });

    // 3️⃣ Navigate to chat
    navigate(`/dashboard/chats/${chatRef.id}`);
  };

  const rejectRequest = async (id: string) => {
    await updateDoc(doc(db, "skillRequests", id), {
      status: "rejected",
    });
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Connection Requests</h2>

      {requests.length === 0 && (
        <p className="text-sm text-gray-500">
          No pending requests
        </p>
      )}

      {requests.map((req) => (
  <motion.div
    key={req.id}
    className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center gap-3">
      <img
        src={req.fromUserPhoto || "/avatar.png"}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <p className="font-semibold">
          {req.fromUserName}
        </p>

        {req.fromUserSkills?.length > 0 && (
          <p className="text-xs text-gray-500">
            {req.fromUserSkills.join(", ")}
          </p>
        )}
      </div>
    </div>

    <div className="flex gap-2">
      <Button onClick={() => acceptRequest(req)}>
        Accept
      </Button>

      <Button
        variant="outline"
        onClick={() => rejectRequest(req.id)}
      >
        Reject
      </Button>
    </div>
  </motion.div>
))}

    </div>
  );
}
