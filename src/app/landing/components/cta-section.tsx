import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import * as React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string };

function ImageWithFallback({ src, alt, fallbackSrc, ...rest }: ImgProps) {
  const [errored, setErrored] = React.useState(false);
  const placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'>Image unavailable</text></svg>";
  const finalSrc = !errored ? (src as string | undefined) : fallbackSrc ?? placeholder;

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

function Button({ size, className = "", children, ...rest }: ButtonProps) {
  const sizeClasses =
    size === "lg" ? "text-lg py-4 px-6" : size === "sm" ? "text-sm py-1 px-3" : "text-base py-2 px-4";
  return (
    <button
      {...rest}
      className={`${sizeClasses} ${className}`.trim()}
    >
      {children}
    </button>
  );
}


export function CTASection({ onJoinClick }) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Students studying together"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">Ready to Connect?</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Your Campus Community Awaits
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Don't learn alone. Join a vibrant community of curious minds, helpful peers, and collaborative spirits.
              Start building meaningful connections today.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Free to join, forever",
                "Verified students only",
                "Instant peer matching",
                "24/7 community support",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={onJoinClick}
              >
                Join Now – It&apos;s Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
