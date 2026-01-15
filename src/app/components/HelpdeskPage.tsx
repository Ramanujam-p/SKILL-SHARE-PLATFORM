import { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AskQuestionCard } from "./AskQuestionCard";
import { QuestionCard } from "./QuestionCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  MessageCircle,
  TrendingUp,
  Clock,
  Flame,
  Sparkles,
} from "lucide-react";
import { timeAgo } from "../../lib/time";

import { createQuestion, getQuestions } from "../lib/firestore";
import { useAuth } from "../../hooks/useAuth";

/* ---------------- TYPES ---------------- */

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  userName: string;
  createdAt?: any;
  upvotes: number;
  views: number;
  timeAgo: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
    reputation?: number;
  };
}


/* ---------------- COMPONENT ---------------- */

export function HelpdeskPage(): JSX.Element {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD QUESTIONS ---------------- */

 async function loadQuestions() {
  setLoading(true);

  const data = await getQuestions();

const normalized = (data as any[]).map((q) => ({
  id: q.id,
  title: q.title,
  content: q.content ?? "",
  tags: q.tags ?? [],
  userId: q.userId,
  userName: q.userName ?? "Guest",
  createdAt: q.createdAt,
  upvotes: q.upvotes ?? 0,
  views: q.views ?? 0,
  repliesCount: q.repliesCount ?? 0,   // ✅ FIX
  timeAgo: timeAgo(q.createdAt),
  author: {
    name: q.userName ?? "Guest",
  },
}));


  setQuestions(normalized);
  setLoading(false);
}

  useEffect(() => {
    loadQuestions();
  }, []);

  /* ---------------- CREATE QUESTION ---------------- */

  const handleQuestionSubmit = async ({
    title,
    content,
    tags,
  }: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    if (!user) return;

    await createQuestion({
      title,
      content,
      tags,
      userId: user.uid,
      userName: user.displayName || "Guest",
    });

    await loadQuestions();
  };

  /* ---------------- FILTERS ---------------- */

  const filters = [
    { id: "all", label: "All Questions", icon: <MessageCircle className="size-4" /> },
    { id: "trending", label: "Trending", icon: <TrendingUp className="size-4" /> },
    { id: "recent", label: "Recent", icon: <Clock className="size-4" /> },
    { id: "unanswered", label: "Unanswered", icon: <Flame className="size-4" /> },
  ];

  const filteredQuestions = questions.filter((q) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "unanswered") return q.upvotes === 0;
    return true;
  });

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="size-8 text-orange-600" />
            <h1 className="text-3xl font-bold">Student Helpdesk</h1>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <Sparkles className="size-3 mr-1" />
              Community Support
            </Badge>
          </div>
          <p className="text-gray-600">
            Ask questions, share knowledge, and help fellow students.
          </p>
        </motion.div>

        {/* Ask Question */}
        <div className="mb-8">
          <AskQuestionCard onQuestionSubmit={handleQuestionSubmit} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.id)}
              className={
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : ""
              }
            >
              {filter.icon}
              <span className="ml-2">{filter.label}</span>
            </Button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {loading && <p className="text-sm text-gray-500">Loading questions…</p>}

          <AnimatePresence>
            {filteredQuestions.map((q, i) => (
              <div
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleQuestionClick(q);
                }}
              >
                <QuestionCard
                  question={q}
                  delay={i * 0.05}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
     
    </div>
  );
}

function setIsModalOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
function setSelectedQuestion(question: Question) {
  throw new Error("Function not implemented.");
}

