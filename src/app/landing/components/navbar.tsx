import { motion } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

/* Simple Button component (local, no path issues) */
export const Button = ({
  children,
  className = "",
  variant,
  ...props
}: any) => {
  const base = "px-4 py-2 rounded-lg font-medium transition";
  const variantClass =
    variant === "ghost"
      ? "bg-transparent"
      : variant === "outline"
      ? "bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50"
      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700";

  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              SkillShare
            </span>
          </motion.div>

          {/* RIGHT ACTIONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-700"
              onClick={onLoginClick}
            >
              Login
            </Button>

            <Button onClick={onLoginClick}>
              Get Started
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-3 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                onLoginClick?.();
              }}
            >
              Login
            </Button>

            <Button
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                onLoginClick?.();
              }}
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
