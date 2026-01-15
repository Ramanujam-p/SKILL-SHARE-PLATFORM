import { useNavigate } from "react-router-dom";
import { JSX, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Navbar } from "../components/navbar";
import { HeroSection } from "../components/hero-section";
import { FeatureCards } from "../components/feature-cards";
import { StatsSection } from "../components/stats-section";
import { CTASection } from "../components/cta-section";
import { Footer } from "../components/footer";

export function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is Skill Share free for students?",
      a: "Yes. Skill Share is completely free and built exclusively for campus collaboration.",
    },
    {
      q: "Who can join Skill Share?",
      a: "Only verified students can join, ensuring a trusted and secure community.",
    },
    {
      q: "Can I join group chats?",
      a: "Yes. You can join and create group chats for projects, study, and discussions.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. We follow industry best practices for authentication and encryption.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <Navbar onLoginClick={() => navigate("/login")} />

      <div className="pt-16 md:pt-20">

        {/* HERO */}
        <HeroSection onGetStarted={() => navigate("/login")} />

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="py-16 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"
        >
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Skill Share
            </h2>

            <p className="text-lg text-gray-700 max-w-3xl mb-8">
              Skill Share is a student collaboration platform that connects learners,
              mentors, and innovators across campus to share skills, solve problems,
              and grow together.
            </p>

            {/* TEAM */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Skill Share Team Members
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Bhuvaneshwar T S",
                  "Nitesh N D",
                  "Ramanujam P",
                  "Yuvasri K",
                ].map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur rounded-xl p-4 text-center
                               shadow-md hover:shadow-xl hover:-translate-y-1
                               transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full
                                    bg-gradient-to-br from-purple-500 to-blue-500
                                    flex items-center justify-center
                                    text-white text-lg font-bold shadow">
                      {member.charAt(0)}
                    </div>

                    <p className="text-gray-800 font-medium text-sm">
                      {member}
                    </p>
                    <p className="text-xs text-gray-500">
                      Skill Share Team
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section
          id="how-it-works"
          className="py-20 px-6 bg-white"
        >
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  desc: "Sign up using your student credentials and build your profile.",
                  gradient: "from-purple-500 to-blue-500",
                },
                {
                  step: "2",
                  title: "Connect with Peers",
                  desc: "Find students with matching skills and interests.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  step: "3",
                  title: "Collaborate & Learn",
                  desc: "Join chats, ask doubts, and build projects together.",
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center
                             hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-full
                                bg-gradient-to-br ${item.gradient}
                                flex items-center justify-center
                                text-white text-xl font-bold`}
                  >
                    {item.step}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= FEATURES LIST ================= */}
        <section id="features" className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Features</h2>
            <ul className="list-disc ml-6 text-lg text-gray-700 space-y-2">
              <li>Skill matching</li>
              <li>Real-time chat</li>
              <li>Group collaboration</li>
              <li>Helpdesk Q&A</li>
              <li>Peer connections</li>
            </ul>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <FeatureCards />

        {/* STATS */}
        <StatsSection />

        {/* ================= FAQ ACCORDION ================= */}
        <section
          id="faq"
          className="py-20 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"
        >
          <div className="max-w-4xl mx-auto">

            <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium text-gray-800">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openFAQ === index ? "rotate-180 text-purple-600" : "text-gray-500"
                      }`}
                    />
                  </button>

                  {openFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= PRIVACY ================= */}
        <section id="privacy" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Privacy Policy</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              Your data is secure and never shared with third parties.
              We follow industry best practices for authentication and encryption.
            </p>
          </div>
        </section>

        {/* CTA */}
        <CTASection onJoinClick={() => navigate("/login")} />

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}
