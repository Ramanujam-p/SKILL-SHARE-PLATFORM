import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import {
  Chrome,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Users,
} from "lucide-react";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import type { JSX } from "react";

interface LoginPageProps {
  onBack?: () => void;
}

export function LoginPage({ onBack }: LoginPageProps): JSX.Element {
  const navigate = useNavigate();

  // ✅ REAL FIREBASE AUTH
  const { signInWithGoogle, signInAnon, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

        {/* LEFT */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Campus"
            className="rounded-3xl shadow-xl" style={undefined}          />

          <h2 className="text-4xl mt-6 font-bold text-purple-600">
            Welcome Back!
          </h2>

          <p className="mt-2 text-gray-600">
            Collaborate, learn, and grow with your campus community.
          </p>

          {[ShieldCheck, Users, Sparkles].map((Icon, i) => (
            <div key={i} className="flex items-center gap-3 mt-4">
              <Icon className="text-purple-600" />
              <span>
                {["Secure & Private", "Verified Students", "Skill Matching"][i]}
              </span>
            </div>
          ))}
        </motion.div>

        {/* RIGHT */}
        <Card className="p-8 rounded-3xl shadow-2xl bg-white">
          <div className="text-center mb-8">
            <Lock className="mx-auto mb-3 text-purple-600" />
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500">Choose how do you want to continue</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error.message}
            </div>
          )}

          {/* GOOGLE */}
          <Button
            disabled={loading}
            variant="outline"
            className="w-full h-14"
           onClick={async () => {
           const res = await signInWithGoogle();

            if (!res.success || !res.user) return;

            if (res.user.isNewUser || !res.user.emailVerified) {
              navigate("/onboarding");
            } else {
              navigate("/dashboard");
          }
          }}>
            <Chrome className="mr-3" />
            Continue with Google
          </Button>

          <div className="text-center my-4 text-gray-400">or</div>

          {/* GUEST */}
          <Button
            disabled={loading}
            className="w-full h-14 bg-gray-900 text-white hover:bg-black"
            onClick={async () => {
              const res = await signInAnon();
              navigate("/onboarding");

            }}
          >
            Continue as Guest
            <ArrowRight className="ml-auto" />
          </Button>

          <p className="text-xs text-center mt-6 text-gray-400">
            Your data is encrypted and never shared.
          </p>
        </Card>
      </div>
    </div>
  );
}
