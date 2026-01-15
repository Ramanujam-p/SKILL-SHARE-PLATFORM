// import { JSX, useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { ReplySection } from "./ReplySection";
// import {
//   ArrowUp,
//   Eye,
//   Clock,
//   TrendingUp,
//   Flame,
//   Bookmark,
//   Share2,
// } from "lucide-react";
// import { toast } from "sonner";

// import { createAnswer, getAnswers } from "../lib/firestore";
// import { createNotification } from "../lib/notifications";
// import { useAuth } from "../../hooks/useAuth";

// /* ---------------- TYPES ---------------- */

// interface Question {
//   id: string;
//   title: string;
//   content: string;
//   tags: string[];
//   upvotes: number;
//   views: number;
//   timeAgo: string;
//   trending?: boolean;
//   hot?: boolean;
//   hasUpvoted?: boolean;
//   isBookmarked?: boolean;
//   userId: string;
//   author: {
//     name: string;
//     avatar?: string;
//     initials: string;
//     reputation: number;
//   };
// }

// interface Reply {
//   id: string;
//   content: string;
//   upvotes: number;
//   author: {
//     name: string;
//     avatar?: string;
//     initials: string;
//     reputation?: number;
//   };
// }

// interface Props {
//   question: Question | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// /* ---------------- COMPONENT ---------------- */

// export function QuestionDetailModal({
//   question,
//   isOpen,
//   onClose,
// }: Props): JSX.Element | null {
//   const { user } = useAuth();

//   const [upvotes, setUpvotes] = useState(0);
//   const [hasUpvoted, setHasUpvoted] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [replies, setReplies] = useState<Reply[]>([]);

//   /* ---------------- GUARD ---------------- */

//   if (!isOpen || !question) return null;

//   /* ---------------- LOAD ANSWERS ---------------- */

//   useEffect(() => {
//     setUpvotes(question.upvotes ?? 0);
//     setHasUpvoted(question.hasUpvoted ?? false);
//     setIsBookmarked(question.isBookmarked ?? false);

//     async function loadReplies() {
//       try {
//         const answers = await getAnswers(question.id);

//         const normalized: Reply[] = (answers as any[]).map((a) => ({
//           id: a.id,
//           content: a.content,
//           upvotes: a.upvotes ?? 0,
//           author: {
//             name: a.userName ?? "Guest",
//             initials: (a.userName ?? "G")
//               .split(" ")
//               .map((n: string) => n[0])
//               .join("")
//               .slice(0, 2)
//               .toUpperCase(),
//             reputation: 0,
//           },
//         }));

//         setReplies(normalized);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     loadReplies();
//   }, [question]);

//   /* ---------------- ACTIONS ---------------- */

//   const handleUpvote = () => {
//     setHasUpvoted((v) => !v);
//     setUpvotes((v) => (hasUpvoted ? v - 1 : v + 1));
//   };

//   const handleBookmark = () => {
//     setIsBookmarked((v) => !v);
//     toast.success(
//       isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
//     );
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success("Link copied to clipboard");
//   };

//  const handleReplySubmit = async (content: string) => {
//   if (!user) throw new Error("Not authenticated");

//   try {
//     await createAnswer({
//       questionId: question.id,
//       content,
//       userId: user.uid,
//       userName: user.displayName || "Guest",
//     });

//     // 🔔 Notify question owner
//     if (question.userId !== user.uid) {
//       await createNotification({
//         userId: question.userId,
//         type: "answer",
//         title: "New answer to your question",
//         message: "Someone replied to your helpdesk question",
//         link: `/dashboard/helpdesk/${question.id}`,
//       });
//     }

//     const updated = await getAnswers(question.id);

//     setReplies(
//       updated.map((a: any) => ({
//         id: a.id,
//         content: a.content,
//         upvotes: a.upvotes ?? 0,
//         author: {
//           name: a.userName ?? "Guest",
//           initials: a.userName?.slice(0, 2).toUpperCase() ?? "GU",
//           reputation: 0,
//         },
//       }))
//     );

//     toast.success("Reply posted successfully");
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to post reply");
//     throw err; // 🔴 IMPORTANT so ReplySection can catch
//   }
// };

//     // 🔔 Notify question owner
//     if (question.userId !== user.uid) {
//       await createNotification({
//         userId: question.userId,
//         type: "answer",
//         title: "New answer to your question",
//         message: "Someone replied to your helpdesk question",
//         link: `/dashboard/helpdesk`,
//       });
//     }

//     const updated = await getAnswers(question.id);

//     setReplies(
//       updated.map((a: any) => ({
//         id: a.id,
//         content: a.content,
//         upvotes: a.upvotes ?? 0,
//         author: {
//           name: a.userName ?? "Guest",
//           initials: a.userName?.slice(0, 2).toUpperCase() ?? "GU",
//           reputation: 0,
//         },
//       }))
//     );
//   };

//   /* ---------------- RENDER ---------------- */

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
//         {/* HEADER */}
//         <div className="sticky top-0 bg-white border-b p-6 z-10">
//           <DialogHeader>
//             <div className="flex justify-between gap-4">
//               <div>
//                 <div className="flex gap-2 mb-3">
//                   {question.trending && (
//                     <Badge className="bg-orange-500 text-white">
//                       <TrendingUp className="size-3 mr-1" />
//                       Trending
//                     </Badge>
//                   )}
//                   {question.hot && (
//                     <Badge className="bg-red-500 text-white">
//                       <Flame className="size-3 mr-1" />
//                       Hot
//                     </Badge>
//                   )}
//                 </div>

//                 <h2 className="text-2xl font-bold mb-2">
//                   {question.title}
//                 </h2>

//                 <div className="flex gap-4 text-sm text-gray-500">
//                   <span className="flex gap-1">
//                     <Clock className="size-4" /> {question.timeAgo}
//                   </span>
//                   <span className="flex gap-1">
//                     <Eye className="size-4" /> {question.views}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button onClick={handleBookmark}>
//                   <Bookmark className={isBookmarked ? "fill-yellow-500" : ""} />
//                 </button>
//                 <button onClick={handleShare}>
//                   <Share2 />
//                 </button>
//               </div>
//             </div>
//           </DialogHeader>
//         </div>

//         {/* BODY */}
//         <div className="p-6">
//           <div className="flex gap-6">
//             {/* VOTE */}
//             <div className="flex flex-col items-center">
//               <button onClick={handleUpvote}>
//                 <ArrowUp className={hasUpvoted ? "fill-blue-600" : ""} />
//               </button>
//               <span className="font-bold">{upvotes}</span>
//             </div>

//             {/* CONTENT */}
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <Avatar>
//                   <AvatarImage src={question.author.avatar} />
//                   <AvatarFallback>
//                     {question.author.initials}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-semibold">{question.author.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {question.author.reputation} reputation
//                   </p>
//                 </div>
//               </div>

//               <p className="mb-4 whitespace-pre-wrap">
//                 {question.content}
//               </p>

//               <div className="flex gap-2 flex-wrap">
//                 {question.tags.map((t) => (
//                   <Badge key={t} variant="secondary">
//                     {t}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <hr className="my-8" />

//           <ReplySection
//             replies={replies}
//             onReplySubmit={handleReplySubmit}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { JSX, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ReplySection } from "./ReplySection";
import {
  ArrowUp,
  Eye,
  Clock,
  TrendingUp,
  Flame,
  Bookmark,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import { createAnswer, getAnswers } from "../lib/firestore";
import { createNotification } from "../lib/notifications";
import { useAuth } from "../../hooks/useAuth";

/* ---------------- TYPES ---------------- */

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  views: number;
  timeAgo: string;
  trending?: boolean;
  hot?: boolean;
  hasUpvoted?: boolean;
  isBookmarked?: boolean;
  userId: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
    reputation: number;
  };
}

interface Reply {
  id: string;
  content: string;
  upvotes: number;
  author: {
    name: string;
    avatar?: string;
    initials: string;
    reputation?: number;
  };
}

interface Props {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
}

/* ---------------- COMPONENT ---------------- */

export function QuestionDetailModal({
  question,
  isOpen,
  onClose,
}: Props): JSX.Element | null {
  const { user } = useAuth();

  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);

  /* ---------------- GUARD ---------------- */
  if (!isOpen || !question) return null;

  /* ---------------- LOAD ANSWERS ---------------- */

  useEffect(() => {
    setUpvotes(question.upvotes ?? 0);
    setHasUpvoted(question.hasUpvoted ?? false);
    setIsBookmarked(question.isBookmarked ?? false);

    async function loadReplies() {
      try {
        const answers = await getAnswers(question.id);

        setReplies(
          answers.map((a: any) => ({
            id: a.id,
            content: a.content,
            upvotes: a.upvotes ?? 0,
            author: {
              name: a.userName ?? "Guest",
              initials:
                a.userName?.slice(0, 2).toUpperCase() ?? "GU",
              reputation: 0,
            },
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadReplies();
  }, [question]);

  /* ---------------- ACTIONS ---------------- */

  const handleUpvote = () => {
    setHasUpvoted((v) => !v);
    setUpvotes((v) => (hasUpvoted ? v - 1 : v + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked((v) => !v);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  /* ---------------- REPLY SUBMIT (FIXED) ---------------- */

  const handleReplySubmit = async (content: string) => {
    if (!user) throw new Error("Not authenticated");

    try {
      await createAnswer({
        questionId: question.id,
        content,
        userId: user.uid,
        userName: user.displayName || "Guest",
      });

      if (question.userId !== user.uid) {
        await createNotification({
          userId: question.userId,
          type: "answer",
          title: "New answer to your question",
          message: "Someone replied to your helpdesk question",
          link: `/dashboard/helpdesk/${question.id}`,
        });
      }

      const updated = await getAnswers(question.id);

      setReplies(
        updated.map((a: any) => ({
          id: a.id,
          content: a.content,
          upvotes: a.upvotes ?? 0,
          author: {
            name: a.userName ?? "Guest",
            initials:
              a.userName?.slice(0, 2).toUpperCase() ?? "GU",
            reputation: 0,
          },
        }))
      );

      toast.success("Reply posted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post reply");
      throw err;
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <DialogHeader>
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex gap-2 mb-3">
                  {question.trending && (
                    <Badge className="bg-orange-500 text-white">
                      <TrendingUp className="size-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {question.hot && (
                    <Badge className="bg-red-500 text-white">
                      <Flame className="size-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {question.title}
                </h2>

                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex gap-1">
                    <Clock className="size-4" /> {question.timeAgo}
                  </span>
                  <span className="flex gap-1">
                    <Eye className="size-4" /> {question.views}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleBookmark}>
                  <Bookmark
                    className={isBookmarked ? "fill-yellow-500" : ""}
                  />
                </button>
                <button onClick={handleShare}>
                  <Share2 />
                </button>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="p-6">
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <button onClick={handleUpvote}>
                <ArrowUp
                  className={hasUpvoted ? "fill-blue-600" : ""}
                />
              </button>
              <span className="font-bold">{upvotes}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={question.author.avatar} />
                  <AvatarFallback>
                    {question.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {question.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {question.author.reputation} reputation
                  </p>
                </div>
              </div>

              <p className="mb-4 whitespace-pre-wrap">
                {question.content}
              </p>

              <div className="flex gap-2 flex-wrap">
                {question.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <ReplySection
            replies={replies}
            onReplySubmit={handleReplySubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
