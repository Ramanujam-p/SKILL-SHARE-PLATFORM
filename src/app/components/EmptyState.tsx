import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { JSX } from "react";

/* ---------------- TYPES ---------------- */

interface EmptyStateProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

/* ---------------- COMPONENT ---------------- */

export function EmptyState({
  title = "We're finding the right people for you",
  description = "Our smart matching algorithm is working to connect you with peers who share your interests and skills. Try adjusting your filters or check back soon!",
  imageUrl = "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
}: EmptyStateProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-8"
    >
      {/* Animated Illustration */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={imageUrl}
              alt="Finding peers"
              className="w-full h-full object-cover" style={undefined}            />
          </div>

          {/* Floating sparkles */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4"
          >
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            className="absolute -bottom-4 -left-4"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="size-5 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Background gradient orbs */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"
          />
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 mt-8"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
