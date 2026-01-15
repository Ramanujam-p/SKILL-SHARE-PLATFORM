import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageSquare, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

/* ---------------- TYPES ---------------- */

interface HelpdeskQuestion {
  id: string;
  title: string;
  userName: string;
  userAvatar?: string;
  repliesCount?: number;
  trending?: boolean;
}

/* ---------------- COMPONENT ---------------- */

export function ActiveHelpdesk() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<HelpdeskQuestion[]>([]);

  /* ---------------- LOAD QUESTIONS ---------------- */

  useEffect(() => {
    async function loadQuestions() {
      const q = query(
        collection(db, "questions"),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const snap = await getDocs(q);

      const data: HelpdeskQuestion[] = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          userName: d.userName || "Anonymous",
          userAvatar: d.userAvatar || "",
          repliesCount: d.repliesCount || 0,
          trending: (d.upvotes || 0) > 5,
        };
      });

      setQuestions(data);
    }

    loadQuestions();
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.25 }}
          
        onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)}

          
          className="
            cursor-pointer
            rounded-md
            border border-border
            bg-card
            px-4 py-3
            hover:bg-muted/50
            hover:border-foreground/20
            transition-colors
            group
          "
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Avatar className="size-8 border border-border">
              <AvatarImage
                src={question.userAvatar}
                alt={question.userName}
              />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                {question.userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p
                  className="
                    text-sm
                    font-medium
                    text-foreground
                    line-clamp-2
                  "
                >
                  {question.title}
                </p>

                {question.trending && (
                  <TrendingUp className="size-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{question.userName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3" />
                  {question.repliesCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Footer action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/helpdesk")}
          className="
            w-full
            text-sm
            text-muted-foreground
            hover:text-foreground
            hover:bg-muted
            justify-start
          "
        >
          <MessageSquare className="size-4 mr-2" />
          View all helpdesk questions
        </Button>
      </motion.div>
    </div>
  );
}
