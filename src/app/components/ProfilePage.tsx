// // // import { useState } from "react";
// // // import { motion } from "motion/react";
// // // import { Card } from "./ui/card";
// // // import { Badge } from "./ui/badge";
// // // import { Avatar, AvatarFallback } from "./ui/avatar";
// // // import { Skeleton } from "./ui/skeleton";
// // // import type { JSX, ReactNode } from "react";

// // // import {
// // //   MessageCircle,
// // //   HelpCircle,
// // //   Heart,
// // //   Calendar,
// // //   Smile,
// // //   Settings,
// // // } from "lucide-react";
// // // import { useAuth } from "../../hooks/useAuth";

// // // /* ---------------- MAIN COMPONENT ---------------- */

// // // export function ProfilePage(): JSX.Element {
// // //   const { user, loading } = useAuth();

// // //   /* Firebase-driven identity */
// // //   const name = user?.displayName ?? "Guest User";
// // //   const bio = user?.email ?? "No bio available";

// // //   const [avatarImage, setAvatarImage] = useState<string | null>(null);
// // //   const [coverImage, setCoverImage] = useState<string | null>(null);

// // //   const stats = {
// // //     questionsAsked: 12,
// // //     answersGiven: 8,
// // //     helpfulVotes: 24,
// // //     daysActive: 45,
// // //   };

// // //   const handleImageUpload = (
// // //     e: React.ChangeEvent<HTMLInputElement>,
// // //     type: "avatar" | "cover"
// // //   ): void => {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;

// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       if (type === "avatar") setAvatarImage(reader.result as string);
// // //       if (type === "cover") setCoverImage(reader.result as string);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen p-12">
// // //         <Skeleton className="h-64 w-full rounded-3xl" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6 md:p-12">
// // //       <div className="max-w-5xl mx-auto space-y-6">

// // //         {/* HEADER */}
// // //         <Card className="overflow-hidden shadow-xl">
// // //           <div
// // //             className="h-32 relative"
// // //             style={{
// // //               background: coverImage
// // //                 ? `url(${coverImage}) center / cover no-repeat`
// // //                 : "linear-gradient(to right, #a855f7, #ec4899, #fb923c)",
// // //             }}
// // //           >
// // //             <label className="absolute top-3 right-3 bg-white px-3 py-1 rounded-lg text-xs cursor-pointer">
// // //               Change cover
// // //               <input
// // //                 type="file"
// // //                 hidden
// // //                 accept="image/*"
// // //                 onChange={(e) => handleImageUpload(e, "cover")}
// // //               />
// // //             </label>
// // //           </div>

// // //           <div className="p-8 -mt-16">
// // //             <div className="flex gap-6 items-end">
// // //               <div className="relative">
// // //                 <Avatar className="size-32 border-4 border-white shadow-xl">
// // //                   {avatarImage ? (
// // //                     <img src={avatarImage} className="rounded-full" />
// // //                   ) : (
// // //                     <AvatarFallback className="text-3xl font-bold">
// // //                       {name
// // //                         .split(" ")
// // //                         .map((w) => w[0])
// // //                         .join("")
// // //                         .toUpperCase()}
// // //                     </AvatarFallback>
// // //                   )}
// // //                 </Avatar>

// // //                 <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
// // //                   <input
// // //                     type="file"
// // //                     hidden
// // //                     accept="image/*"
// // //                     onChange={(e) => handleImageUpload(e, "avatar")}
// // //                   />
// // //                   <Settings className="w-4 h-4" />
// // //                 </label>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <h1 className="text-2xl font-bold">{name}</h1>
// // //                 <p className="text-gray-600">{bio}</p>
// // //                 <Badge>🎯 Authenticated User</Badge>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </Card>

// // //         {/* STATS */}
// // //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //           <StatCard icon={<HelpCircle />} label="Questions" value={stats.questionsAsked} />
// // //           <StatCard icon={<MessageCircle />} label="Answers" value={stats.answersGiven} />
// // //           <StatCard icon={<Heart />} label="Helpful" value={stats.helpfulVotes} />
// // //           <StatCard icon={<Calendar />} label="Days Active" value={stats.daysActive} />
// // //         </div>

// // //         {/* FOOTER */}
// // //         <div className="text-center text-gray-600 pt-6 flex items-center justify-center gap-2">
// // //           <Smile className="text-purple-500" />
// // //           Keep learning and growing. Your journey matters 💜
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ---------------- SUB COMPONENT ---------------- */

// // // function StatCard({
// // //   icon,
// // //   label,
// // //   value,
// // // }: {
// // //   icon: ReactNode;
// // //   label: string;
// // //   value: number;
// // // }): JSX.Element {
// // //   return (
// // //     <motion.div whileHover={{ scale: 1.05 }}>
// // //       <Card className="p-6 text-center shadow-lg">
// // //         <div className="mb-2">{icon}</div>
// // //         <div className="text-2xl font-bold">{value}</div>
// // //         <div className="text-sm text-gray-600">{label}</div>
// // //       </Card>
// // //     </motion.div>
// // //   );
// // // }
// // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // import { Badge } from "./ui/badge";
// // import { Button } from "./ui/button";
// // import { useAuth } from "../../hooks/useAuth";
// // import { motion } from "motion/react";

// // export function ProfilePage() {
// //   const { user } = useAuth();

// //   if (!user) return null;

// //   const initials =
// //     user.displayName
// //       ?.split(" ")
// //       .map((n) => n[0])
// //       .join("")
// //       .slice(0, 2)
// //       .toUpperCase() ?? "U";

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-4xl mx-auto p-8">

// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-white rounded-2xl border p-8"
// //         >
// //           {/* HEADER */}
// //           <div className="flex items-center gap-6 mb-6">
// //             <Avatar className="size-24">
// //               <AvatarImage src={user.photoURL ?? ""} />
// //               <AvatarFallback className="text-2xl">
// //                 {initials}
// //               </AvatarFallback>
// //             </Avatar>

// //             <div>
// //               <h2 className="text-2xl font-bold">
// //                 {user.displayName ?? "Student"}
// //               </h2>
// //               <p className="text-gray-600">{user.email}</p>
// //             </div>
// //           </div>

// //           {/* BIO */}
// //           <div className="mb-6">
// //             <h3 className="font-semibold mb-2">About</h3>
// //             <p className="text-gray-700">
// //               Passionate learner interested in collaboration, projects,
// //               and peer learning.
// //             </p>
// //           </div>

// //           {/* INTERESTS */}
// //           <div className="mb-6">
// //             <h3 className="font-semibold mb-2">Interests</h3>
// //             <div className="flex flex-wrap gap-2">
// //               {["Web Dev", "DSA", "React", "Firebase"].map((i) => (
// //                 <Badge key={i} variant="secondary">
// //                   {i}
// //                 </Badge>
// //               ))}
// //             </div>
// //           </div>

// //           {/* ACTIONS */}
// //           <div className="flex gap-3">
// //             <Button>Edit Profile</Button>
// //             <Button variant="outline">Change Password</Button>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }
// // import { useState } from "react";
// // import { motion } from "motion/react";
// // import { Card } from "./ui/card";
// // import { Badge } from "./ui/badge";
// // import { Avatar, AvatarFallback } from "./ui/avatar";
// // import { Skeleton } from "./ui/skeleton";
// // import type { JSX, ReactNode } from "react";

// // import {
// //   MessageCircle,
// //   HelpCircle,
// //   Heart,
// //   Calendar,
// //   Smile,
// //   Settings,
// // } from "lucide-react";
// // import { useAuth } from "../../hooks/useAuth";

// // /* ================= PROFILE PAGE ================= */

// // export function ProfilePage(): JSX.Element {
// //   const { user, loading } = useAuth();

// //   const name = user?.displayName ?? "Guest User";
// //   const bio = user?.email ?? "No bio available";

// //   const [avatarImage, setAvatarImage] = useState<string | null>(null);
// //   const [coverImage, setCoverImage] = useState<string | null>(null);

// //   const stats = {
// //     questionsAsked: 12,
// //     answersGiven: 8,
// //     helpfulVotes: 24,
// //     daysActive: 45,
// //   };

// //   function handleImageUpload(
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     type: "avatar" | "cover"
// //   ) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       if (type === "avatar") setAvatarImage(reader.result as string);
// //       if (type === "cover") setCoverImage(reader.result as string);
// //     };
// //     reader.readAsDataURL(file);
// //   }

// //   /* ---------------- LOADING ---------------- */

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen p-12">
// //         <Skeleton className="h-64 w-full rounded-3xl" />
// //       </div>
// //     );
// //   }

// //   /* ---------------- UI ---------------- */

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6 md:p-12">
// //       <div className="max-w-5xl mx-auto space-y-6">

// //         {/* HEADER */}
// //         <Card className="overflow-hidden shadow-xl">
// //           <div
// //             className="h-36 relative"
// //             style={{
// //               background: coverImage
// //                 ? `url(${coverImage}) center / cover no-repeat`
// //                 : "linear-gradient(to right, #8b5cf6, #ec4899, #fb923c)",
// //             }}
// //           >
// //             <label className="absolute top-3 right-3 bg-white px-3 py-1 rounded-lg text-xs cursor-pointer shadow">
// //               Change cover
// //               <input
// //                 type="file"
// //                 hidden
// //                 accept="image/*"
// //                 onChange={(e) => handleImageUpload(e, "cover")}
// //               />
// //             </label>
// //           </div>

// //           <div className="p-8 -mt-16">
// //             <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">

// //               {/* AVATAR */}
// //               <div className="relative">
// //                 <Avatar className="size-32 border-4 border-white shadow-xl">
// //                   {avatarImage ? (
// //                     <img src={avatarImage} className="rounded-full" />
// //                   ) : (
// //                     <AvatarFallback className="text-3xl font-bold">
// //                       {name
// //                         .split(" ")
// //                         .map((w) => w[0])
// //                         .join("")
// //                         .toUpperCase()}
// //                     </AvatarFallback>
// //                   )}
// //                 </Avatar>

// //                 <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow">
// //                   <input
// //                     type="file"
// //                     hidden
// //                     accept="image/*"
// //                     onChange={(e) => handleImageUpload(e, "avatar")}
// //                   />
// //                   <Settings className="w-4 h-4 text-gray-700" />
// //                 </label>
// //               </div>

// //               {/* INFO */}
// //               <div className="space-y-2 text-center md:text-left">
// //                 <h1 className="text-2xl font-bold text-gray-900">
// //                   {name}
// //                 </h1>
// //                 <p className="text-gray-600">{bio}</p>
// //                 <Badge className="bg-purple-100 text-purple-700">
// //                   🎯 Authenticated User
// //                 </Badge>
// //               </div>
// //             </div>
// //           </div>
// //         </Card>

// //         {/* STATS */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           <StatCard icon={<HelpCircle />} label="Questions" value={stats.questionsAsked} />
// //           <StatCard icon={<MessageCircle />} label="Answers" value={stats.answersGiven} />
// //           <StatCard icon={<Heart />} label="Helpful Votes" value={stats.helpfulVotes} />
// //           <StatCard icon={<Calendar />} label="Days Active" value={stats.daysActive} />
// //         </div>

// //         {/* FOOTER */}
// //         <div className="flex items-center justify-center gap-2 text-gray-600 pt-6">
// //           <Smile className="text-purple-500" />
// //           Keep learning and growing. Your journey matters 💜
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= STAT CARD ================= */

// // function StatCard({
// //   icon,
// //   label,
// //   value,
// // }: {
// //   icon: ReactNode;
// //   label: string;
// //   value: number;
// // }): JSX.Element {
// //   return (
// //     <motion.div whileHover={{ scale: 1.05 }}>
// //       <Card className="p-6 text-center shadow-lg">
// //         <div className="flex justify-center mb-2 text-purple-600">
// //           {icon}
// //         </div>
// //         <div className="text-2xl font-bold text-gray-900">
// //           {value}
// //         </div>
// //         <div className="text-sm text-gray-600">
// //           {label}
// //         </div>
// //       </Card>
// //     </motion.div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { doc, updateDoc } from "firebase/firestore";
// import { toast } from "sonner";

// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// const ALL_INTERESTS = [
//   "Web",
//   "AI",
//   "DSA",
//   "Mobile",
//   "Cloud",
//   "UI/UX",
// ];

// function normalizeSkillLevel(
//   level?: string
// ): "beginner" | "intermediate" | "advanced" {
//   switch (level?.toLowerCase()) {
//     case "beginner":
//       return "beginner";
//     case "advanced":
//       return "advanced";
//     default:
//       return "intermediate";
//   }
// }


// export function ProfilePage() {
//   const { user } = useAuth();

//   const [displayName, setDisplayName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [interests, setInterests] = useState<string[]>([]);
//   const [skillLevel, setSkillLevel] =
//     useState<"beginner" | "intermediate" | "advanced">("intermediate");

//   const [saving, setSaving] = useState(false);

//   /* ---------------- LOAD USER DATA ---------------- */

//   useEffect(() => {
//     if (!user) return;

//     setDisplayName(user.displayName ?? "");
//     setPhotoURL(user.photoURL ?? "");
//     setInterests(user.interests ?? []);
//     setSkillLevel(normalizeSkillLevel(user.skillLevel) ?? "beginner");
//   }, [user]);

//   /* ---------------- SAVE PROFILE ---------------- */

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       setSaving(true);

//       await updateDoc(doc(db, "users", user.uid), {
//         displayName,
//         photoURL,
//         interests,
//         skillLevel,
//         updatedAt: Date.now(),
//       });

//       toast.success("Profile updated successfully");
//     } catch (err) {
//       toast.error("Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------------- INTEREST TOGGLE ---------------- */

//   const toggleInterest = (interest: string) => {
//     setInterests((prev) =>
//       prev.includes(interest)
//         ? prev.filter((i) => i !== interest)
//         : [...prev, interest]
//     );
//   };

//   if (!user) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold mb-6"
//       >
//         Edit Profile
//       </motion.h1>

//       {/* Avatar */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-1">
//           Avatar URL
//         </label>
//         <Input
//           value={photoURL}
//           onChange={(e) => setPhotoURL(e.target.value)}
//           placeholder="https://..."
//         />
//       </div>

//       {/* Name */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-1">
//           Display Name
//         </label>
//         <Input
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />
//       </div>

//       {/* Skill Level */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2">
//           Skill Level
//         </label>
//         <select
//           value={skillLevel}
//           onChange={(e) =>
//             setSkillLevel(e.target.value as any)
//           }
//           className="w-full border rounded-md p-2"
//         >
//           <option value="beginner">Beginner</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </select>
//       </div>

//       {/* Interests */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2">
//           Interests
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {ALL_INTERESTS.map((interest) => (
//             <button
//               key={interest}
//               onClick={() => toggleInterest(interest)}
//               className={`px-3 py-1 rounded-full text-sm border
//                 ${
//                   interests.includes(interest)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700"
//                 }
//               `}
//             >
//               {interest}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Save */}
//       <Button
//         onClick={handleSave}
//         disabled={saving}
//         className="mt-4"
//       >
//         {saving ? "Saving..." : "Save Changes"}
//       </Button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const ALL_INTERESTS = ["Web", "AI", "DSA", "Mobile", "Cloud", "UI/UX"];

export function ProfilePage() {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState("intermediate");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* ================= LOAD USER ================= */

  useEffect(() => {
    if (!user) return;

    setDisplayName(user.displayName ?? "");
    setPhotoURL(user.photoURL ?? ""); // Google photo by default
    setInterests(user.interests ?? []);
    setSkillLevel(user.skillLevel ?? "intermediate");
  }, [user]);

  /* ================= CLOUDINARY UPLOAD ================= */

  const uploadToCloudinary = async (file: File) => {
    if (!user) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      const imageUrl = data.secure_url;

      // Save in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        photoURL: imageUrl,
      });

      setPhotoURL(imageUrl);

      toast.success("Profile photo updated");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DRAG & DROP ================= */

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!e.dataTransfer.files?.[0]) return;
    uploadToCloudinary(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    uploadToCloudinary(e.target.files[0]);
  };

  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        interests,
        skillLevel,
        photoURL,
        updatedAt: Date.now(),
      });

      toast.success("Profile updated");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  if (!user) return null;

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#F5F7FB] via-[#EEF2FF] to-[#E0E7FF] text-slate-900">

    {/* Header */}
    <div className="bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-10 py-7">
        <h1 className="text-3xl font-semibold tracking-tight">
          Profile Management
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your professional identity
        </p>
      </div>
    </div>

    {/* Main Container */}
    <div className="max-w-6xl mx-auto px-10 py-14">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white border border-slate-200 rounded-3xl shadow-xl p-12"
      >

        {/* Accent Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full" />

        {/* Profile Header */}
        <div className="flex items-center gap-10 pb-12 border-b border-slate-200">

          {/* Avatar */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 blur opacity-30" />

            <Avatar className="size-32 border-4 border-white shadow-lg relative">
              <AvatarImage src={photoURL} />
              <AvatarFallback className="text-3xl font-bold bg-slate-100 text-blue-600">
                {displayName?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-semibold">
              {displayName || "Developer"}
            </h2>

            <p className="text-slate-600 mt-2">
              {user.email}
            </p>

            <div className="mt-4 inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              Verified Account
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`mt-14 rounded-2xl border-2 border-dashed p-10 transition-all duration-300
            ${dragActive
              ? "border-blue-500 bg-blue-50 scale-[1.01]"
              : "border-slate-300 bg-slate-50"
            }`}
        >
          <div className="flex items-center gap-8">

            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                Upload Profile Photo
              </h3>
              <p className="text-slate-600 mt-2">
                Drag & drop or select your professional photo
              </p>
            </div>

            <label>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 shadow-md"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Select Image"}
              </Button>
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">

          <div>
            <label className="text-sm font-medium text-slate-700">
              Display Name
            </label>
            <Input
              className="mt-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="mt-3 w-full border border-slate-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-14">
          <label className="text-sm font-medium text-slate-700">
            Interests
          </label>

          <div className="flex flex-wrap gap-4 mt-4">
            {ALL_INTERESTS.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    interests.includes(interest)
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white border border-slate-300 hover:border-blue-500 text-slate-700"
                  }
                `}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="mt-16 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-lg"
          >
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>

      </motion.div>
    </div>
  </div>
);

}
