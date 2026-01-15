// // import { useParams, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { getDoc, doc } from "firebase/firestore";
// // import { db } from "../lib/firestore";
// // import { QuestionDetailModal } from "./QuestionDetailModal";

// // /* ---------------- TYPES ---------------- */

// // interface Question {
// //   id: string;
// //   title: string;
// //   content: string;
// //   tags: string[];
// //   upvotes: number;
// //   views: number;
// //   timeAgo: string;
// //   userId: string;
// //   author: {
// //     name: string;
// //     avatar?: string;
// //     initials: string;
// //     reputation: number;
// //   };
// //   trending?: boolean;
// //   hot?: boolean;
// //   hasUpvoted?: boolean;
// //   isBookmarked?: boolean;
// // }

// // /* ---------------- COMPONENT ---------------- */

// // export function QuestionDetailPage() {
// //   const { questionId } = useParams<{ questionId: string }>();
// //   const navigate = useNavigate();

// //   const [question, setQuestion] = useState<Question | null>(null);

// //   useEffect(() => {
// //     if (!questionId) return;

// //     async function loadQuestion() {
// //       try {
// //         const snap = await getDoc(doc(db, "questions", questionId));

// //         if (!snap.exists()) return;

// //         const data: any = snap.data();

// //         /* 🔑 NORMALIZE DATA (VERY IMPORTANT) */
// //         const normalized: Question = {
// //           id: snap.id,
// //           title: data.title ?? "",
// //           content: data.content ?? "",
// //           tags: data.tags ?? [],
// //           upvotes: data.upvotes ?? 0,
// //           views: data.views ?? 0,
// //           timeAgo: data.timeAgo ?? "just now", // can be replaced with real formatter
// //           userId: data.userId,
// //           author: {
// //             name: data.userName ?? "Guest",
// //             avatar: data.userAvatar ?? "",
// //             initials: (data.userName ?? "G")
// //               .split(" ")
// //               .map((n: string) => n[0])
// //               .join("")
// //               .slice(0, 2)
// //               .toUpperCase(),
// //             reputation: 0,
// //           },
// //           trending: (data.upvotes ?? 0) > 5,
// //           hot: (data.upvotes ?? 0) > 10,
// //           hasUpvoted: false,
// //           isBookmarked: false,
// //         };

// //         setQuestion(normalized);
// //       } catch (err) {
// //         console.error("Failed to load question:", err);
// //       }
// //     }

// //     loadQuestion();
// //   }, [questionId]);

// //   if (!question) return null;

// //   return (
// //     <QuestionDetailModal
// //       question={question}
// //       isOpen={true}
// //       onClose={() => navigate("/dashboard/helpdesk")}
// //     />
// //   );
// // }
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { QuestionDetailModal } from "./QuestionDetailModal";
// import { getQuestionById } from "../lib/firestore";
// import { timeAgo } from "../../lib/time";

// /* ---------------- TYPES ---------------- */

// interface Question {
//   id: string;
//   title: string;
//   content: string;
//   tags: string[];
//   upvotes: number;
//   views: number;
//   timeAgo: string;
//   userId: string;
//   author: {
//     name: string;
//     avatar?: string;
//     initials: string;
//     reputation: number;
//   };
//   trending?: boolean;
//   hot?: boolean;
//   hasUpvoted?: boolean;
//   isBookmarked?: boolean;
// }

// /* ---------------- COMPONENT ---------------- */

// export function QuestionDetailPage() {
//   const { questionId } = useParams<{ questionId: string }>();
//   const navigate = useNavigate();

//   const [question, setQuestion] = useState<Question | null>(null);

//   useEffect(() => {
//     if (!questionId) return;

//     async function loadQuestion() {
//       try {
//         const data: any = await getQuestionById(questionId);

//         if (!data) return;

//         const normalized: Question = {
//           id: data.id,
//           title: data.title ?? "",
//           content: data.content ?? "",
//           tags: data.tags ?? [],
//           upvotes: data.upvotes ?? 0,
//           views: data.views ?? 0,
//           timeAgo: timeAgo(data.createdAt),
//           userId: data.userId,
//           author: {
//             name: data.userName ?? "Guest",
//             avatar: data.userAvatar ?? "",
//             initials: (data.userName ?? "G")
//               .split(" ")
//               .map((n: string) => n[0])
//               .join("")
//               .slice(0, 2)
//               .toUpperCase(),
//             reputation: 0,
//           },
//           trending: (data.upvotes ?? 0) > 5,
//           hot: (data.upvotes ?? 0) > 10,
//           hasUpvoted: false,
//           isBookmarked: false,
//         };

//         setQuestion(normalized);
//       } catch (err) {
//         console.error("Failed to load question:", err);
//       }
//     }

//     loadQuestion();
//   }, [questionId]);

//   if (!question) return null;

//   return (
//     <QuestionDetailModal
//       question={question}
//       isOpen={true}
//       onClose={() => navigate("/dashboard/helpdesk")}
//     />
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { QuestionDetailModal } from "./QuestionDetailModal";
import { getQuestionById } from "../lib/firestore";
import { timeAgo } from "../../lib/time";

/* ---------------- TYPES ---------------- */

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  views: number;
  timeAgo: string;
  userId: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
    reputation: number;
  };
  trending?: boolean;
  hot?: boolean;
  hasUpvoted?: boolean;
  isBookmarked?: boolean;
}

/* ---------------- COMPONENT ---------------- */

export function QuestionDetailPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questionId) return;

    async function loadQuestion() {
      try {
        const data: any = await getQuestionById(questionId);

        if (!data) {
          setLoading(false);
          return;
        }

        const normalized: Question = {
          id: data.id,
          title: data.title ?? "",
          content: data.content ?? "",
          tags: data.tags ?? [],
          upvotes: data.upvotes ?? 0,
          views: data.views ?? 0,
          timeAgo: timeAgo(data.createdAt),
          userId: data.userId,
          author: {
            name: data.userName ?? "Guest",
            avatar: data.userAvatar ?? "",
            initials: (data.userName ?? "G")
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            reputation: 0,
          },
          trending: (data.upvotes ?? 0) > 5,
          hot: (data.upvotes ?? 0) > 10,
          hasUpvoted: false,
          isBookmarked: false,
        };

        setQuestion(normalized);
      } catch (err) {
        console.error("Failed to load question:", err);
      } finally {
        setLoading(false);
      }
    }

    loadQuestion();
  }, [questionId]);

  /* ---------- LOADING STATE ---------- */
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading question...
      </div>
    );
  }

  /* ---------- NOT FOUND ---------- */
  if (!question) {
    return (
      <div className="p-12 text-center text-gray-500">
        Question not found
      </div>
    );
  }

  /* ---------- MODAL ---------- */
  return (
    <QuestionDetailModal
      question={question}
      isOpen={true}
      onClose={() => navigate("/dashboard/helpdesk")}
    />
  );
}
