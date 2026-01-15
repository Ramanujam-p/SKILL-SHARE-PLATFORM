import { motion, AnimatePresence } from "motion/react";
import { useState, ButtonHTMLAttributes, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth,db } from "../../../lib/firebase";


import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Code,
  Brain,
  Database,
  Palette,
  Globe,
  Calculator,
  Beaker,
  Languages,
  Music,
  Camera,
  Gamepad,
  BookOpen,
  Cpu,
  Smartphone,
  Award,
  GraduationCap,
  Star,
} from "lucide-react";
/* Local Card replacement to avoid missing module import */
type CardProps = { children?: any; className?: string };
function Card({ children, className = "" }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}


/* Minimal local Button replacement to avoid missing module import */
type LocalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "default";
};
function Button({ variant, className = "", ...props }: LocalButtonProps) {
  const base = "inline-flex items-center px-4 py-2 rounded-md text-sm";
  const variantClass =
    variant === "outline"
      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      : "";
  return <button className={`${base} ${variantClass} ${className}`} {...props} />;
}

/* -------------------- TYPES -------------------- */

interface ProfileSetupPageProps {
  onComplete?: () => void;
  onBack?: () => void;
}

type InterestId = string;
type SkillLevelId = string;

/* -------------------- DATA -------------------- */

const interests: {
  id: InterestId;
  label: string;
  icon: React.ElementType;
  gradient: string;
}[] = [
  { id: "web", label: "Web Dev", icon: Globe, gradient: "from-blue-500 to-cyan-500" },
  { id: "ai", label: "AI/ML", icon: Brain, gradient: "from-purple-500 to-pink-500" },
  { id: "dsa", label: "DSA", icon: Code, gradient: "from-green-500 to-emerald-500" },
  { id: "database", label: "Databases", icon: Database, gradient: "from-orange-500 to-red-500" },
  { id: "mobile", label: "Mobile Dev", icon: Smartphone, gradient: "from-indigo-500 to-blue-500" },
  { id: "design", label: "UI/UX", icon: Palette, gradient: "from-pink-500 to-rose-500" },
  { id: "cloud", label: "Cloud", icon: Cpu, gradient: "from-blue-500 to-purple-500" },
  { id: "math", label: "Mathematics", icon: Calculator, gradient: "from-yellow-500 to-orange-500" },
  { id: "physics", label: "Physics", icon: Beaker, gradient: "from-cyan-500 to-blue-500" },
  { id: "languages", label: "Languages", icon: Languages, gradient: "from-green-500 to-teal-500" },
  { id: "music", label: "Music", icon: Music, gradient: "from-purple-500 to-indigo-500" },
  { id: "photography", label: "Photography", icon: Camera, gradient: "from-pink-500 to-purple-500" },
  { id: "gaming", label: "Gaming", icon: Gamepad, gradient: "from-red-500 to-orange-500" },
  { id: "literature", label: "Literature", icon: BookOpen, gradient: "from-amber-500 to-yellow-500" },
];

const skillLevels: {
  id: SkillLevelId;
  label: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}[] = [
  {
    id: "beginner",
    label: "Beginner",
    description: "Just starting out, eager to learn",
    icon: Star,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    description: "Have some experience, ready to grow",
    icon: Award,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Experienced, can guide others",
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-500",
  },
];

/* -------------------- COMPONENT -------------------- */

export function ProfileSetupPage({
  onComplete,
  onBack,
}: ProfileSetupPageProps): JSX.Element {

  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedInterests, setSelectedInterests] = useState<InterestId[]>([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevelId>("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [studentId, setStudentId] = useState("");


  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const toggleInterest = (id: InterestId) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
  if (step < totalSteps) {
    setStep(step + 1);
  } else {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc( db, "users", uid), {
      displayName,
      photoURL,
      college,
      course,
      studentId,
      interests: selectedInterests,
      skillLevel: selectedSkillLevel,
      onboardingCompleted: true,
      verified: true, // later you can auto-verify via domain
    });

    navigate("/dashboard");
  }
};



  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const canProceed =
  step === 1
    ? selectedInterests.length > 0
    : step === 2
    ? selectedSkillLevel !== ""
    : displayName && college && course && studentId;


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-xl opacity-20"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full blur-xl opacity-20"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg text-gray-700">Profile Setup</span>
            </div>
            <span className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </span>
          </div>

          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Card className="p-8 rounded-3xl bg-white/80 shadow-2xl">
              <h2 className="text-3xl mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                What are you interested in?
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);

                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm">{interest.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8 rounded-3xl bg-white/80 shadow-2xl">
              <h2 className="text-3xl mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                What's your skill level?
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {skillLevels.map((level) => {
                  const Icon = level.icon;
                  const isSelected = selectedSkillLevel === level.id;

                  return (
                    <button
                      key={level.id}
                      onClick={() => setSelectedSkillLevel(level.id)}
                      className={`p-6 rounded-3xl border-2 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl">{level.label}</h3>
                          <p className="text-sm text-gray-600">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}
        </AnimatePresence>
        {step === 3 && (
        <Card className="p-8 rounded-3xl bg-white/80 shadow-2xl">
          <h2 className="text-3xl mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Verify your student profile
          </h2>

          <div className="grid gap-4">
          <input
            placeholder="Full Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-3 rounded-xl border"
          />

      <input
        placeholder="Profile Photo URL"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        className="p-3 rounded-xl border"
      />

      <input
        placeholder="College Name"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
        className="p-3 rounded-xl border"
      />

      <input
        placeholder="Course (e.g. B.Tech CSE)"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="p-3 rounded-xl border"
      />

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="p-3 rounded-xl border"
      />
      </div>
      </Card>
      )}


        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="mr-2 w-5 h-5" /> Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={
              canProceed
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "bg-gray-300"
            }
          >
            {step === totalSteps ? "Complete" : "Next"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
