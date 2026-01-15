// // // import { JSX } from "react";

// // // export function SettingsPage(): JSX.Element {
// // //   return (
// // //     <div className="max-w-4xl mx-auto p-8">
// // //       <h1 className="text-2xl font-semibold text-gray-900 mb-6">
// // //         Settings
// // //       </h1>

// // //       <div className="space-y-6">
// // //         {/* Account */}
// // //         <section className="bg-white border rounded-xl p-6">
// // //           <h2 className="font-medium text-gray-900 mb-2">
// // //             Account
// // //           </h2>
// // //           <p className="text-sm text-gray-600">
// // //             Manage your personal information and preferences.
// // //           </p>
// // //         </section>

// // //         {/* Notifications */}
// // //         <section className="bg-white border rounded-xl p-6">
// // //           <h2 className="font-medium text-gray-900 mb-2">
// // //             Notifications
// // //           </h2>
// // //           <p className="text-sm text-gray-600">
// // //             Control how and when you receive updates.
// // //           </p>
// // //         </section>

// // //         {/* Security */}
// // //         <section className="bg-white border rounded-xl p-6">
// // //           <h2 className="font-medium text-gray-900 mb-2">
// // //             Security
// // //           </h2>
// // //           <p className="text-sm text-gray-600">
// // //             Authentication and session management.
// // //           </p>
// // //         </section>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import { doc, getDoc, updateDoc } from "firebase/firestore";
// // import { db } from "../lib/firestore";
// // import { useAuth } from "../../hooks/useAuth";
// // import { Switch } from "./ui/switch";
// // import { Button } from "./ui/button";
// // import { Input } from "./ui/input";
// // import { Badge } from "./ui/badge";
// // import { Save, User, Bell, Shield, Sparkles } from "lucide-react";

// // export function SettingsPage() {
// //   const { user } = useAuth();

// //   const [profile, setProfile] = useState<any>(null);
// //   const [displayName, setDisplayName] = useState("");
// //   const [interests, setInterests] = useState<string[]>([]);
// //   const [notifications, setNotifications] = useState(true);
// //   const [aiMatch, setAiMatch] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   /* ---------------- LOAD PROFILE ---------------- */

// //   useEffect(() => {
// //     if (!user) return;

// //     async function loadProfile() {
// //       const snap = await getDoc(doc(db, "users", user.uid));
// //       if (snap.exists()) {
// //         const data = snap.data();
// //         setProfile(data);
// //         setDisplayName(data.displayName || "");
// //         setInterests(data.interests || []);
// //         setNotifications(data.notifications ?? true);
// //         setAiMatch(data.aiMatch ?? true);
// //       }
// //     }

// //     loadProfile();
// //   }, [user]);

// //   /* ---------------- SAVE SETTINGS ---------------- */

// //   const saveSettings = async () => {
// //     if (!user) return;

// //     setSaving(true);

// //     await updateDoc(doc(db, "users", user.uid), {
// //       displayName,
// //       interests,
// //       notifications,
// //       aiMatch,
// //     });

// //     setSaving(false);
// //     alert("Settings saved successfully!");
// //   };

// //   if (!profile) return null;

// //   return (
// //     <div className="max-w-4xl mx-auto p-8 space-y-8">

// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-semibold">Settings</h1>
// //         <p className="text-gray-600">Manage your account, preferences and security.</p>
// //       </div>

// //       {/* ================= ACCOUNT ================= */}
// //       <section className="bg-white border rounded-xl p-6 space-y-4">
// //         <div className="flex items-center gap-2 font-medium">
// //           <User className="w-5 h-5" /> Account
// //         </div>

// //         <div className="space-y-2">
// //           <label className="text-sm font-medium">Display Name</label>
// //           <Input
// //             value={displayName}
// //             onChange={(e) => setDisplayName(e.target.value)}
// //             placeholder="Your name"
// //           />
// //         </div>

// //         <div>
// //           <p className="text-sm font-medium mb-2">Your Interests</p>
// //           <div className="flex flex-wrap gap-2">
// //             {interests.map((i) => (
// //               <Badge key={i} variant="outline">{i}</Badge>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= NOTIFICATIONS ================= */}
// //       <section className="bg-white border rounded-xl p-6 space-y-4">
// //         <div className="flex items-center gap-2 font-medium">
// //           <Bell className="w-5 h-5" /> Notifications
// //         </div>

// //         <div className="flex items-center justify-between">
// //           <span className="text-sm">Enable Notifications</span>
// //           <Switch checked={notifications} onCheckedChange={setNotifications} />
// //         </div>
// //       </section>

// //       {/* ================= AI MATCHING ================= */}
// //       <section className="bg-white border rounded-xl p-6 space-y-4">
// //         <div className="flex items-center gap-2 font-medium">
// //           <Sparkles className="w-5 h-5 text-purple-600" /> AI Personalization
// //         </div>

// //         <div className="flex items-center justify-between">
// //           <span className="text-sm">Enable Smart Skill Matching</span>
// //           <Switch checked={aiMatch} onCheckedChange={setAiMatch} />
// //         </div>
// //       </section>

// //       {/* ================= SECURITY ================= */}
// //       <section className="bg-white border rounded-xl p-6 space-y-4">
// //         <div className="flex items-center gap-2 font-medium">
// //           <Shield className="w-5 h-5" /> Security
// //         </div>

// //         <p className="text-sm text-gray-600">
// //           Your account is secured using Firebase Authentication.
// //         </p>

// //         <Button variant="outline">
// //           Change Password
// //         </Button>
// //       </section>

// //       {/* ================= SAVE ================= */}
// //       <div className="flex justify-end">
// //         <Button onClick={saveSettings} disabled={saving}>
// //           <Save className="w-4 h-4 mr-2" />
// //           {saving ? "Saving..." : "Save Settings"}
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Badge } from "../components/ui/badge";
// import { Switch } from "../components/ui/switch";
// import { toast } from "sonner";

// export function SettingsPage() {
//   const { user, logout } = useAuth();

//   const [loading, setLoading] = useState(true);
//   const [displayName, setDisplayName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [interests, setInterests] = useState<string[]>([]);
//   const [newInterest, setNewInterest] = useState("");
//   const [notifications, setNotifications] = useState(true);

//   /* ================= LOAD PROFILE ================= */

//   useEffect(() => {
//     if (!user) return;

//     async function loadProfile() {
//       const snap = await getDoc(doc(db, "users", user.uid));
//       if (!snap.exists()) return;

//       const data = snap.data();
//       setDisplayName(data.displayName || "");
//       setPhotoURL(data.photoURL || "");
//       setInterests(data.interests || []);
//       setNotifications(data.notifications ?? true);
//       setLoading(false);
//     }

//     loadProfile();
//   }, [user]);

//   /* ================= SAVE PROFILE ================= */

//   const saveProfile = async () => {
//     if (!user) return;

//     await updateDoc(doc(db, "users", user.uid), {
//       displayName,
//       photoURL,
//       interests,
//       notifications,
//     });

//     toast.success("Settings updated successfully");
//   };

//   const addInterest = () => {
//     if (!newInterest.trim()) return;
//     if (interests.includes(newInterest)) return;

//     setInterests([...interests, newInterest]);
//     setNewInterest("");
//   };

//   const removeInterest = (name: string) => {
//     setInterests(interests.filter((i) => i !== name));
//   };

//   if (!user || loading) return null;

//   return (
//     <div className="max-w-4xl mx-auto p-8 space-y-8">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-2xl font-semibold">Settings</h1>
//         <p className="text-gray-500">Manage your account preferences</p>
//       </div>

//       {/* ================= PROFILE ================= */}
//       <section className="bg-white border rounded-xl p-6 space-y-4">
//         <h2 className="font-medium text-lg">Profile</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <Input
//             placeholder="Display Name"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//           />

//           <Input
//             placeholder="Photo URL"
//             value={photoURL}
//             onChange={(e) => setPhotoURL(e.target.value)}
//           />
//         </div>

//         {photoURL && (
//           <img
//             src={photoURL}
//             className="w-20 h-20 rounded-full object-cover border"
//           />
//         )}
//       </section>

//       {/* ================= INTERESTS ================= */}
//       <section className="bg-white border rounded-xl p-6 space-y-4">
//         <h2 className="font-medium text-lg">Skills & Interests</h2>

//         <div className="flex gap-2">
//           <Input
//             placeholder="Add new skill"
//             value={newInterest}
//             onChange={(e) => setNewInterest(e.target.value)}
//           />
//           <Button onClick={addInterest}>Add</Button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {interests.map((interest) => (
//             <Badge
//               key={interest}
//               variant="outline"
//               className="cursor-pointer"
//               onClick={() => removeInterest(interest)}
//             >
//               {interest} ✕
//             </Badge>
//           ))}
//         </div>
//       </section>

//       {/* ================= NOTIFICATIONS ================= */}
//       <section className="bg-white border rounded-xl p-6 flex justify-between items-center">
//         <div>
//           <h2 className="font-medium text-lg">Notifications</h2>
//           <p className="text-sm text-gray-500">
//             Receive updates and messages
//           </p>
//         </div>

//         <Switch
//           checked={notifications}
//           onCheckedChange={setNotifications}
//         />
//       </section>

//       {/* ================= ACCOUNT ================= */}
//       <section className="bg-white border rounded-xl p-6 space-y-4">
//         <h2 className="font-medium text-lg">Account</h2>

//         <div className="flex gap-4">
//           <Button onClick={saveProfile}>
//             Save Changes
//           </Button>

//           <Button
//             variant="destructive"
//             onClick={logout}
//           >
//             Logout
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";

import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

import {
  Bell,
  Shield,
  Sparkles,
  LogOut,
  Lock,
} from "lucide-react";

export function SettingsPage() {
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [aiMatch, setAiMatch] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD SETTINGS ================= */

  useEffect(() => {
    if (!user) return;

    async function loadSettings() {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;

      const data = snap.data();
      setNotifications(data.notifications ?? true);
      setAiMatch(data.aiMatch ?? true);
      setPrivateMode(data.privateMode ?? false);
      setLoading(false);
    }

    loadSettings();
  }, [user]);

  /* ================= SAVE SETTINGS ================= */

  const saveSettings = async () => {
    if (!user) return;

    setSaving(true);

    await updateDoc(doc(db, "users", user.uid), {
      notifications,
      aiMatch,
      privateMode,
    });

    setSaving(false);
    toast.success("Settings updated successfully");
  };

  if (!user || loading) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-500">
          Manage your preferences and security controls
        </p>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <section className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="font-medium">Notifications</h2>
            <p className="text-sm text-gray-500">
              Receive messages and platform updates
            </p>
          </div>
        </div>

        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </section>

      {/* ================= AI MATCHING ================= */}
      <section className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <h2 className="font-medium">AI Skill Matching</h2>
            <p className="text-sm text-gray-500">
              Enable smart peer recommendations
            </p>
          </div>
        </div>

        <Switch
          checked={aiMatch}
          onCheckedChange={setAiMatch}
        />
      </section>

      {/* ================= PRIVACY ================= */}
      <section className="bg-white border rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-gray-700" />
          <div>
            <h2 className="font-medium">Private Mode</h2>
            <p className="text-sm text-gray-500">
              Hide your profile from public search
            </p>
          </div>
        </div>

        <Switch
          checked={privateMode}
          onCheckedChange={setPrivateMode}
        />
      </section>

      {/* ================= SECURITY ================= */}
      <section className="bg-white border rounded-xl p-6 space-y-2">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="font-medium">Security</h2>
        </div>

        <p className="text-sm text-gray-500">
          Your account is protected using Firebase Authentication and secure sessions.
        </p>

        <Button variant="outline">
          Change Password
        </Button>
      </section>

      {/* ================= ACTIONS ================= */}
      <section className="bg-white border rounded-xl p-6 flex justify-between items-center">
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>

        <Button variant="destructive" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </section>

    </div>
  );
}
