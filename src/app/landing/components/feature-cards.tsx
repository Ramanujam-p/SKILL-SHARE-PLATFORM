import { motion } from "motion/react";
import {
  Users,
  Lightbulb,
  MessageCircle,
  Target,
  Rocket,
  Heart,
} from "lucide-react";
import React from "react";

/**
 * Minimal Card replacement to avoid unresolved module errors.
 * Keeps the same API surface used in this file (className, children, other div props).
 */
export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: "Skill-Based Matching",
    description:
      "Find study partners and collaborators who complement your skills and share your interests.",
    gradient: "from-purple-500 to-blue-500",
    bgGradient: "from-purple-50 to-blue-50",
  },
  {
    icon: MessageCircle,
    title: "Peer Helpdesk",
    description:
      "Get instant help from fellow students. Ask questions, share knowledge, solve problems together.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Heart,
    title: "Campus-Only Community",
    description:
      "A safe, trusted space exclusively for your campus. Connect with verified students only.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
  },
  {
    icon: Target,
    title: "Smart Recommendations",
    description:
      "AI-powered suggestions to connect you with the right people at the right time.",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Sharing",
    description:
      "Share resources, notes, and insights. Build a collaborative learning ecosystem.",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    icon: Rocket,
    title: "Project Collaboration",
    description:
      "Team up for hackathons, assignments, and passion projects. Make things happen together.",
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
  },
];

export function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Everything You Need to Thrive
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make campus collaboration effortless
            and enjoyable
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`p-6 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group`}
                >
                  {/* Background circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md`}
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Text */}
                    <h3 className="text-xl mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
