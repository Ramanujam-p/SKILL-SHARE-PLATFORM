// // import { JSX, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Badge } from "./ui/badge";
// import { Target, Sparkles } from "lucide-react";
// import { toast } from "sonner";

// import { useAuth } from "../../hooks/useAuth";
// import { useMatching } from "../../hooks/useMatching";
// import { PeerCard } from "./PeerCard";
// import { EmptyState } from "./EmptyState";
// import { JSX,useEffect } from "react";

// const handleConnect = (peerId: string) => {
//   toast.success("Connection request sent");
//   // later: Firestore addDoc(skillRequests)
// };


// export function SkillMatchPage(): JSX.Element {
//   const { user } = useAuth();
//   const { matches, loading, findMatches } = useMatching();

//   useEffect(() => {
//     if (!user) return;

//     findMatches(user.uid).catch(() =>
//       toast.error("Failed to load matches")
//     );
//   }, [user, findMatches]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-8 py-8">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <Target className="size-8 text-blue-600" />
//             <h1 className="text-3xl font-bold">SkillMatch</h1>
//             <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//               <Sparkles className="size-3 mr-1" />
//               Smart Matching
//             </Badge>
//           </div>
//           <p className="text-gray-600">
//             Discover peers who share your interests.
//           </p>
//         </motion.div>

//         {/* Content */}
//         <AnimatePresence mode="wait">
//           {loading ? (
//             <p className="text-sm text-gray-500">Finding matches…</p>
//           ) : matches.length > 0 ? (
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               {matches.map((peer, i) => (
//                 <PeerCard
//                   key={peer.id}
//                   peer={{
//                     id: peer.id,
//                     name: peer.name ?? "Student",
//                     avatar: undefined,
//                     interests: peer.interests
//                   }}
//                   delay={i * 0.05}
//                   onConnect={handleConnect} 
//                 />
//               ))}
//             </motion.div>
//           ) : (
//             <EmptyState />
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
// import { JSX, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Badge } from "./ui/badge";
// import { Target, Sparkles } from "lucide-react";
// import { toast } from "sonner";

// import { useAuth } from "../../hooks/useAuth";
// import { useMatching } from "../../hooks/useMatching";
// import { PeerCard } from "./PeerCard";
// import { EmptyState } from "./EmptyState";

// export function SkillMatchPage(): JSX.Element {
//   const { user } = useAuth();
//   const { matches, loading, findMatches } = useMatching();

//   useEffect(() => {
//     if (!user) return;
//     findMatches(user.uid).catch(() =>
//       toast.error("Failed to load matches")
//     );
//   }, [user, findMatches]);

//   const handleConnect = (peerId: string) => {
//     toast.success("Connection request sent");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-8 py-8">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <Target className="size-8 text-blue-600" />
//             <h1 className="text-3xl font-bold">SkillMatch</h1>
//             <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//               <Sparkles className="size-3 mr-1" />
//               Smart Matching
//             </Badge>
//           </div>
//           <p className="text-gray-600">
//             Matches ranked by interest & skill compatibility
//           </p>
//         </motion.div>

//         {/* Content */}
//         <AnimatePresence mode="wait">
//           {loading ? (
//             <p className="text-sm text-gray-500">Finding matches…</p>
//           ) : matches.length > 0 ? (
//             <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {matches.map((peer, i) => (
//                 <PeerCard
//                   key={peer.id}
//                   peer={peer}
//                   delay={i * 0.05}
//                   onConnect={handleConnect}
//                 />
//               ))}
//             </motion.div>
//           ) : (
//             <EmptyState />
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firestore";

import { JSX, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";
import { useMatching } from "../../hooks/useMatching";
import { PeerCard } from "./PeerCard";
import { EmptyState } from "./EmptyState";
import { Badge } from "./ui/badge";

/* ================= COMPONENT ================= */

export function SkillMatchPage(): JSX.Element {
  const { user } = useAuth();
  const { matches, loading, findMatches } = useMatching();

  /* ---------------- LOAD MATCHES ---------------- */
  useEffect(() => {
    if (!user) return;

    findMatches(user.uid).catch(() =>
      toast.error("Failed to load skill matches")
    );
  }, [user, findMatches]);

  /* ---------------- CONNECT ---------------- */
const handleConnect = async (peerId: string) => {
  if (!user) return;

  try {
    await addDoc(collection(db, "skillRequests"), {
      fromUserId: user.uid,
      fromUserName: user.displayName ?? "Anonymous",
      fromUserPhoto: user.photoURL ?? "",
      fromUserSkills: user.interests ?? [], // if you store skills on user
      toUserId: peerId,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    toast.success("Connection request sent");
  } catch (err) {
    console.error(err);
    toast.error("Failed to send request");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="size-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              SkillMatch
            </h1>

            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Sparkles className="size-3 mr-1" />
              Smart Matching
            </Badge>
          </div>

          <p className="text-gray-600">
            Discover peers ranked by shared interests and skill compatibility.
          </p>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500"
            >
              Finding best matches…
            </motion.p>
          ) : matches.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {matches.map((peer, index) => (
                <PeerCard
                  key={peer.id}
                   peer={{
                    ...peer,
                    interests: peer.interests ?? [], // ✅ guarantee array
                  }}
                  delay={index * 0.06}
                  onConnect={handleConnect}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
