// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Settings, LogOut, User } from "lucide-react";
// import type { JSX } from "react";

// /* ---------------- TYPES ---------------- */

// export interface ProfileMenuProps {
//   onSettings: () => void;
//   onLogout: () => void;
// }

// /* ---------------- COMPONENT ---------------- */

// export function ProfileMenu({
//   onSettings,
//   onLogout,
// }: ProfileMenuProps): JSX.Element {
//   const [open, setOpen] = useState<boolean>(false);
//   const ref = useRef<HTMLDivElement | null>(null);

//   /* Close on outside click */
//   useEffect(() => {
//     function handleClick(event: MouseEvent): void {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       {/* Avatar Button */}
//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className="
//           w-9 h-9 rounded-full
//           bg-gray-100 hover:bg-gray-200
//           border border-gray-300
//           flex items-center justify-center
//           transition
//         "
//         aria-haspopup="menu"
//         aria-expanded={open}
//       >
//         <User className="w-5 h-5 text-gray-700" />
//       </button>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 8 }}
//             transition={{ duration: 0.15 }}
//             className="
//               absolute right-0 mt-2 w-48
//               bg-white rounded-xl
//               border border-gray-200
//               shadow-lg overflow-hidden
//               z-50
//             "
//           >
//             <button
//               type="button"
//               onClick={onSettings}
//               className="
//                 w-full px-4 py-3 text-sm
//                 flex items-center gap-3
//                 hover:bg-gray-50 transition
//               "
//             >
//               <Settings className="w-4 h-4 text-gray-600" />
//               Settings
//             </button>

//             <div className="h-px bg-gray-200" />

//             <button
//               type="button"
//               onClick={onLogout}
//               className="
//                 w-full px-4 py-3 text-sm
//                 flex items-center gap-3
//                 text-red-600
//                 hover:bg-red-50 transition
//               "
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";

interface ProfileMenuProps {
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export function ProfileMenu({
  onProfile,
  onSettings,
  onLogout,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* Close menu on outside click */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* PROFILE ICON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <User className="size-5 text-gray-700" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onProfile();
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <User className="size-4" />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onSettings();
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Settings className="size-4" />
            Settings
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
