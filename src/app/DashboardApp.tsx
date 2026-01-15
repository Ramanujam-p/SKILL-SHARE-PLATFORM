// // // // import { Routes, Route } from "react-router-dom";
// // // // import { Toaster } from "./components/ui/sonner";

// // // // import { PageLayout } from "./components/PageLayout";
// // // // import { DashboardCard } from "./components/DashboardCard";
// // // // import { SuggestedPeers } from "./components/SuggestedPeers";
// // // // import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
// // // // import { YourInterests } from "./components/YourInterests";

// // // // import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
// // // // import { SkillMatchPage } from "./components/SkillMatchPage"; // ✅ FIX
// // // // import { ProfilePage } from "./components/ProfilePage";
// // // // import { SettingsPage } from "./components/SettingsPage";

// // // // import { Users, MessageSquare, Target } from "lucide-react";
// // // // import { motion } from "motion/react";

// // // // import { useAuth } from "../hooks/useAuth";
// // // // import { getDocs } from "firebase/firestore";
// // // // import { useAuth } from "../hooks/useAuth";
// // // // import { getDocs } from "firebase/firestore";
// // // // import { usersRef, skillRequestsRef, questionsRef } from "./lib/firestore";
// // // // import { useEffect, useState } from "react";
// // // // import { useEffect, useState } from "react";

// // // // /* ================= DASHBOARD HOME ================= */

// // // // function DashboardHome() {
// // // //   const { user } = useAuth();
// // // //   const userName = user?.displayName ?? "Guest";

// // // //   const hour = new Date().getHours();
// // // //   const greeting =
// // // //     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

// // // //   const [stats, setStats] = useState({
// // // //     peers: 0,
// // // //     answered: 0,
// // // //     sessions: 0,
// // // //     streak: 0,
// // // //   });

// // // //   useEffect(() => {
// // // //     async function loadStats() {
// // // //       const [usersSnap, answersSnap, skillsSnap] = await Promise.all([
// // // //         getDocs(usersRef),
// // // //         getDocs(answersRef),
// // // //         getDocs(skillRequestsRef),
// // // //       ]);

// // // //       setStats({
// // // //         peers: usersSnap.size,
// // // //         answered: answersSnap.size,
// // // //         sessions: skillsSnap.size,
// // // //         streak: 5,
// // // //       });
// // // //     }

// // // //     loadStats();
// // // //   }, []);

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <div className="max-w-7xl mx-auto p-8">

// // // //         {/* Welcome */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           className="mb-8"
// // // //         >
// // // //           <h1 className="text-3xl font-bold text-gray-900">
// // // //             {greeting}, {userName}
// // // //           </h1>
// // // //           <p className="text-gray-600">
// // // //             Welcome to your activity hub.
// // // //           </p>
// // // //         </motion.div>

// // // //         {/* Stats */}
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // //           {[
// // // //             { label: "Active Peers", value: stats.peers },
// // // //             { label: "Answers", value: stats.answered },
// // // //             { label: "Sessions", value: stats.sessions },
// // // //             { label: "Streak", value: `${stats.streak} days` },
// // // //           ].map((stat) => (
// // // //             <div
// // // //               key={stat.label}
// // // //               className="bg-white border rounded-xl p-4"
// // // //             >
// // // //               <p className="text-sm text-gray-500">{stat.label}</p>
// // // //               <p className="text-2xl font-bold">{stat.value}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Cards */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //           <DashboardCard title="Suggested Peers" icon={Users}>
// // // //             <SuggestedPeers />
// // // //           </DashboardCard>

// // // //           <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
// // // //             <ActiveHelpdesk />
// // // //           </DashboardCard>

// // // //           <DashboardCard title="Your Interests" icon={Target}>
// // // //             <YourInterests />
// // // //           </DashboardCard>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ================= DASHBOARD APP ================= */

// // // // export default function DashboardApp() {
// // // //   return (
// // // //     <>
// // // //       <PageLayout>
// // // //         <Routes>
// // // //           <Route index element={<DashboardHome />} />
// // // //           <Route path="skillmatch" element={<SkillMatchPage />} />
// // // //           <Route path="helpdesk/*" element={<HelpdeskRoutes />} /> {/* ✅ FIX */}
// // // //           <Route path="profile" element={<ProfilePage />} />
// // // //           <Route path="settings" element={<SettingsPage />} />
// // // //         </Routes>
// // // //       </PageLayout>

// // // //       <Toaster />
// // // //     </>
// // // //   );
// // // // }
// // // import { Routes, Route } from "react-router-dom";
// // // import { useEffect, useState } from "react";
// // // import { motion } from "motion/react";
// // // import { Toaster } from "./components/ui/sonner";

// // // import { ConnectionsPage } from "./components/ConnectionRequestPage";
// // // import ChatListPage from "./components/ChatListPage";
// // // import { ChatPage } from "./components/ChatPage";


// // // import { PageLayout } from "./components/PageLayout";
// // // import { DashboardCard } from "./components/DashboardCard";
// // // import { SuggestedPeers } from "./components/SuggestedPeers";
// // // import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
// // // import { YourInterests } from "./components/YourInterests";

// // // import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
// // // import { SkillMatchPage } from "./components/SkillMatchPage";
// // // import { ProfilePage } from "./components/ProfilePage";
// // // import { SettingsPage } from "./components/SettingsPage";

// // // import { Users, MessageSquare, Target } from "lucide-react";

// // // import { useAuth } from "../hooks/useAuth";
// // // import { getDocs, collection } from "firebase/firestore";
// // // import { usersRef, skillRequestsRef, questionsRef, db } from "./lib/firestore";
// // // import CreateGroupChatPage from "./components/CreateGroupChatPage";

// // // /* ================= DASHBOARD HOME ================= */

// // // function DashboardHome() {
// // //   const { user } = useAuth();
// // //   const userName = user?.displayName ?? "Guest";

// // //   const hour = new Date().getHours();
// // //   const greeting =
// // //     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

// // //   const [stats, setStats] = useState({
// // //     peers: 18,
// // //     answered: 0,
// // //     sessions: 0,
// // //     streak: 0,
// // //   });

// // // useEffect(() => {
// // //   if (!user) return;

// // //   async function loadStats() {
// // //     /* ---------- FETCH DATA ---------- */
// // //     const [usersSnap, requestsSnap, questionsSnap] = await Promise.all([
// // //       getDocs(usersRef),
// // //       getDocs(skillRequestsRef),
// // //       getDocs(questionsRef),
// // //     ]);

// // //     /* ---------- ANSWERS BY USER ---------- */
// // //     let answersByUser = 0;

// // //     for (const q of questionsSnap.docs) {
// // //       const answersSnap = await getDocs(
// // //         collection(db, "questions", q.id, "answers")
// // //       );

// // //       answersSnap.forEach((a) => {
// // //         if (a.data().userId === user.uid) {
// // //           answersByUser++;
// // //         }
// // //       });
// // //     }

// // //     /* ---------- QUESTIONS ASKED BY USER ---------- */
// // //     const questionsAsked = questionsSnap.docs.filter(
// // //       (q) => q.data().userId === user.uid
// // //     ).length;

// // //     /* ---------- CONNECTION COUNT ---------- */
// // //     const connections = requestsSnap.docs.filter(
// // //       (r) =>
// // //         r.data().fromUserId === user.uid &&
// // //         (r.data().status === "accepted" ||
// // //          r.data().status === "pending")
// // //     ).length;

// // //     /* ---------- SET STATS ---------- */
// // //     setStats({
// // //       peers: usersSnap.size,
// // //       answered: answersByUser,
// // //       sessions: questionsAsked,
// // //       streak: connections,
// // //     });
// // //   }

// // //   loadStats();
// // // }, [user]);


// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto p-8">
// // //         {/* Welcome */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="mb-8"
// // //         >
// // //           <h1 className="text-3xl font-bold text-gray-900">
// // //             {greeting}, {userName}
// // //           </h1>
// // //           <p className="text-gray-600">Welcome to your activity hub.</p>
// // //         </motion.div>

// // //         {/* Stats */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //           {[
// // //             { label: "Active Peers", value: stats.peers },
// // //             { label: "Answers Given", value: stats.answered },
// // //             { label: "Questions Asked", value: stats.sessions },
// // //             { label: "Connections", value: stats.streak },
// // //           ].map((stat) => (
// // //             <div
// // //               key={stat.label}
// // //               className="bg-white border rounded-xl p-4"
// // //             >
// // //               <p className="text-sm text-gray-500">{stat.label}</p>
// // //               <p className="text-2xl font-bold">{stat.value}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Cards */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //           <DashboardCard title="Suggested Peers" icon={Users}>
// // //             <SuggestedPeers />
// // //           </DashboardCard>

// // //           <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
// // //             <ActiveHelpdesk />
// // //           </DashboardCard>

// // //           <DashboardCard title="Your Interests" icon={Target}>
// // //             <YourInterests />
// // //           </DashboardCard>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= DASHBOARD APP ================= */

// // // export default function DashboardApp() {
// // //   return (
// // //     <>
// // //       <PageLayout>
// // //         <Routes>
// // //           <Route index element={<DashboardHome />} />

// // //           <Route path="helpdesk/*" element={<HelpdeskRoutes />} />
// // //           <Route path="skillmatch" element={<SkillMatchPage />} />
// // //           <Route path="connections" element={<ConnectionsPage />} />

// // //           {/* CHAT SYSTEM */}
// // //           <Route path="chats" element={<ChatListPage />} />
// // //           <Route path="chats/create-group" element={<CreateGroupChatPage />} />
// // //           <Route path="chats/:chatId" element={<ChatPage />} />

// // //           <Route path="profile" element={<ProfilePage />} />
// // //           <Route path="settings" element={<SettingsPage />} />
// // //         </Routes>
// // //       </PageLayout>

// // //       <Toaster />
// // //     </>
// // //   );
// // // }
// // // import { Routes, Route } from "react-router-dom";
// // // import { Toaster } from "./components/ui/sonner";

// // // import { PageLayout } from "./components/PageLayout";
// // // import { DashboardCard } from "./components/DashboardCard";
// // // import { SuggestedPeers } from "./components/SuggestedPeers";
// // // import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
// // // import { YourInterests } from "./components/YourInterests";

// // // import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
// // // import { SkillMatchPage } from "./components/SkillMatchPage"; // ✅ FIX
// // // import { ProfilePage } from "./components/ProfilePage";
// // // import { SettingsPage } from "./components/SettingsPage";

// // // import { Users, MessageSquare, Target } from "lucide-react";
// // // import { motion } from "motion/react";

// // // import { useAuth } from "../hooks/useAuth";
// // // import { getDocs } from "firebase/firestore";
// // // import { useAuth } from "../hooks/useAuth";
// // // import { getDocs } from "firebase/firestore";
// // // import { usersRef, skillRequestsRef, questionsRef } from "./lib/firestore";
// // // import { useEffect, useState } from "react";
// // // import { useEffect, useState } from "react";

// // // /* ================= DASHBOARD HOME ================= */

// // // function DashboardHome() {
// // //   const { user } = useAuth();
// // //   const userName = user?.displayName ?? "Guest";

// // //   const hour = new Date().getHours();
// // //   const greeting =
// // //     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

// // //   const [stats, setStats] = useState({
// // //     peers: 0,
// // //     answered: 0,
// // //     sessions: 0,
// // //     streak: 0,
// // //   });

// // //   useEffect(() => {
// // //     async function loadStats() {
// // //       const [usersSnap, answersSnap, skillsSnap] = await Promise.all([
// // //         getDocs(usersRef),
// // //         getDocs(answersRef),
// // //         getDocs(skillRequestsRef),
// // //       ]);

// // //       setStats({
// // //         peers: usersSnap.size,
// // //         answered: answersSnap.size,
// // //         sessions: skillsSnap.size,
// // //         streak: 5,
// // //       });
// // //     }

// // //     loadStats();
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto p-8">

// // //         {/* Welcome */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="mb-8"
// // //         >
// // //           <h1 className="text-3xl font-bold text-gray-900">
// // //             {greeting}, {userName}
// // //           </h1>
// // //           <p className="text-gray-600">
// // //             Welcome to your activity hub.
// // //           </p>
// // //         </motion.div>

// // //         {/* Stats */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // //           {[
// // //             { label: "Active Peers", value: stats.peers },
// // //             { label: "Answers", value: stats.answered },
// // //             { label: "Sessions", value: stats.sessions },
// // //             { label: "Streak", value: `${stats.streak} days` },
// // //           ].map((stat) => (
// // //             <div
// // //               key={stat.label}
// // //               className="bg-white border rounded-xl p-4"
// // //             >
// // //               <p className="text-sm text-gray-500">{stat.label}</p>
// // //               <p className="text-2xl font-bold">{stat.value}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Cards */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //           <DashboardCard title="Suggested Peers" icon={Users}>
// // //             <SuggestedPeers />
// // //           </DashboardCard>

// // //           <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
// // //             <ActiveHelpdesk />
// // //           </DashboardCard>

// // //           <DashboardCard title="Your Interests" icon={Target}>
// // //             <YourInterests />
// // //           </DashboardCard>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= DASHBOARD APP ================= */

// // // export default function DashboardApp() {
// // //   return (
// // //     <>
// // //       <PageLayout>
// // //         <Routes>
// // //           <Route index element={<DashboardHome />} />
// // //           <Route path="skillmatch" element={<SkillMatchPage />} />
// // //           <Route path="helpdesk/*" element={<HelpdeskRoutes />} /> {/* ✅ FIX */}
// // //           <Route path="profile" element={<ProfilePage />} />
// // //           <Route path="settings" element={<SettingsPage />} />
// // //         </Routes>
// // //       </PageLayout>

// // //       <Toaster />
// // //     </>
// // //   );
// // // }
// // import { Routes, Route } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { motion } from "motion/react";
// // import { Toaster } from "./components/ui/sonner";

// // import { ConnectionsPage } from "./components/ConnectionRequestPage";
// // import ChatListPage from "./components/ChatListPage";
// // import { ChatPage } from "./components/ChatPage";


// // import { PageLayout } from "./components/PageLayout";
// // import { DashboardCard } from "./components/DashboardCard";
// // import { SuggestedPeers } from "./components/SuggestedPeers";
// // import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
// // import { YourInterests } from "./components/YourInterests";

// // import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
// // import { SkillMatchPage } from "./components/SkillMatchPage";
// // import { ProfilePage } from "./components/ProfilePage";
// // import { SettingsPage } from "./components/SettingsPage";

// // import { Users, MessageSquare, Target } from "lucide-react";

// // import { useAuth } from "../hooks/useAuth";
// // import { getDocs, collection } from "firebase/firestore";
// // import { usersRef, skillRequestsRef, questionsRef, db } from "./lib/firestore";
// // import CreateGroupChatPage from "./components/CreateGroupChatPage";

// // /* ================= DASHBOARD HOME ================= */

// // function DashboardHome() {
// //   const { user } = useAuth();
// //   const userName = user?.displayName ?? "Guest";

// //   const hour = new Date().getHours();
// //   const greeting =
// //     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

// //   const [stats, setStats] = useState({
// //     peers: 18,
// //     answered: 0,
// //     sessions: 0,
// //     streak: 0,
// //   });

// // useEffect(() => {
// //   if (!user) return;

// //   async function loadStats() {
// //     /* ---------- FETCH DATA ---------- */
// //     const [usersSnap, requestsSnap, questionsSnap] = await Promise.all([
// //       getDocs(usersRef),
// //       getDocs(skillRequestsRef),
// //       getDocs(questionsRef),
// //     ]);

// //     /* ---------- ANSWERS BY USER ---------- */
// //     let answersByUser = 0;

// //     for (const q of questionsSnap.docs) {
// //       const answersSnap = await getDocs(
// //         collection(db, "questions", q.id, "answers")
// //       );

// //       answersSnap.forEach((a) => {
// //         if (a.data().userId === user.uid) {
// //           answersByUser++;
// //         }
// //       });
// //     }

// //     /* ---------- QUESTIONS ASKED BY USER ---------- */
// //     const questionsAsked = questionsSnap.docs.filter(
// //       (q) => q.data().userId === user.uid
// //     ).length;

// //     /* ---------- CONNECTION COUNT ---------- */
// //     const connections = requestsSnap.docs.filter(
// //       (r) =>
// //         r.data().fromUserId === user.uid &&
// //         (r.data().status === "accepted" ||
// //          r.data().status === "pending")
// //     ).length;

// //     /* ---------- SET STATS ---------- */
// //     setStats({
// //       peers: usersSnap.size,
// //       answered: answersByUser,
// //       sessions: questionsAsked,
// //       streak: connections,
// //     });
// //   }

// //   loadStats();
// // }, [user]);


// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto p-8">
// //         {/* Welcome */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="mb-8"
// //         >
// //           <h1 className="text-3xl font-bold text-gray-900">
// //             {greeting}, {userName}
// //           </h1>
// //           <p className="text-gray-600">Welcome to your activity hub.</p>
// //         </motion.div>

// //         {/* Stats */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //           {[
// //             { label: "Active Peers", value: stats.peers },
// //             { label: "Answers Given", value: stats.answered },
// //             { label: "Questions Asked", value: stats.sessions },
// //             { label: "Connections", value: stats.streak },
// //           ].map((stat) => (
// //             <div
// //               key={stat.label}
// //               className="bg-white border rounded-xl p-4"
// //             >
// //               <p className="text-sm text-gray-500">{stat.label}</p>
// //               <p className="text-2xl font-bold">{stat.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Cards */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           <DashboardCard title="Suggested Peers" icon={Users}>
// //             <SuggestedPeers />
// //           </DashboardCard>

// //           <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
// //             <ActiveHelpdesk />
// //           </DashboardCard>

// //           <DashboardCard title="Your Interests" icon={Target}>
// //             <YourInterests />
// //           </DashboardCard>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= DASHBOARD APP ================= */

// // export default function DashboardApp() {
// //   return (
// //     <>
// //       <PageLayout>
// //         <Routes>
// //           <Route index element={<DashboardHome />} />

// //           <Route path="helpdesk/*" element={<HelpdeskRoutes />} />
// //           <Route path="skillmatch" element={<SkillMatchPage />} />
// //           <Route path="connections" element={<ConnectionsPage />} />

// //           {/* CHAT SYSTEM */}
// //           <Route path="chats" element={<ChatListPage />} />
// //           <Route path="chats/create-group" element={<CreateGroupChatPage />} />
// //           <Route path="chats/:chatId" element={<ChatPage />} />

// //           <Route path="profile" element={<ProfilePage />} />
// //           <Route path="settings" element={<SettingsPage />} />
// //         </Routes>
// //       </PageLayout>

// //       <Toaster />
// //     </>
// //   );
// // }
// import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { Toaster } from "./components/ui/sonner";

// import { ConnectionsPage } from "./components/ConnectionRequestPage";
// import ChatListPage from "./components/ChatListPage";
// import { ChatPage } from "./components/ChatPage";

// import { PageLayout } from "./components/PageLayout";
// import { DashboardCard } from "./components/DashboardCard";
// import { SuggestedPeers } from "./components/SuggestedPeers";
// import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
// import { YourInterests } from "./components/YourInterests";

// import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
// import { SkillMatchPage } from "./components/SkillMatchPage";
// import { ProfilePage } from "./components/ProfilePage";
// import { SettingsPage } from "./components/SettingsPage";

// import { Users, MessageSquare, Target } from "lucide-react";

// import { useAuth } from "../hooks/useAuth";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../lib/firebase";   // ✅ CORRECT SOURCE
// import CreateGroupChatPage from "./components/CreateGroupChatPage";
// import GroupRenamePage from "./components/GroupRenamePage";

// /* ================= DASHBOARD HOME ================= */

// function DashboardHome() {
//   const { user } = useAuth();
//   const userName = user?.displayName ?? "Guest";

//   const hour = new Date().getHours();
//   const greeting =
//     hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

//   const [stats, setStats] = useState({
//     peers: 0,
//     answered: 0,
//     sessions: 0,
//     streak: 0,
//   });
// useEffect(() => {
//   if (!user) return;

//   async function loadStats() {
//   try {
//     const usersSnap = await getDocs(collection(db, "users"));
//     const requestsSnap = await getDocs(collection(db, "skillRequests"));
//     const questionsSnap = await getDocs(collection(db, "questions"));
//     const answersSnap = await getDocs(collection(db, "answers"));

//     const answersByUser = answersSnap.docs.filter(
//       (a) => a.data().userId === user.uid
//     ).length;

//     const questionsAsked = questionsSnap.docs.filter(
//       (q) => q.data().userId === user.uid
//     ).length;

//     const connections = requestsSnap.docs.filter((r) => {
//       const data = r.data();
//       return (
//         data.fromUserId === user.uid &&
//         (data.status === "accepted" || data.status === "pending")
//       );
//     }).length;

//     setStats({
//       peers: usersSnap.size,
//       answered: answersByUser,
//       sessions: questionsAsked,
//       streak: connections,
//     });

//   } catch (err) {
//     console.error("Dashboard stats error:", err);
//   }
// }


//   loadStats();
// }, [user]);


//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-8">

//         {/* Welcome */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-900">
//             {greeting}, {userName}
//           </h1>
//           <p className="text-gray-600">Welcome to your activity hub.</p>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Active Peers", value: stats.peers },
//             { label: "Answers Given", value: stats.answered },
//             { label: "Questions Asked", value: stats.sessions },
//             { label: "Connections", value: stats.streak },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               className="bg-white border rounded-xl p-4"
//             >
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <p className="text-2xl font-bold">{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <DashboardCard title="Suggested Peers" icon={Users}>
//             <SuggestedPeers />
//           </DashboardCard>

//           <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
//             <ActiveHelpdesk />
//           </DashboardCard>

//           <DashboardCard title="Your Interests" icon={Target}>
//             <YourInterests />
//           </DashboardCard>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= DASHBOARD APP ================= */

// export default function DashboardApp() {
//   return (
//     <>
//       <PageLayout>
//         <Routes>
//           <Route index element={<DashboardHome />} />

//           <Route path="helpdesk/*" element={<HelpdeskRoutes />} />
//           <Route path="skillmatch" element={<SkillMatchPage />} />
//           <Route path="connections" element={<ConnectionsPage />} />

//           {/* CHAT SYSTEM */}
//           <Route path="chats" element={<ChatListPage />} />
//           <Route path="chats/create-group" element={<CreateGroupChatPage />} />
//           <Route path="chats/:chatId" element={<ChatPage />} />
// <Route path="chats/:chatId/rename" element={<GroupRenamePage />} />

//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Routes>
//       </PageLayout>

//       <Toaster />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { Users, MessageSquare, Target } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

import { db } from "./lib/firestore";
import { useAuth } from "../hooks/useAuth";

import { PageLayout } from "./components/PageLayout";
import { DashboardCard } from "./components/DashboardCard";
import { SuggestedPeers } from "./components/SuggestedPeers";
import { ActiveHelpdesk } from "./components/ActiveHelpdesk";
import { YourInterests } from "./components/YourInterests";

import { HelpdeskRoutes } from "./components/HelpdeskRoutes";
import { SkillMatchPage } from "./components/SkillMatchPage";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { ConnectionsPage } from "./components/ConnectionRequestPage";

import ChatListPage from "./components/ChatListPage";
import { ChatPage } from "./components/ChatPage";
import CreateGroupChatPage from "./components/CreateGroupChatPage";

/* ================= DASHBOARD HOME ================= */

function DashboardHome() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    peers: 0,
    answered: 0,
    sessions: 0,
    connections: 0,
  });

  const userName = user?.displayName ?? "Guest";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    if (!user) return;

    /* ---------- ACTIVE PEERS ---------- */
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setStats((p) => ({ ...p, peers: snap.size }));
    });

    /* ---------- QUESTIONS ASKED ---------- */
    const unsubQuestions = onSnapshot(
      query(collection(db, "questions"), where("userId", "==", user.uid)),
      (snap) => {
        setStats((p) => ({ ...p, sessions: snap.size }));
      }
    );

    /* ---------- ANSWERS GIVEN ---------- */
    let answersCount = 0;
    const unsubAnswers = onSnapshot(collection(db, "questions"), (qsnap) => {
      answersCount = 0;

      qsnap.forEach((q) => {
        onSnapshot(
          collection(db, "questions", q.id, "answers"),
          (asnap) => {
            asnap.forEach((a) => {
              if (a.data().userId === user.uid) {
                answersCount++;
              }
            });

            setStats((p) => ({ ...p, answered: answersCount }));
          }
        );
      });
    });

    /* ---------- CONNECTIONS ---------- */
    const unsubConnections = onSnapshot(
      query(
        collection(db, "skillRequests"),
        where("fromUserId", "==", user.uid),
        where("status", "in", ["accepted", "pending"])
      ),
      (snap) => {
        setStats((p) => ({ ...p, connections: snap.size }));
      }
    );

    return () => {
      unsubUsers();
      unsubQuestions();
      unsubConnections();
      unsubAnswers();
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, {userName}
          </h1>
          <p className="text-gray-600">Welcome to your activity hub.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Peers", value: stats.peers },
            { label: "Answers Given", value: stats.answered },
            { label: "Questions Asked", value: stats.sessions },
            { label: "Connections", value: stats.connections },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border rounded-xl p-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardCard title="Suggested Peers" icon={Users}>
            <SuggestedPeers />
          </DashboardCard>

          <DashboardCard title="Active Helpdesk" icon={MessageSquare}>
            <ActiveHelpdesk />
          </DashboardCard>

          <DashboardCard title="Your Interests" icon={Target}>
            <YourInterests />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD APP ================= */

export default function DashboardApp() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="helpdesk/*" element={<HelpdeskRoutes />} />
          <Route path="skillmatch" element={<SkillMatchPage />} />
          <Route path="connections" element={<ConnectionsPage />} />

          <Route path="chats" element={<ChatListPage />} />
          <Route path="chats/create-group" element={<CreateGroupChatPage />} />
          <Route path="chats/:chatId" element={<ChatPage />} />

          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </PageLayout>

      <Toaster />
    </>
  );
}
