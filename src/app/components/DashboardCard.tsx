import { motion } from "motion/react";
import { Card } from "./ui/card";
import type { ReactNode, ComponentType } from "react";

/* ---------------- TYPES ---------------- */

interface DashboardCardProps {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  delay?: number;
}

/* ---------------- COMPONENT ---------------- */

export function DashboardCard({
  title,
  icon: Icon,
  children,
  delay = 0,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className="bg-card border border-border rounded-lg shadow-none hover:bg-accent/40 transition-colors">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
          <div className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground">
            <Icon className="size-4" />
          </div>

          <h3 className="text-sm font-medium text-foreground tracking-tight">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </Card>
    </motion.div>
  );
}
