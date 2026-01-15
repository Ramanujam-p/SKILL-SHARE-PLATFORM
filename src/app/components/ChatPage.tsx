// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
// // // // // // // // import { db } from "../lib/firestore";
// // // // // // // // import { useAuth } from "../../hooks/useAuth";
// // // // // // // // import { useParams } from "react-router-dom";
// // // // // // // // import { updateDoc, doc } from "firebase/firestore";

// // // // // // // // export function ChatPage() {
// // // // // // // //   const { chatId } = useParams();
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // // //   const [text, setText] = useState("");

// // // // // // // // useEffect(() => {
// // // // // // // //   if (!chatId || !user) return;

// // // // // // // //   const chatRef = doc(db, "chats", chatId);

// // // // // // // //   // FIRST ensure chat exists
// // // // // // // //   const unsubChat = onSnapshot(chatRef, (chatSnap) => {
// // // // // // // //     if (!chatSnap.exists()) return;

// // // // // // // //     // THEN subscribe to messages
// // // // // // // //     const q = query(
// // // // // // // //       collection(db, "chats", chatId, "messages"),
// // // // // // // //       orderBy("createdAt", "asc")
// // // // // // // //     );

// // // // // // // //     const unsubMessages = onSnapshot(q, (snap) => {
// // // // // // // //       setMessages(
// // // // // // // //         snap.docs.map(d => ({
// // // // // // // //           id: d.id,
// // // // // // // //           ...d.data(),
// // // // // // // //         }))
// // // // // // // //       );
// // // // // // // //     });

// // // // // // // //     return () => unsubMessages();
// // // // // // // //   });

// // // // // // // //   return () => unsubChat();
// // // // // // // // }, [chatId, user]);





// // // // // // // // const sendMessage = async () => {
// // // // // // // //   if (!text.trim() || !user || !chatId) return;

// // // // // // // //   await addDoc(
// // // // // // // //     collection(db, "chats", chatId, "messages"),
// // // // // // // //     {
// // // // // // // //       senderId: user.uid,
// // // // // // // //       text,
// // // // // // // //       createdAt: serverTimestamp(), // 🔴 REQUIRED
// // // // // // // //     }
// // // // // // // //   );

// // // // // // // //   await updateDoc(doc(db, "chats", chatId), {
// // // // // // // //     lastMessage: text,
// // // // // // // //     updatedAt: serverTimestamp(),
// // // // // // // //   });

// // // // // // // //   setText("");
// // // // // // // // };



// // // // // // // //   return (
// // // // // // // //     <div className="flex flex-col h-full max-w-3xl mx-auto p-4">

// // // // // // // //       <div className="flex-1 overflow-y-auto space-y-2">
// // // // // // // //         {messages.map((m, i) => (
// // // // // // // //           <div
// // // // // // // //             key={i}
// // // // // // // //             className={`p-2 rounded-lg max-w-xs ${
// // // // // // // //               m.senderId === user?.uid
// // // // // // // //                 ? "bg-blue-500 text-white ml-auto"
// // // // // // // //                 : "bg-gray-200"
// // // // // // // //             }`}
// // // // // // // //           >
// // // // // // // //             {m.text}
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>


// // // // // // // //       <div className="flex gap-2 mt-3">
// // // // // // // //         <input
// // // // // // // //           value={text}
// // // // // // // //           onChange={e => setText(e.target.value)}
// // // // // // // //           className="flex-1 border rounded-lg p-2"
// // // // // // // //           placeholder="Type a message..."
// // // // // // // //         />
// // // // // // // //         <button
// // // // // // // //           onClick={sendMessage}
// // // // // // // //           className="bg-blue-600 text-white px-4 rounded-lg"
// // // // // // // //         >
// // // // // // // //           Send
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // // import {
// // // // // // //   collection,
// // // // // // //   addDoc,
// // // // // // //   onSnapshot,
// // // // // // //   serverTimestamp,
// // // // // // //   query,
// // // // // // //   orderBy,
// // // // // // //   doc,
// // // // // // //   updateDoc,
// // // // // // // } from "firebase/firestore";
// // // // // // // import { db } from "../lib/firestore";
// // // // // // // import { useAuth } from "../../hooks/useAuth";
// // // // // // // import { useParams } from "react-router-dom";

// // // // // // // export function ChatPage() {
// // // // // // //   const { chatId } = useParams();
// // // // // // //   const { user } = useAuth();
// // // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // // //   const [text, setText] = useState("");
// // // // // // //   const bottomRef = useRef<HTMLDivElement>(null);

// // // // // // //   /* ---------------- LOAD MESSAGES ---------------- */
// // // // // // //   useEffect(() => {
// // // // // // //     if (!chatId || !user) return;

// // // // // // //     const q = query(
// // // // // // //       collection(db, "chats", chatId, "messages"),
// // // // // // //       orderBy("createdAt", "asc")
// // // // // // //     );

// // // // // // //     const unsub = onSnapshot(q, (snap) => {
// // // // // // //       setMessages(
// // // // // // //         snap.docs.map((d) => ({
// // // // // // //           id: d.id,
// // // // // // //           ...d.data(),
// // // // // // //         }))
// // // // // // //       );
// // // // // // //     });

// // // // // // //     return () => unsub();
// // // // // // //   }, [chatId, user]);

// // // // // // //   /* ---------------- AUTO SCROLL ---------------- */
// // // // // // //   useEffect(() => {
// // // // // // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // // //   }, [messages]);

// // // // // // //   /* ---------------- SEND MESSAGE ---------------- */
// // // // // // //   const sendMessage = async () => {
// // // // // // //   if (!text.trim() || !user || !chatId) return;

// // // // // // //   // Add message
// // // // // // //   await addDoc(collection(db, "chats", chatId, "messages"), {
// // // // // // //     senderId: user.uid,
// // // // // // //     text,
// // // // // // //     createdAt: serverTimestamp(), // always present
// // // // // // //   });

// // // // // // //   // Update chat metadata
// // // // // // //   await updateDoc(doc(db, "chats", chatId), {
// // // // // // //     lastMessage: text,
// // // // // // //     updatedAt: serverTimestamp(), // always present
// // // // // // //   });

// // // // // // //   setText("");
// // // // // // // };


// // // // // // //   return (
// // // // // // //     <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto">

// // // // // // //       {/* ---------------- MESSAGES ---------------- */}
// // // // // // //       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// // // // // // //         {messages.map((m) => (
// // // // // // //           <div
// // // // // // //             key={m.id}
// // // // // // //             className={`px-4 py-2 rounded-xl max-w-xs break-words ${
// // // // // // //               m.senderId === user?.uid
// // // // // // //                 ? "bg-blue-600 text-white ml-auto"
// // // // // // //                 : "bg-white border"
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             {m.text}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //         <div ref={bottomRef} />
// // // // // // //       </div>

// // // // // // //       {/* ---------------- INPUT BAR ---------------- */}
// // // // // // //       <div className="border-t bg-white p-4 flex gap-3">
// // // // // // //         <input
// // // // // // //           value={text}
// // // // // // //           onChange={(e) => setText(e.target.value)}
// // // // // // //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // // // // //           className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // // //           placeholder="Type a message..."
// // // // // // //         />
// // // // // // //         <button
// // // // // // //           onClick={sendMessage}
// // // // // // //           className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
// // // // // // //         >
// // // // // // //           Send
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import { useEffect, useState, useRef } from "react";
// // // // // // import {
// // // // // //   collection,
// // // // // //   addDoc,
// // // // // //   onSnapshot,
// // // // // //   serverTimestamp,
// // // // // //   query,
// // // // // //   orderBy,
// // // // // //   doc,
// // // // // //   updateDoc,
// // // // // // } from "firebase/firestore";
// // // // // // import { db } from "../lib/firestore";
// // // // // // import { useAuth } from "../../hooks/useAuth";
// // // // // // import { useParams } from "react-router-dom";

// // // // // // export function ChatPage() {
// // // // // //   const { chatId } = useParams();
// // // // // //   const { user } = useAuth();

// // // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // // //   const [text, setText] = useState("");

// // // // // //   const bottomRef = useRef<HTMLDivElement>(null);

// // // // // //   /* ---------------- LOAD MESSAGES ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     if (!chatId || !user) return;

// // // // // //     const q = query(
// // // // // //       collection(db, "chats", chatId, "messages"),
// // // // // //       orderBy("createdAt", "asc")
// // // // // //     );

// // // // // //     const unsub = onSnapshot(q, (snap) => {
// // // // // //       setMessages(
// // // // // //         snap.docs.map((d) => ({
// // // // // //           id: d.id,
// // // // // //           ...d.data(),
// // // // // //         }))
// // // // // //       );
// // // // // //     });

// // // // // //     return () => unsub();
// // // // // //   }, [chatId, user]);

// // // // // //   /* ---------------- AUTO SCROLL ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // //   }, [messages]);

// // // // // //   /* ---------------- SEND MESSAGE ---------------- */
// // // // // //   const sendMessage = async () => {
// // // // // //     if (!text.trim() || !user || !chatId) return;

// // // // // //     // Save message
// // // // // //     await addDoc(collection(db, "chats", chatId, "messages"), {
// // // // // //       senderId: user.uid,
// // // // // //       text: text.trim(),
// // // // // //       createdAt: serverTimestamp(),
// // // // // //     });

// // // // // //     // Update chat preview
// // // // // //     await updateDoc(doc(db, "chats", chatId), {
// // // // // //       lastMessage: text.trim(),
// // // // // //       updatedAt: serverTimestamp(),
// // // // // //     });

// // // // // //     setText("");
// // // // // //   };

// // // // // //   if (!user) return null;
// // // // // // return (
// // // // // //   <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white">

// // // // // //     {/* ---------------- MESSAGES ---------------- */}
// // // // // //     <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// // // // // //       {messages.map((m) => (
// // // // // //         <div
// // // // // //           key={m.id}
// // // // // //           className={`max-w-xs px-4 py-2 rounded-xl break-words ${
// // // // // //             m.senderId === user.uid
// // // // // //               ? "bg-blue-600 text-white ml-auto"
// // // // // //               : "bg-white border"
// // // // // //           }`}
// // // // // //         >
// // // // // //           {m.text}
// // // // // //         </div>
// // // // // //       ))}
// // // // // //       <div ref={bottomRef} />
// // // // // //     </div>

// // // // // //     {/* ---------------- INPUT BAR (FIXED BOTTOM) ---------------- */}
// // // // // //     <div className="sticky bottom-0 border-t bg-white p-4 flex gap-3">
// // // // // //       <input
// // // // // //         value={text}
// // // // // //         onChange={(e) => setText(e.target.value)}
// // // // // //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // // // //         className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // // //         placeholder="Type a message..."
// // // // // //       />
// // // // // //       <button
// // // // // //         onClick={sendMessage}
// // // // // //         className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
// // // // // //       >
// // // // // //         Send
// // // // // //       </button>
// // // // // //     </div>

// // // // // //   </div>
// // // // // // );

// // // // // // }
// // // // // import { useEffect, useState, useRef } from "react";
// // // // // import {
// // // // //   collection,
// // // // //   addDoc,
// // // // //   onSnapshot,
// // // // //   serverTimestamp,
// // // // //   query,
// // // // //   orderBy,
// // // // //   doc,
// // // // //   updateDoc,
// // // // // } from "firebase/firestore";
// // // // // import { db } from "../lib/firestore";
// // // // // import { useAuth } from "../../hooks/useAuth";
// // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // import { ArrowLeft } from "lucide-react";

// // // // // export function ChatPage() {
// // // // //   const { chatId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const { user } = useAuth();

// // // // //   const [messages, setMessages] = useState<any[]>([]);
// // // // //   const [text, setText] = useState("");

// // // // //   const bottomRef = useRef<HTMLDivElement>(null);

// // // // //   /* ================= LOAD MESSAGES ================= */

// // // // //   useEffect(() => {
// // // // //     if (!chatId || !user) return;

// // // // //     const q = query(
// // // // //       collection(db, "chats", chatId, "messages"),
// // // // //       orderBy("createdAt", "asc")
// // // // //     );

// // // // //     const unsub = onSnapshot(q, (snap) => {
// // // // //       setMessages(
// // // // //         snap.docs.map((d) => ({
// // // // //           id: d.id,
// // // // //           ...d.data(),
// // // // //         }))
// // // // //       );
// // // // //     });

// // // // //     return () => unsub();
// // // // //   }, [chatId, user]);

// // // // //   /* ================= AUTO SCROLL ================= */

// // // // //   useEffect(() => {
// // // // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [messages]);

// // // // //   /* ================= SEND MESSAGE ================= */

// // // // //   const sendMessage = async () => {
// // // // //     if (!text.trim() || !user || !chatId) return;

// // // // //     await addDoc(collection(db, "chats", chatId, "messages"), {
// // // // //       senderId: user.uid,
// // // // //       text: text.trim(),
// // // // //       createdAt: serverTimestamp(),
// // // // //     });

// // // // //     await updateDoc(doc(db, "chats", chatId), {
// // // // //       lastMessage: text.trim(),
// // // // //       updatedAt: serverTimestamp(),
// // // // //     });

// // // // //     setText("");
// // // // //   };

// // // // //   if (!user) return null;

// // // // //   return (
// // // // //     <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

// // // // //       {/* ================= HEADER ================= */}
// // // // //       <div className="flex items-center gap-3 p-4 border-b bg-white sticky top-0 z-10">
// // // // //         <button
// // // // //           onClick={() => navigate("/dashboard/chats")}
// // // // //           className="p-2 rounded-lg hover:bg-gray-100"
// // // // //         >
// // // // //           <ArrowLeft className="w-5 h-5" />
// // // // //         </button>

// // // // //         <h2 className="font-semibold text-lg">Chat</h2>
// // // // //       </div>

// // // // //       {/* ================= MESSAGES ================= */}
// // // // //       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// // // // //         {messages.map((m) => (
// // // // //           <div
// // // // //             key={m.id}
// // // // //             className={`max-w-xs px-4 py-2 rounded-xl break-words shadow-sm ${
// // // // //               m.senderId === user.uid
// // // // //                 ? "bg-blue-600 text-white ml-auto"
// // // // //                 : "bg-white border"
// // // // //             }`}
// // // // //           >
// // // // //             {m.text}
// // // // //           </div>
// // // // //         ))}
// // // // //         <div ref={bottomRef} />
// // // // //       </div>

// // // // //       {/* ================= INPUT BAR ================= */}
// // // // //       <div className="sticky bottom-0 border-t bg-white p-4 flex gap-3">
// // // // //         <input
// // // // //           value={text}
// // // // //           onChange={(e) => setText(e.target.value)}
// // // // //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // // //           className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // // //           placeholder="Type a message..."
// // // // //         />

// // // // //         <button
// // // // //           onClick={sendMessage}
// // // // //           className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
// // // // //         >
// // // // //           Send
// // // // //         </button>
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useEffect, useState, useRef } from "react";
// // // // import {
// // // //   collection,
// // // //   addDoc,
// // // //   onSnapshot,
// // // //   serverTimestamp,
// // // //   query,
// // // //   orderBy,
// // // //   doc,
// // // //   updateDoc,
// // // // } from "firebase/firestore";
// // // // import { db } from "../lib/firestore";
// // // // import { useAuth } from "../../hooks/useAuth";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import { ArrowLeft } from "lucide-react";

// // // // export function ChatPage() {
// // // //   const { chatId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const { user } = useAuth();

// // // //   const [messages, setMessages] = useState<any[]>([]);
// // // //   const [text, setText] = useState("");
// // // //   const bottomRef = useRef<HTMLDivElement>(null);

// // // //   useEffect(() => {
// // // //     if (!chatId || !user) return;

// // // //     const q = query(
// // // //       collection(db, "chats", chatId, "messages"),
// // // //       orderBy("createdAt", "asc")
// // // //     );

// // // //     const unsub = onSnapshot(q, snap => {
// // // //       setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
// // // //     });

// // // //     return () => unsub();
// // // //   }, [chatId, user]);

// // // //   useEffect(() => {
// // // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //   }, [messages]);

// // // //   const sendMessage = async () => {
// // // //     if (!text.trim() || !user || !chatId) return;

// // // //     await addDoc(collection(db, "chats", chatId, "messages"), {
// // // //       senderId: user.uid,
// // // //       text: text.trim(),
// // // //       createdAt: serverTimestamp(),
// // // //     });

// // // //     await updateDoc(doc(db, "chats", chatId), {
// // // //       lastMessage: text.trim(),
// // // //       updatedAt: serverTimestamp(),
// // // //     });

// // // //     setText("");
// // // //   };

// // // //   if (!user) return null;

// // // //   return (
// // // //     <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

// // // //       {/* Header */}
// // // //       <div className="flex items-center gap-3 p-4 border-b bg-white sticky top-0">
// // // //         <button onClick={() => navigate("/dashboard/chats")}>
// // // //           <ArrowLeft />
// // // //         </button>
// // // //         <h2 className="font-semibold text-lg">Chat</h2>
// // // //       </div>

// // // //       {/* Messages */}
// // // //       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// // // //         {messages.map(m => (
// // // //           <div
// // // //             key={m.id}
// // // //             className={`max-w-xs px-4 py-2 rounded-xl shadow-sm ${
// // // //               m.senderId === user.uid
// // // //                 ? "bg-blue-600 text-white ml-auto"
// // // //                 : "bg-white border"
// // // //             }`}
// // // //           >
// // // //             {m.text}
// // // //           </div>
// // // //         ))}
// // // //         <div ref={bottomRef} />
// // // //       </div>

// // // //       {/* Input */}
// // // //       <div className="sticky bottom-0 border-t bg-white p-4 flex gap-3">
// // // //         <input
// // // //           value={text}
// // // //           onChange={(e) => setText(e.target.value)}
// // // //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // //           className="flex-1 border rounded-lg px-4 py-2"
// // // //           placeholder="Type a message..."
// // // //         />

// // // //         <button
// // // //           onClick={sendMessage}
// // // //           className="bg-blue-600 text-white px-6 rounded-lg"
// // // //         >
// // // //           Send
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState, useRef } from "react";
// // // import {
// // //   collection,
// // //   addDoc,
// // //   onSnapshot,
// // //   serverTimestamp,
// // //   query,
// // //   orderBy,
// // //   doc,
// // //   updateDoc,
// // //   arrayRemove,
// // // } from "firebase/firestore";
// // // import { db } from "../lib/firestore";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { ArrowLeft } from "lucide-react";

// // // export function ChatPage() {
// // //   const { chatId } = useParams();
// // //   const navigate = useNavigate();
// // //   const { user } = useAuth();

// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [chatInfo, setChatInfo] = useState<any>(null);
// // //   const [text, setText] = useState("");
// // //   const [renaming, setRenaming] = useState(false);
// // //   const [newName, setNewName] = useState("");
// // //   const bottomRef = useRef<HTMLDivElement>(null);

// // //   /* Load chat info */
// // //   useEffect(() => {
// // //     if (!chatId) return;

// // //     const unsub = onSnapshot(doc(db, "chats", chatId), snap => {
// // //       if (snap.exists()) {
// // //         setChatInfo(snap.data());
// // //         setNewName(snap.data().name || "");
// // //       }
// // //     });

// // //     return () => unsub();
// // //   }, [chatId]);

// // //   /* Load messages */
// // //   useEffect(() => {
// // //     if (!chatId || !user) return;

// // //     const q = query(
// // //       collection(db, "chats", chatId, "messages"),
// // //       orderBy("createdAt", "asc")
// // //     );

// // //     const unsub = onSnapshot(q, snap => {
// // //       setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
// // //     });

// // //     return () => unsub();
// // //   }, [chatId, user]);

// // //   useEffect(() => {
// // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   const sendMessage = async () => {
// // //     if (!text.trim()) return;

// // //     await addDoc(collection(db, "chats", chatId!, "messages"), {
// // //       senderId: user!.uid,
// // //       text,
// // //       createdAt: serverTimestamp(),
// // //     });

// // //     await updateDoc(doc(db, "chats", chatId!), {
// // //       lastMessage: text,
// // //       updatedAt: serverTimestamp(),
// // //     });

// // //     setText("");
// // //   };

// // //   const renameGroup = async () => {
// // //     await updateDoc(doc(db, "chats", chatId!), {
// // //       name: newName,
// // //     });
// // //     setRenaming(false);
// // //   };

// // //   const leaveGroup = async () => {
// // //     await updateDoc(doc(db, "chats", chatId!), {
// // //       participants: arrayRemove(user!.uid),
// // //     });
// // //     navigate("/dashboard/chats");
// // //   };

// // //   const removeMember = async (uid: string) => {
// // //     await updateDoc(doc(db, "chats", chatId!), {
// // //       participants: arrayRemove(uid),
// // //     });
// // //   };

// // //   if (!chatInfo) return null;

// // //   return (
// // //     <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

// // //       {/* Header */}
// // //       <div className="flex items-center justify-between p-4 border-b">
// // //         <div className="flex items-center gap-3">
// // //           <button onClick={() => navigate("/dashboard/chats")}>
// // //             <ArrowLeft />
// // //           </button>
// // // <button
// // //   onClick={() => navigate(`/dashboard/chats/${chatId}/rename`)}
// // //   className="text-sm text-blue-600 hover:underline"
// // // >
// // //   Rename Group
// // // </button>

// // //           {chatInfo.isGroup ? (
// // //             renaming ? (
// // //               <div className="flex gap-2">
// // //                 <input
// // //                   value={newName}
// // //                   onChange={(e) => setNewName(e.target.value)}
// // //                   className="border px-2 rounded"
// // //                 />
// // //                 <button onClick={renameGroup} className="text-blue-600">
// // //                   Save
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <div>
// // //                 <h2 className="font-semibold">{chatInfo.name}</h2>
// // //                 {chatInfo.admin === user!.uid && (
// // //                   <button
// // //                     onClick={() => setRenaming(true)}
// // //                     className="text-sm text-blue-600"
// // //                   >
// // //                     Rename
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             )
// // //           ) : (
// // //             <h2 className="font-semibold">Chat</h2>
// // //           )}
// // //         </div>

// // //         {chatInfo.isGroup && (
// // //           <button onClick={leaveGroup} className="text-red-600 text-sm">
// // //             Leave Group
// // //           </button>
// // //         )}
// // //       </div>

// // //       {/* Members */}
// // //       {chatInfo.isGroup && (
// // //         <div className="border-b p-4 bg-gray-50">
// // //           <h3 className="font-semibold mb-2">Members</h3>
// // //           {chatInfo.participants.map((uid: string) => (
// // //             <div key={uid} className="flex justify-between py-1">
// // //               <span>{uid}</span>
// // //               {chatInfo.admin === user!.uid && uid !== user!.uid && (
// // //                 <button
// // //                   onClick={() => removeMember(uid)}
// // //                   className="text-red-500 text-sm"
// // //                 >
// // //                   Remove
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Messages */}
// // //       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// // //         {messages.map(m => (
// // //           <div
// // //             key={m.id}
// // //             className={`max-w-xs px-4 py-2 rounded-xl ${
// // //               m.senderId === user!.uid
// // //                 ? "bg-blue-600 text-white ml-auto"
// // //                 : "bg-white border"
// // //             }`}
// // //           >
// // //             {m.text}
// // //           </div>
// // //         ))}
// // //         <div ref={bottomRef} />
// // //       </div>

// // //       {/* Input */}
// // //       <div className="border-t p-4 flex gap-3">
// // //         <input
// // //           value={text}
// // //           onChange={(e) => setText(e.target.value)}
// // //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // //           className="flex-1 border rounded px-4 py-2"
// // //           placeholder="Type a message..."
// // //         />
// // //         <button
// // //           onClick={sendMessage}
// // //           className="bg-blue-600 text-white px-6 rounded"
// // //         >
// // //           Send
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState, useRef } from "react";
// // import {
// //   collection,
// //   addDoc,
// //   onSnapshot,
// //   serverTimestamp,
// //   query,
// //   orderBy,
// //   doc,
// //   updateDoc,
// //   getDoc,
// //   arrayRemove,
// // } from "firebase/firestore";
// // import { db } from "../lib/firestore";
// // import { useAuth } from "../../hooks/useAuth";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { ArrowLeft } from "lucide-react";

// // export function ChatPage() {
// //   const { chatId } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();

// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [chatInfo, setChatInfo] = useState<any>(null);
// //   const [members, setMembers] = useState<any[]>([]);
// //   const [text, setText] = useState("");
// //   const [newName, setNewName] = useState("");
// //   const [renaming, setRenaming] = useState(false);

// //   const bottomRef = useRef<HTMLDivElement>(null);

// //   /* Load chat info */
// //   useEffect(() => {
// //     if (!chatId) return;

// //     return onSnapshot(doc(db, "chats", chatId), async (snap) => {
// //       if (!snap.exists()) return;

// //       const data = snap.data();
// //       setChatInfo(data);
// //       setNewName(data.name || "");

// //       // Load member profiles
// //       const usersSnap = await getDocProfiles(data.participants);
// //       setMembers(usersSnap);
// //     });
// //   }, [chatId]);

// //   /* Load messages */
// //   useEffect(() => {
// //     if (!chatId) return;

// //     const q = query(
// //       collection(db, "chats", chatId, "messages"),
// //       orderBy("createdAt", "asc")
// //     );

// //     return onSnapshot(q, (snap) => {
// //       setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
// //     });
// //   }, [chatId]);

// //   useEffect(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   /* Helpers */

// //   async function getDocProfiles(ids: string[]) {
// //     const list = [];
// //     for (const uid of ids) {
// //       const snap = await getDoc(doc(db, "users", uid));
// //       if (snap.exists()) list.push({ uid, ...snap.data() });
// //     }
// //     return list;
// //   }

// //   const sendMessage = async () => {
// //     if (!text.trim()) return;

// //     await addDoc(collection(db, "chats", chatId!, "messages"), {
// //       senderId: user!.uid,
// //       text,
// //       createdAt: serverTimestamp(),
// //     });

// //     await updateDoc(doc(db, "chats", chatId!), {
// //       lastMessage: text,
// //       updatedAt: serverTimestamp(),
// //     });

// //     setText("");
// //   };

// //   const renameGroup = async () => {
// //     await updateDoc(doc(db, "chats", chatId!), { name: newName });
// //     setRenaming(false);
// //   };

// //   const leaveGroup = async () => {
// //     await updateDoc(doc(db, "chats", chatId!), {
// //       participants: arrayRemove(user!.uid),
// //     });
// //     navigate("/dashboard/chats");
// //   };

// //   if (!chatInfo) return null;

// //   return (
// //     <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

// //       {/* Header */}
// //       <div className="flex items-center justify-between p-4 border-b">
// //         <div className="flex items-center gap-3">
// //           <button onClick={() => navigate("/dashboard/chats")}>
// //             <ArrowLeft />
// //           </button>

// //           {renaming ? (
// //             <div className="flex gap-2">
// //               <input
// //                 value={newName}
// //                 onChange={(e) => setNewName(e.target.value)}
// //                 className="border px-2 rounded"
// //               />
// //               <button onClick={renameGroup} className="text-blue-600">Save</button>
// //             </div>
// //           ) : (
// //             <div>
// //               <h2 className="font-semibold">{chatInfo.name}</h2>
// //               {chatInfo.isGroup && (
// //                 <button onClick={() => setRenaming(true)} className="text-sm text-blue-600">
// //                   Rename Group
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {chatInfo.isGroup && (
// //           <button onClick={leaveGroup} className="text-red-600 text-sm">
// //             Leave Group
// //           </button>
// //         )}
// //       </div>

// //       {/* Members */}
// //       {chatInfo.isGroup && (
// //         <div className="border-b p-4 bg-gray-50">
// //           <h3 className="font-semibold mb-2">Members</h3>
// //           {members.map((m) => (
// //             <div key={m.uid} className="py-1">
// //               {m.displayName || m.email}
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Messages */}
// //       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
// //         {messages.map(m => (
// //           <div
// //             key={m.id}
// //             className={`max-w-xs px-4 py-2 rounded-xl ${
// //               m.senderId === user!.uid
// //                 ? "bg-blue-600 text-white ml-auto"
// //                 : "bg-white border"
// //             }`}
// //           >
// //             {m.text}
// //           </div>
// //         ))}
// //         <div ref={bottomRef} />
// //       </div>

// //       {/* Input */}
// //       <div className="border-t p-4 flex gap-3">
// //         <input
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //           className="flex-1 border rounded px-4 py-2"
// //           placeholder="Type a message..."
// //         />
// //         <button
// //           onClick={sendMessage}
// //           className="bg-blue-600 text-white px-6 rounded"
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState, useRef } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   serverTimestamp,
//   query,
//   orderBy,
//   doc,
//   updateDoc,
//   getDoc,
//   arrayRemove,
// } from "firebase/firestore";
// import { db } from "../lib/firestore";
// import { useAuth } from "../../hooks/useAuth";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// interface Member {
//   uid: string;
//   displayName?: string;
//   email?: string;
//   photoURL?: string;
// }

// export function ChatPage() {
//   const { chatId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [messages, setMessages] = useState<any[]>([]);
//   const [chatInfo, setChatInfo] = useState<any>(null);
//   const [members, setMembers] = useState<Member[]>([]);
//   const [text, setText] = useState("");
//   const [newName, setNewName] = useState("");
//   const [renaming, setRenaming] = useState(false);

//   const bottomRef = useRef<HTMLDivElement>(null);

//   /* ================= LOAD CHAT INFO ================= */
//   useEffect(() => {
//     if (!chatId) return;

//     return onSnapshot(doc(db, "chats", chatId), async (snap) => {
//       if (!snap.exists()) return;

//       const data = snap.data();
//       setChatInfo(data);
//       setNewName(data.name || "");

//       // Load member profiles once
//       const profiles: Member[] = [];

//       for (const uid of data.participants) {
//         const userSnap = await getDoc(doc(db, "users", uid));
//         if (userSnap.exists()) {
//           profiles.push({ uid, ...userSnap.data() });
//         }
//       }

//       setMembers(profiles);
//     });
//   }, [chatId]);

//   /* ================= LOAD MESSAGES ================= */
//   useEffect(() => {
//     if (!chatId) return;

//     const q = query(
//       collection(db, "chats", chatId, "messages"),
//       orderBy("createdAt", "asc")
//     );

//     return onSnapshot(q, (snap) => {
//       setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
//     });
//   }, [chatId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   /* ================= ACTIONS ================= */

//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     await addDoc(collection(db, "chats", chatId!, "messages"), {
//       senderId: user!.uid,
//       text,
//       createdAt: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "chats", chatId!), {
//       lastMessage: text,
//       updatedAt: serverTimestamp(),
//     });

//     setText("");
//   };

//   const renameGroup = async () => {
//     await updateDoc(doc(db, "chats", chatId!), { name: newName });
//     setRenaming(false);
//   };

//   const leaveGroup = async () => {
//     await updateDoc(doc(db, "chats", chatId!), {
//       participants: arrayRemove(user!.uid),
//     });
//     navigate("/dashboard/chats");
//   };

//   if (!chatInfo) return null;

//   return (
//     <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

//       {/* ================= HEADER ================= */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center gap-3">
//           <button onClick={() => navigate("/dashboard/chats")}>
//             <ArrowLeft />
//           </button>

//           {renaming ? (
//             <div className="flex gap-2">
//               <input
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 className="border px-2 rounded"
//               />
//               <button onClick={renameGroup} className="text-blue-600">Save</button>
//             </div>
//           ) : (
//             <div>
//               <h2 className="font-semibold">{chatInfo.name}</h2>
//               {chatInfo.isGroup && (
//                 <button
//                   onClick={() => setRenaming(true)}
//                   className="text-sm text-blue-600"
//                 >
//                   Rename Group
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {chatInfo.isGroup && (
//           <button onClick={leaveGroup} className="text-red-600 text-sm">
//             Leave Group
//           </button>
//         )}
//       </div>

//       {/* ================= MEMBERS ================= */}
//       {chatInfo.isGroup && (
//         <div className="border-b p-4 bg-gray-50">
//           <h3 className="font-semibold mb-2">Members</h3>

//           {members.map((m) => (
//             <div key={m.uid} className="py-1 text-sm">
//               {m.displayName || m.email}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= MESSAGES ================= */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
//         {messages.map(m => (
//           <div
//             key={m.id}
//             className={`max-w-xs px-4 py-2 rounded-xl ${
//               m.senderId === user!.uid
//                 ? "bg-blue-600 text-white ml-auto"
//                 : "bg-white border"
//             }`}
//           >
//             {m.text}
//           </div>
//         ))}
//         <div ref={bottomRef} />
//       </div>

//       {/* ================= INPUT ================= */}
//       <div className="border-t p-4 flex gap-3">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 border rounded px-4 py-2"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-6 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

interface Member {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [chatInfo, setChatInfo] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const [text, setText] = useState("");
  const [newName, setNewName] = useState("");
  const [renaming, setRenaming] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* ================= LOAD CHAT INFO ================= */
  useEffect(() => {
    if (!chatId) return;

    return onSnapshot(doc(db, "chats", chatId), async (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      setChatInfo(data);
      setNewName(data.name || "");

      const profiles: Member[] = [];

      for (const uid of data.participants) {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
          profiles.push({ uid, ...userSnap.data() });
        }
      }

      setMembers(profiles);
    });
  }, [chatId]);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= ACTIONS ================= */

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId!, "messages"), {
      senderId: user!.uid,
      text,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", chatId!), {
      lastMessage: text,
      updatedAt: serverTimestamp(),
    });

    setText("");
  };

  const renameGroup = async () => {
    await updateDoc(doc(db, "chats", chatId!), { name: newName });
    setRenaming(false);
  };

  const leaveGroup = async () => {
    await updateDoc(doc(db, "chats", chatId!), {
      participants: arrayRemove(user!.uid),
    });
    navigate("/dashboard/chats");
  };

  if (!chatInfo) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] max-w-4xl mx-auto bg-white border">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard/chats")}>
            <ArrowLeft />
          </button>

          {renaming ? (
            <div className="flex gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border px-2 rounded"
              />
              <button onClick={renameGroup} className="text-blue-600">Save</button>
            </div>
          ) : (
            <div>
              <h2 className="font-semibold">{chatInfo.name}</h2>
              {chatInfo.isGroup && (
                <button
                  onClick={() => setRenaming(true)}
                  className="text-sm text-blue-600"
                >
                  Rename Group
                </button>
              )}
            </div>
          )}
        </div>

        {chatInfo.isGroup && (
          <button onClick={leaveGroup} className="text-red-600 text-sm">
            Leave Group
          </button>
        )}
      </div>

      {/* ================= MEMBERS TOGGLE ================= */}
      {chatInfo.isGroup && (
        <div className="border-b bg-gray-50">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="w-full flex justify-between items-center p-4 font-semibold"
          >
            Members ({members.length})
            {showMembers ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showMembers && (
            <div className="px-4 pb-4 space-y-3">
              {members.map((m) => (
                <div key={m.uid} className="flex items-center gap-3">
                  {m.photoURL ? (
                    <img
                      src={m.photoURL}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {(m.displayName || m.email || "U")[0].toUpperCase()}
                    </div>
                  )}

                  <span className="text-sm">
                    {m.displayName || m.email}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= MESSAGES ================= */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
        {messages.map(m => (
          <div
            key={m.id}
            className={`max-w-xs px-4 py-2 rounded-xl ${
              m.senderId === user!.uid
                ? "bg-blue-600 text-white ml-auto"
                : "bg-white border"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT ================= */}
      <div className="border-t p-4 flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-4 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
