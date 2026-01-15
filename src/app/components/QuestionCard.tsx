import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  ArrowUp,
  MessageCircle,
  Eye,
  Clock,
  TrendingUp,
  Flame,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upvoteQuestion } from "../lib/firestore";

/* ---------------- COMPONENT ---------------- */

export function QuestionCard({ question, delay = 0 }) {
  const navigate = useNavigate();

  const [upvotes, setUpvotes] = useState(question.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(question.hasUpvoted || false);
  const [isBookmarked, setIsBookmarked] = useState(
    question.isBookmarked || false
  );

  /* ---------------- HANDLERS ---------------- */
const handleUpvote = async (e) => {
  e.stopPropagation();

  if (!hasUpvoted) {
    await upvoteQuestion(question.id);
    setUpvotes(v => v + 1);
    setHasUpvoted(true);
  }
};

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked((v) => !v);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/dashboard/helpdesk/${question.id}`)}
      className="
        bg-white
        rounded-xl
        border border-gray-200
        p-6
        shadow-sm
        hover:shadow-md
        transition-shadow
        cursor-pointer
        group
      "
    >
      <div className="flex gap-4">
        {/* Upvote */}
        <div className="flex flex-col items-center gap-2">
          <motion.button
            onClick={handleUpvote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              hasUpvoted
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
          >
            <ArrowUp
              className={`size-5 ${hasUpvoted ? "fill-blue-600" : ""}`}
            />
          </motion.button>

          <span
            className={`font-bold text-sm ${
              hasUpvoted ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {upvotes}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={question.author.avatar} />
                <AvatarFallback>
                  {question.author.initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">
                  {question.author.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="size-3" />
                  {question.timeAgo}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
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
          </div>

          {/* Title */}
          <h3 className="font-bold mb-2 group-hover:text-blue-600">
            {question.title}
          </h3>

          {/* Preview */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {question.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex gap-4">
             <span className="flex items-center gap-1">
  <MessageCircle className="size-4" />
  {question.repliesCount ?? 0}
</span>

              <span className="flex items-center gap-1">
                <Eye className="size-4" />
                {question.views}
              </span>
            </div>

            <motion.button
              onClick={handleBookmark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg ${
                isBookmarked
                  ? "bg-yellow-100 text-yellow-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <Bookmark
                className={`size-4 ${
                  isBookmarked ? "fill-yellow-600" : ""
                }`}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
