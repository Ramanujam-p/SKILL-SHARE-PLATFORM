// // // import { useEffect, useState } from "react";
// // // import { motion } from "motion/react";
// // // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // // import { Button } from "./ui/button";
// // // import { Users } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";
// // // import { toast } from "sonner";

// // // import { getDocs, addDoc, serverTimestamp } from "firebase/firestore";
// // // import { usersRef, skillRequestsRef } from "../lib/firestore";
// // // import { useAuth } from "../../hooks/useAuth";

// // // /* ---------------- TYPES ---------------- */

// // // interface Peer {
// // //   id: string;
// // //   name: string;
// // //   avatar?: string;
// // //   major?: string;
// // // }

// // // /* ---------------- COMPONENT ---------------- */

// // // export function SuggestedPeers() {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();

// // //   const [peers, setPeers] = useState<Peer[]>([]);

// // //   /* ---------------- LOAD USERS ---------------- */

// // //   useEffect(() => {
// // //     if (!user) return;

// // //     async function loadPeers() {
// // //       const snap = await getDocs(usersRef);

// // //       const data: Peer[] = snap.docs
// // //         .map((d) => ({
// // //           id: d.id,
// // //           ...(d.data() as Peer),
// // //         }))
// // //         .filter((p) => p.id !== user.uid)
// // //         .slice(0, 3); // top 3 only

// // //       setPeers(data);
// // //     }

// // //     loadPeers();
// // //   }, [user]);

// // //   /* ---------------- CONNECT ---------------- */

// // //   const handleConnect = async (peerId: string) => {
// // //     if (!user) return;

// // //     await addDoc(skillRequestsRef, {
// // //       fromUserId: user.uid,
// // //       toUserId: peerId,
// // //       status: "pending",
// // //       createdAt: serverTimestamp(),
// // //     });

// // //     toast.success("Connection request sent");
// // //   };

// // //   /* ---------------- RENDER ---------------- */

// // //   return (
// // //     <div className="space-y-3">
// // //       {peers.map((peer, index) => (
// // //         <motion.div
// // //           key={peer.id}
// // //           initial={{ opacity: 0, x: -10 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ delay: 0.1 * index, duration: 0.3 }}
// // //           className="
// // //             flex items-center justify-between
// // //             p-3 rounded-lg border border-gray-100
// // //             hover:border-blue-200 hover:bg-blue-50/30
// // //             transition-all
// // //           "
// // //         >
// // //           <div className="flex items-center gap-3">
// // //             <Avatar className="size-10 border-2 border-white shadow-sm">
// // //               <AvatarImage src={peer.avatar} alt={peer.name} />
// // //               <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
// // //                 {peer.name
// // //                   ?.split(" ")
// // //                   .map((n) => n[0])
// // //                   .join("")
// // //                   .toUpperCase()}
// // //               </AvatarFallback>
// // //             </Avatar>

// // //             <div>
// // //               <p className="font-medium text-gray-900">{peer.name}</p>
// // //               <p className="text-xs text-gray-500">{peer.major}</p>
// // //             </div>
// // //           </div>

// // //           <Button
// // //             size="sm"
// // //             variant="outline"
// // //             onClick={() => handleConnect(peer.id)}
// // //             className="text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600"
// // //           >
// // //             Connect
// // //           </Button>
// // //         </motion.div>
// // //       ))}

// // //       {/* View All */}
// // //       <motion.div
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         transition={{ delay: 0.4 }}
// // //       >
// // //         <Button
// // //           variant="ghost"
// // //           onClick={() => navigate("/dashboard/skillmatch")}
// // //           className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
// // //         >
// // //           <Users className="size-4 mr-2" />
// // //           View All Suggestions
// // //         </Button>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Users } from "lucide-react";

// // import { useAuth } from "../../hooks/useAuth";
// // import { useMatching } from "../../hooks/useMatching";
// // import { PeerCard } from "./PeerCard";
// // import { Button } from "./ui/button";

// // export function SuggestedPeers() {
// //   const { user } = useAuth();
// //   const { matches, findMatches } = useMatching();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!user) return;
// //     findMatches(user.uid, 3);
// //   }, [user, findMatches]);

// //   return (
// //     <div className="space-y-3">
// //       {matches.map((peer) => (
// //         <PeerCard
// //           key={peer.id}
// //           peer={peer}
// //           onConnect={() => {}}
// //         />
// //       ))}

// //       <Button
// //         variant="ghost"
// //         onClick={() => navigate("/dashboard/skillmatch")}
// //         className="w-full text-sm text-blue-600"
// //       >
// //         <Users className="size-4 mr-2" />
// //         View All Matches
// //       </Button>
// //     </div>
// //   );
// // }


// import { motion } from "motion/react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// import { useAuth } from "../../hooks/useAuth";
// import { useMatching } from "../../hooks/useMatching";

// /* ---------------- TYPES ---------------- */

// interface Peer {
//   id: string;
//   name: string;
//   avatar?: string;
//   interests?: string[];
//   matchScore: number;
// }

// /* ---------------- COMPONENT ---------------- */

// export function SuggestedPeers() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { matches, findMatches } = useMatching();

//   /* ---------------- LOAD MATCHED PEERS ---------------- */

//   if (user && matches.length === 0) {
//     findMatches(user.uid, 3).catch(() =>
//       toast.error("Failed to load suggestions")
//     );
//   }

//   /* ---------------- CONNECT ---------------- */

//   const handleConnect = (peerId: string) => {
//     toast.success("Connection request sent");
//   };

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="space-y-3">
//       {matches.map((peer, index) => (
//         <motion.div
//           key={peer.id}
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 * index, duration: 0.3 }}
//           className="
//             relative
//             flex items-center justify-between
//             p-3 rounded-lg border border-gray-100
//             hover:border-blue-200 hover:bg-blue-50/30
//             transition-all
//           "
//         >
//           {/* MATCH SCORE BADGE */}
//           <span className="
//             absolute top-2 right-2
//             px-2 py-0.5
//             text-xs font-semibold
//             rounded-full
//             bg-green-100 text-green-700
//           ">
//             {peer.matchScore}%
//           </span>

//           <div className="flex items-center gap-3">
//             <Avatar className="size-10 border-2 border-white shadow-sm">
//               <AvatarImage src={peer.avatar} alt={peer.name} />
//               <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
//                 {peer.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .toUpperCase()}
//               </AvatarFallback>
//             </Avatar>

//             <div>
//               <p className="font-medium text-gray-900">{peer.name}</p>
//               <p className="text-xs text-gray-500">
//                 {peer.interests?.slice(0, 2).join(", ") || "Multiple interests"}
//               </p>
//             </div>
//           </div>

//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => handleConnect(peer.id)}
//             className="text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600"
//           >
//             Connect
//           </Button>
//         </motion.div>
//       ))}

//       {/* View All */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <Button
//           variant="ghost"
//           onClick={() => navigate("/dashboard/skillmatch")}
//           className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//         >
//           <Users className="size-4 mr-2" />
//           View All Matches
//         </Button>
//       </motion.div>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { motion } from "motion/react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// import { useAuth } from "../../hooks/useAuth";
// import { useMatching } from "../../hooks/useMatching";

// /* ---------------- COMPONENT ---------------- */

// export function SuggestedPeers() {
//   const { user } = useAuth();
//   const { matches, findMatches } = useMatching();
//   const navigate = useNavigate();

//   /* ✅ LOAD MATCHES ONCE */
//   useEffect(() => {
//     if (!user) return;

//     findMatches(user.uid, 3).catch(() =>
//       toast.error("Failed to load suggestions")
//     );
//   }, [user, findMatches]);

//   const handleConnect = (peerId: string) => {
//     toast.success("Connection request sent");
//   };

//   return (
//     <div className="space-y-3">
//       {matches.map((peer, index) => (
//         <motion.div
//           key={peer.id}
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 * index, duration: 0.3 }}
//           className="
//             relative flex items-center justify-between
//             p-3 rounded-lg border border-gray-100
//             hover:border-blue-200 hover:bg-blue-50/30
//             transition-all
//           "
//         >
//           {/* MATCH SCORE */}
//           <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//             {peer.matchScore}%
//           </span>

//           <div className="flex items-center gap-3">
//             <Avatar className="size-10 border-2 border-white shadow-sm">
//               <AvatarImage src={peer.avatar} alt={peer.name} />
//               <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
//                 {peer.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .toUpperCase()}
//               </AvatarFallback>
//             </Avatar>

//             <div>
//               <p className="font-medium text-gray-900">{peer.name}</p>
//               <p className="text-xs text-gray-500">
//                 {peer.interests?.slice(0, 2).join(", ") || "Multiple interests"}
//               </p>
//             </div>
//           </div>

//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => handleConnect(peer.id)}
//             className="text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600"
//           >
//             Connect
//           </Button>
//         </motion.div>
//       ))}

//       {/* VIEW ALL */}
//       <Button
//         variant="ghost"
//         onClick={() => navigate("/dashboard/skillmatch")}
//         className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//       >
//         <Users className="size-4 mr-2" />
//         View All Matches
//       </Button>
//     </div>
//   );
// }
import { useEffect } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";
import { useMatching } from "../../hooks/useMatching";

/* ---------------- COMPONENT ---------------- */

export function SuggestedPeers() {
  const { user } = useAuth();
  const { matches, findMatches } = useMatching();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    findMatches(user.uid, 1).catch(() =>
      toast.error("Failed to load suggestions")
    );
  }, [user, findMatches]);

  const handleConnect = (peerId: string) => {
    toast.success("Connection request sent");
  };

  return (
    <div className="space-y-4">
      {matches.map((peer, index) => (
        <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
  whileHover={{ y: -4 }}
  className="
    relative bg-white rounded-2xl
    border border-gray-100
    shadow-md hover:shadow-xl
    transition-all overflow-hidden
  "
>
  {/* MATCH % BADGE */}
  <div className="
    absolute top-4 right-4
    px-3 py-1 text-xs font-bold
    rounded-full
    bg-green-100 text-green-700
  ">
    {peer.matchScore}% Match
  </div>

  {/* CARD CONTENT */}
  <div className="p-6 flex flex-col gap-4">

    {/* HEADER */}
    <div className="flex items-center gap-4">
      <div className="
        relative size-14 rounded-full
        bg-gradient-to-br from-blue-500 to-purple-600
        flex items-center justify-center
      ">
        <Avatar className="size-12 bg-white">
          <AvatarImage src={peer.avatar} />
          <AvatarFallback className="font-bold text-gray-700">
            {peer.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-900">
          {peer.name}
        </p>

        <span className="
          inline-block mt-1
          px-2 py-0.5 text-xs rounded-full
          bg-blue-50 text-blue-700 capitalize
        ">
          {peer.skillLevel} level
        </span>
      </div>
    </div>

    {/* INTERESTS */}
    <div className="flex flex-wrap gap-2">
      {peer.interests?.slice(0, 3).map((interest) => (
        <span
          key={interest}
          className="
            px-3 py-1 text-xs font-medium
            rounded-full
            bg-gray-100 text-gray-700
          "
        >
          #{interest}
        </span>
      ))}
    </div>

    {/* CTA */}
    <Button
      onClick={() => handleConnect(peer.id)}
      className="
        mt-2 w-full h-11
        text-sm font-semibold
        bg-gradient-to-r from-blue-600 to-purple-600
        hover:from-blue-700 hover:to-purple-700
        text-white rounded-xl
      "
    >
      Connect
    </Button>
  </div>
</motion.div>

      ))}

      {/* VIEW ALL */}
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard/skillmatch")}
        className="
          w-full text-sm font-medium
          text-blue-600 hover:text-blue-700
          hover:bg-blue-50
        "
      >
        <Users className="size-4 mr-2" />
        View All Matches
      </Button>
    </div>
  );
}
