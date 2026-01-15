import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Settings,
  Bell,
  Target
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "My Peers", icon: Users },
  { name: "Helpdesk", icon: MessageSquare, badge: 3 },
  { name: "Interests", icon: Target },
  { name: "Courses", icon: BookOpen },
  { name: "Calendar", icon: Calendar }
];

const bottomNavItems = [
  { name: "Notifications", icon: Bell, badge: 5 },
  { name: "Settings", icon: Settings }
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">StudentHub</h1>
            <p className="text-xs text-gray-500">Activity Center</p>
          </div>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <motion.button
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>

              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + 0.1 * index,
                    type: "spring"
                  }}
                  className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        {bottomNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <motion.button
              key={item.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + 0.1 * index, duration: 0.3 }}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>

              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.7 + 0.1 * index,
                    type: "spring"
                  }}
                  className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.aside>
  );
}
