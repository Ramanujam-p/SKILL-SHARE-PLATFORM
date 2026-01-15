// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   doc,
//   getDoc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// export default function CreateGroupChatPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [users, setUsers] = useState<any[]>([]);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [groupName, setGroupName] = useState("");

//   /* Load users */
//   useEffect(() => {
//     async function loadUsers() {
//       const q = query(collection(db, "users"));
//       const snap = await getDocs(q);

//       setUsers(
//         snap.docs.map((d) => ({
//           uid: d.id,
//           ...d.data(),
//         }))
//       );
//     }

//     loadUsers();
//   }, []);

//   const toggleUser = (uid: string) => {
//     setSelected((prev) =>
//       prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
//     );
//   };

//   const createGroup = async () => {
//     if (!groupName.trim()) return alert("Enter group name");
//     if (selected.length < 2) return alert("Select at least 2 members");

//     const chatRef = await addDoc(collection(db, "chats"), {
//       name: groupName,
//       isGroup: true,
//       participants: [user!.uid, ...selected],
//       lastMessage: "",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     navigate(`/dashboard/chats/${chatRef.id}`);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-10">
//       <h2 className="text-3xl font-bold mb-6">Create Group Chat</h2>

//       <input
//         className="w-full border p-3 rounded-lg mb-6"
//         placeholder="Group Name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//       />

//       <h3 className="font-semibold mb-3">Select Members</h3>

//       <div className="space-y-2 mb-6">
//         {users
//           .filter((u) => u.uid !== user?.uid)
//           .map((u) => (
//             <div
//               key={u.uid}
//               onClick={() => toggleUser(u.uid)}
//               className={`p-3 border rounded-lg cursor-pointer flex justify-between ${
//                 selected.includes(u.uid)
//                   ? "bg-blue-100 border-blue-400"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               <span>{u.displayName || u.email}</span>
//               {selected.includes(u.uid) && "✔"}
//             </div>
//           ))}
//       </div>

//       <button
//         onClick={createGroup}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//       >
//         Create Group
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Users } from "lucide-react";

export default function CreateGroupChatPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* Load users */
  useEffect(() => {
    async function loadUsers() {
      const q = query(collection(db, "users"));
      const snap = await getDocs(q);

      setUsers(
        snap.docs.map((d) => ({
          uid: d.id,
          ...d.data(),
        }))
      );
    }

    loadUsers();
  }, []);

  const toggleUser = (uid: string) => {
    setSelected((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  const selectAll = () => {
    const all = users.filter(u => u.uid !== user?.uid).map(u => u.uid);
    setSelected(all);
  };

  const clearAll = () => {
    setSelected([]);
  };

  const createGroup = async () => {
    if (!groupName.trim()) return alert("Enter group name");
    if (selected.length < 2) return alert("Select at least 2 members");

    try {
      setLoading(true);

      const chatRef = await addDoc(collection(db, "chats"), {
        name: groupName,
        isGroup: true,
        participants: [user!.uid, ...selected],
        lastMessage: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      navigate(`/dashboard/chats/${chatRef.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.uid !== user?.uid &&
      (u.displayName || u.email)
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-10">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/dashboard/chats")}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft />
        </button>

        <h2 className="text-3xl font-bold">Create Group Chat</h2>
      </div>

      {/* Group Name */}
      <input
        className="w-full border p-3 rounded-lg mb-6"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          className="w-full border pl-10 pr-4 py-2 rounded-lg"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Select Members</h3>

        <div className="flex gap-3 text-sm">
          <button onClick={selectAll} className="text-blue-600 hover:underline">
            Select All
          </button>
          <button onClick={clearAll} className="text-red-500 hover:underline">
            Clear
          </button>
        </div>
      </div>

      {/* Selected Count */}
      {selected.length > 0 && (
        <div className="mb-3 flex items-center gap-2 text-sm text-blue-700">
          <Users size={16} />
          {selected.length} members selected
        </div>
      )}

      {/* User List */}
      <div className="space-y-2 mb-6 max-h-[350px] overflow-y-auto border rounded-lg p-3">
        {filteredUsers.map((u) => (
          <div
            key={u.uid}
            onClick={() => toggleUser(u.uid)}
            className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center transition ${
              selected.includes(u.uid)
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-50"
            }`}
          >
            <span>{u.displayName || u.email}</span>
            {selected.includes(u.uid) && (
              <span className="text-blue-600 font-bold">✔</span>
            )}
          </div>
        ))}
      </div>

      {/* Create Button */}
      <button
        onClick={createGroup}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </div>
  );
}
