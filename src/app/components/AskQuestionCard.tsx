import { motion } from "motion/react";
import { Plus, Lightbulb, Send, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

/* ---------------- TYPES ---------------- */

interface AskQuestionPayload {
  title: string;
  content: string;
  tags: string[];
}

interface AskQuestionCardProps {
  onQuestionSubmit?: (data: AskQuestionPayload) => void;
}

/* ---------------- CONSTANTS ---------------- */

const suggestedTags = [
  "Algorithm",
  "Data Structures",
  "Web Development",
  "Python",
  "JavaScript",
  "React",
  "Database",
  "Machine Learning",
  "CSS",
  "API",
];

/* ---------------- COMPONENT ---------------- */

export function AskQuestionCard({
  onQuestionSubmit,
}: AskQuestionCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (selectedTags.length === 0) {
      toast.error("Select at least one relevant tag.");
      return;
    }

    onQuestionSubmit?.({
      title,
      content,
      tags: selectedTags,
    });

    toast.success("Question submitted successfully.");

    setTitle("");
    setContent("");
    setSelectedTags([]);
    setIsOpen(false);
  };

  return (
    <>
      {/* Entry Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="
          bg-card
          border border-border
          rounded-md
          p-6
          shadow-sm
          hover:shadow-md
          transition-shadow
        "
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="size-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                Ask the Community
              </h2>
            </div>

            <p className="text-sm text-muted-foreground max-w-xl">
              Post your question and get help from peers and mentors across the
              platform.
            </p>

            <div className="mt-3 text-xs text-muted-foreground">
              Contributors available
            </div>
          </div>

          <Button onClick={() => setIsOpen(true)} className="shrink-0">
            <Plus className="size-4 mr-2" />
            Ask Question
          </Button>
        </div>
      </motion.div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="size-5 text-muted-foreground" />
              Ask a Question
            </DialogTitle>
            <DialogDescription>
              Provide a clear title and description to receive better answers.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Title
              </label>
              <Input
                placeholder="How do I implement a binary search tree in Python?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Description
              </label>
              <Textarea
                placeholder="Explain your problem clearly, include context or examples if needed."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tags (up to 5)
              </label>

              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <Badge
                      key={tag}
                      variant={active ? "default" : "outline"}
                      onClick={() => toggleTag(tag)}
                      className="cursor-pointer text-xs font-medium"
                    >
                      {tag}
                      {active && <Check className="size-3 ml-1" />}
                    </Badge>
                  );
                })}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {selectedTags.length} / 5 selected
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="size-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
