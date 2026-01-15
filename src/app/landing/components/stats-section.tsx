import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Users, Zap, MessageCircle, TrendingUp } from "lucide-react";

/* -------------------- STAT COUNTER -------------------- */

function StatCounter({ target, suffix = "", duration = 2 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target, duration]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

/* -------------------- DATA -------------------- */

const stats = [
  {
    icon: Users,
    value: 2847,
    suffix: "+",
    label: "Students Joined",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    icon: Zap,
    value: 15420,
    suffix: "+",
    label: "Skills Shared",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    value: 8932,
    suffix: "+",
    label: "Doubts Solved",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Success Rate",
    gradient: "from-green-500 to-emerald-500",
  },
];

/* -------------------- COMPONENT -------------------- */

export function StatsSection() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 relative overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsInView(true)}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Making an Impact
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of students already transforming their campus experience
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 mx-auto`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Value */}
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl text-white mb-2">
                      {isInView && (
                        <StatCounter
                          target={stat.value}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      )}
                    </div>
                    <p className="text-white/80 text-sm md:text-base">
                      {stat.label}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
