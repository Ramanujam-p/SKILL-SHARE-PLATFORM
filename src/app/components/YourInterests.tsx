// // import { useEffect, useState } from "react";
// // import { motion } from "motion/react";
// // import { Badge } from "./ui/badge";
// // import { Button } from "./ui/button";
// // import { Sparkles, TrendingUp } from "lucide-react";

// // import { getDocs } from "firebase/firestore";
// // import { usersRef } from "../lib/firestore";

// // /* ---------------- TYPES ---------------- */

// // interface Interest {
// //   name: string;
// //   count: number;
// //   trending: boolean;
// //   color: string;
// // }

// // /* ---------------- UTILS ---------------- */

// // const COLORS = [
// //   "bg-purple-100 text-purple-700 border-purple-200",
// //   "bg-blue-100 text-blue-700 border-blue-200",
// //   "bg-green-100 text-green-700 border-green-200",
// //   "bg-pink-100 text-pink-700 border-pink-200",
// //   "bg-cyan-100 text-cyan-700 border-cyan-200",
// //   "bg-red-100 text-red-700 border-red-200",
// //   "bg-orange-100 text-orange-700 border-orange-200",
// //   "bg-indigo-100 text-indigo-700 border-indigo-200",
// // ];

// // /* ---------------- COMPONENT ---------------- */

// // export function YourInterests() {
// //   const [interests, setInterests] = useState<Interest[]>([]);

// //   /* ---------------- LOAD INTERESTS ---------------- */

// //   useEffect(() => {
// //     async function loadInterests() {
// //       const snap = await getDocs(usersRef);

// //       const interestMap: Record<string, number> = {};

// //       snap.docs.forEach((doc) => {
// //         const data = doc.data();
// //         (data.interests || []).forEach((interest: string) => {
// //           interestMap[interest] = (interestMap[interest] || 0) + 1;
// //         });
// //       });

// //       const result: Interest[] = Object.entries(interestMap)
// //         .map(([name, count], index) => ({
// //           name,
// //           count,
// //           trending: count >= 100, // 🔥 rule for trending
// //           color: COLORS[index % COLORS.length],
// //         }))
// //         .sort((a, b) => b.count - a.count)
// //         .slice(0, 8); // show top interests

// //       setInterests(result);
// //     }

// //     loadInterests();
// //   }, []);

// //   /* ---------------- RENDER ---------------- */

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex flex-wrap gap-2">
// //         {interests.map((interest, index) => (
// //           <motion.div
// //             key={interest.name}
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{
// //               delay: 0.05 * index,
// //               duration: 0.3,
// //               type: "spring",
// //               stiffness: 200,
// //             }}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             <Badge
// //               variant="outline"
// //               className={`${interest.color} px-3 py-1.5 cursor-pointer hover:shadow-sm transition-shadow`}
// //             >
// //               <span className="text-xs font-medium">{interest.name}</span>
// //               <span className="ml-1.5 text-xs opacity-70">
// //                 ({interest.count})
// //               </span>
// //               {interest.trending && (
// //                 <TrendingUp className="size-3 ml-1" />
// //               )}
// //             </Badge>
// //           </motion.div>
// //         ))}
// //       </div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.5 }}
// //         className="pt-2"
// //       >
// //         <Button
// //           variant="ghost"
// //           className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
// //         >
// //           <Sparkles className="size-4 mr-2" />
// //           Discover More Topics
// //         </Button>
// //       </motion.div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Sparkles, TrendingUp, Target, Rocket } from "lucide-react";

// import { onSnapshot } from "firebase/firestore";
// import { usersRef } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";

// interface Interest {
//   name: string;
//   count: number;
//   trending: boolean;
//   recommended: boolean;
//   color: string;
// }

// const COLORS = [
//   "bg-purple-100 text-purple-700 border-purple-200",
//   "bg-blue-100 text-blue-700 border-blue-200",
//   "bg-green-100 text-green-700 border-green-200",
//   "bg-pink-100 text-pink-700 border-pink-200",
//   "bg-cyan-100 text-cyan-700 border-cyan-200",
//   "bg-red-100 text-red-700 border-red-200",
//   "bg-orange-100 text-orange-700 border-orange-200",
//   "bg-indigo-100 text-indigo-700 border-indigo-200",
// ];

// export function YourInterests() {
//   const { userProfile } = useAuth(); // your logged-in user profile
//   const [interests, setInterests] = useState<Interest[]>([]);

//   useEffect(() => {
//     return onSnapshot(usersRef, (snap) => {
//       const interestMap: Record<string, number> = {};

//       snap.docs.forEach((doc) => {
//         const data = doc.data();
//         (data.interests || []).forEach((interest: string) => {
//           interestMap[interest] = (interestMap[interest] || 0) + 1;
//         });
//       });

//       const myInterests = userProfile?.interests || [];

//       const result: Interest[] = Object.entries(interestMap)
//         .map(([name, count], index) => ({
//           name,
//           count,
//           trending: count >= 10,          // hackathon demo rule
//           recommended: myInterests.includes(name),
//           color: COLORS[index % COLORS.length],
//         }))
//         .sort((a, b) => b.count - a.count)
//         .slice(0, 10);

//       setInterests(result);
//     });
//   }, [userProfile]);

//   return (
//     <div className="space-y-5">

//       {/* Trending */}
//       <div>
//         <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
//           <TrendingUp className="w-4 h-4 text-red-500" />
//           Trending Now
//         </h3>

//         <div className="flex flex-wrap gap-2">
//           {interests.filter(i => i.trending).map(renderBadge)}
//         </div>
//       </div>

//       {/* Recommended */}
//       <div>
//         <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
//           <Target className="w-4 h-4 text-green-600" />
//           For You
//         </h3>

//         <div className="flex flex-wrap gap-2">
//           {interests.filter(i => i.recommended).map(renderBadge)}
//         </div>
//       </div>

//       {/* Explore */}
//       <div>
//         <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
//           <Rocket className="w-4 h-4 text-blue-600" />
//           Explore
//         </h3>

//         <div className="flex flex-wrap gap-2">
//           {interests.map(renderBadge)}
//         </div>
//       </div>

//       {/* Discover */}
//       <Button
//         variant="ghost"
//         className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
//       >
//         <Sparkles className="size-4 mr-2" />
//         Discover More Topics
//       </Button>
//     </div>
//   );

//   function renderBadge(interest: Interest) {
//     return (
//       <motion.div
//         key={interest.name}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Badge
//           variant="outline"
//           className={`${interest.color} px-3 py-1.5 cursor-pointer`}
//         >
//           <span className="text-xs font-medium">{interest.name}</span>
//           <span className="ml-1 text-xs opacity-70">({interest.count})</span>

//           {interest.trending && (
//             <TrendingUp className="size-3 ml-1 text-red-500" />
//           )}
//         </Badge>
//       </motion.div>
//     );
//   }
// }
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, TrendingUp, Target, Rocket } from "lucide-react";

import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { usersRef, db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";

/* ---------------- TYPES ---------------- */

interface Interest {
  name: string;
  count: number;
  trending: boolean;
  recommended: boolean;
  color: string;
}

/* ---------------- COLORS ---------------- */

const COLORS = [
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-red-100 text-red-700 border-red-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
];

/* ---------------- COMPONENT ---------------- */

export function YourInterests() {
  const { user } = useAuth();   // ✅ correct usage
  const [interests, setInterests] = useState<Interest[]>([]);
  const [myInterests, setMyInterests] = useState<string[]>([]);

  /* ---------------- LOAD MY PROFILE ---------------- */

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setMyInterests(snap.data().interests || []);
      }
    }

    loadProfile();
  }, [user]);

  /* ---------------- LOAD ALL INTERESTS (REALTIME) ---------------- */

  useEffect(() => {
    const unsub = onSnapshot(usersRef, (snap) => {
      const interestMap: Record<string, number> = {};

      snap.docs.forEach((doc) => {
        const data = doc.data();
        (data.interests || []).forEach((interest: string) => {
          interestMap[interest] = (interestMap[interest] || 0) + 1;
        });
      });

      const result: Interest[] = Object.entries(interestMap)
        .map(([name, count], index) => ({
          name,
          count,
          trending: count >= 5, // hackathon demo threshold
          recommended: myInterests.includes(name),
          color: COLORS[index % COLORS.length],
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setInterests(result);
    });

    return () => unsub();
  }, [myInterests]);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-5">

      {/* 🔥 Trending */}
      <div>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-red-500" />
          Trending Now
        </h3>

        <div className="flex flex-wrap gap-2">
          {interests.filter(i => i.trending).map(renderBadge)}
        </div>
      </div>

      {/* 🎯 Recommended */}
      <div>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-green-600" />
          For You
        </h3>

        <div className="flex flex-wrap gap-2">
          {interests.filter(i => i.recommended).map(renderBadge)}
        </div>
      </div>

      {/* 🚀 Explore */}
      <div>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <Rocket className="w-4 h-4 text-blue-600" />
          Explore
        </h3>

        <div className="flex flex-wrap gap-2">
          {interests.map(renderBadge)}
        </div>
      </div>

      {/* Discover */}
      <Button
        variant="ghost"
        className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
      >
        <Sparkles className="size-4 mr-2" />
        Discover More Topics
      </Button>
    </div>
  );

  /* ---------------- BADGE UI ---------------- */

  function renderBadge(interest: Interest) {
    return (
      <motion.div
        key={interest.name}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge
          variant="outline"
          className={`${interest.color} px-3 py-1.5 cursor-pointer`}
        >
          <span className="text-xs font-medium">{interest.name}</span>
          <span className="ml-1 text-xs opacity-70">
            ({interest.count})
          </span>

          {interest.trending && (
            <TrendingUp className="size-3 ml-1 text-red-500" />
          )}
        </Badge>
      </motion.div>
    );
  }
}
