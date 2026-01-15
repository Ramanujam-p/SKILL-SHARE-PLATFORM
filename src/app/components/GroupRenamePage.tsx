import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function GroupRenamePage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroup();
  }, []);

  async function loadGroup() {
    const ref = doc(db, "chats", chatId!);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setGroupName(snap.data().name);
    }

    setLoading(false);
  }

  async function updateGroupName() {
    if (!groupName.trim()) return alert("Enter group name");

    await updateDoc(doc(db, "chats", chatId!), {
      name: groupName,
      updatedAt: new Date(),
    });

    alert("Group name updated");
    navigate(-1);
  }

  if (loading) return null;

  return (
    <div className="max-w-2xl mx-auto p-10">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Change Group Name</h2>
      </div>

      {/* Input */}
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
        placeholder="Group Name"
      />

      {/* Save */}
      <button
        onClick={updateGroupName}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2"
      >
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
}
