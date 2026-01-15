// // // // import { motion } from "motion/react";
// // // // import { Mail, Github, Twitter, Heart, Sparkles } from "lucide-react";

// // // // export function Footer() {
// // // //   const currentYear = new Date().getFullYear();

// // // //   return (
// // // //     <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16 relative overflow-hidden">
// // // //       {/* Background decoration */}
// // // //       <div className="absolute inset-0 opacity-5">
// // // //         <div className="absolute inset-0" style={{
// // // //           backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
// // // //           backgroundSize: '40px 40px',
// // // //         }} />
// // // //       </div>

// // // //       <div className="container mx-auto px-4 relative z-10">
// // // //         <div className="grid md:grid-cols-4 gap-12 mb-12">
// // // //           {/* Brand section */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             className="md:col-span-2"
// // // //           >
// // // //             <div className="flex items-center gap-2 mb-4">
// // // //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
// // // //                 <Sparkles className="w-6 h-6 text-white" />
// // // //               </div>
// // // //               <h3 className="text-2xl">Skill Share</h3>
// // // //             </div>
// // // //             <p className="text-gray-300 mb-6 max-w-md">
// // // //               Connecting students, sharing knowledge, and building a collaborative campus community.
// // // //               Your journey to better learning starts here.
// // // //             </p>
// // // //             <div className="flex items-center gap-2 text-sm text-gray-400">
// // // //               <Heart className="w-4 h-4 text-pink-500" />
// // // //               <span>Built with love for students, by students</span>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Quick Links */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             transition={{ delay: 0.1 }}
// // // //           >
// // // //             <h4 className="mb-4">Quick Links</h4>
// // // //             <ul className="space-y-3">
// // // //               {["About Us", "How It Works", "Features", "FAQ", "Privacy Policy"].map((link, index) => (
// // // //                 <li key={index}>
// // // //                   <motion.a
// // // //                     href="#"
// // // //                     className="text-gray-300 hover:text-white transition-colors inline-block"
// // // //                     whileHover={{ x: 5 }}
// // // //                   >
// // // //                     {link}
// // // //                   </motion.a>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </motion.div>

// // // //           {/* Contact */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             transition={{ delay: 0.2 }}
// // // //           >
// // // //             <h4 className="mb-4">Connect</h4>
// // // //             <ul className="space-y-3">
// // // //               <li>
// // // //                 <a href="mailto:skillshareweb2026@gmail.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
// // // //                   <Mail className="w-4 h-4" />
// // // //                   <span>skillshareweb2026@gmail.com</span>
// // // //                 </a>
// // // //               </li>
// // // //               <li>
// // // //                 <div className="flex gap-4 mt-4">
// // // //                   <motion.a
// // // //                     href="#"
// // // //                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// // // //                     whileHover={{ scale: 1.1, rotate: 5 }}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                   >
// // // //                     <Twitter className="w-5 h-5" />
// // // //                   </motion.a>
// // // //                   <motion.a
// // // //                     href="#"
// // // //                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// // // //                     whileHover={{ scale: 1.1, rotate: -5 }}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                   >
// // // //                     <Github className="w-5 h-5" />
// // // //                   </motion.a>
// // // //                 </div>
// // // //               </li>
// // // //             </ul>
// // // //           </motion.div>
// // // //         </div>

// // // //         {/* Bottom bar */}
// // // //         <motion.div
// // // //           className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
// // // //           initial={{ opacity: 0 }}
// // // //           whileInView={{ opacity: 1 }}
// // // //           viewport={{ once: true }}
// // // //           transition={{ delay: 0.3 }}
// // // //         >
// // // //           <p className="text-gray-400 text-sm">
// // // //             © {currentYear} Skill Share. All rights reserved.
// // // //           </p>
// // // //           <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
// // // //             <Sparkles className="w-4 h-4 text-purple-400" />
// // // //             <span className="text-sm text-purple-300">Hackathon Project 2026</span>
// // // //           </div>
// // // //         </motion.div>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // }
// // // import { motion } from "motion/react";
// // // import { Mail, Github, Twitter, Heart, Sparkles } from "lucide-react";

// // // export function Footer() {
// // //   const currentYear = new Date().getFullYear();

// // //   const scrollTo = (id: string) => {
// // //     const el = document.getElementById(id);
// // //     if (el) {
// // //       el.scrollIntoView({ behavior: "smooth" });
// // //     }
// // //   };

// // //   return (
// // //     <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16 relative overflow-hidden">

// // //       {/* Background decoration */}
// // //       <div className="absolute inset-0 opacity-5">
// // //         <div
// // //           className="absolute inset-0"
// // //           style={{
// // //             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
// // //             backgroundSize: "40px 40px",
// // //           }}
// // //         />
// // //       </div>

// // //       <div className="container mx-auto px-4 relative z-10">
// // //         <div className="grid md:grid-cols-4 gap-12 mb-12">

// // //           {/* Brand section */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             className="md:col-span-2"
// // //           >
// // //             <div className="flex items-center gap-2 mb-4">
// // //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
// // //                 <Sparkles className="w-6 h-6 text-white" />
// // //               </div>
// // //               <h3 className="text-2xl">Skill Share</h3>
// // //             </div>

// // //             <p className="text-gray-300 mb-6 max-w-md">
// // //               Connecting students, sharing knowledge, and building a collaborative campus community.
// // //               Your journey to better learning starts here.
// // //             </p>

// // //             <div className="flex items-center gap-2 text-sm text-gray-400">
// // //               <Heart className="w-4 h-4 text-pink-500" />
// // //               <span>Built with love for students, by students</span>
// // //             </div>
// // //           </motion.div>

// // //           {/* Quick Links */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ delay: 0.1 }}
// // //           >
// // //             <h4 className="mb-4">Quick Links</h4>
// // //             <ul className="space-y-3">
// // //               <li>
// // //                 <button onClick={() => scrollTo("about")} className="text-gray-300 hover:text-white transition">
// // //                   About Us
// // //                 </button>
// // //               </li>
// // //               <li>
// // //                 <button onClick={() => scrollTo("how-it-works")} className="text-gray-300 hover:text-white transition">
// // //                   How It Works
// // //                 </button>
// // //               </li>
// // //               <li>
// // //                 <button onClick={() => scrollTo("features")} className="text-gray-300 hover:text-white transition">
// // //                   Features
// // //                 </button>
// // //               </li>
// // //               <li>
// // //                 <button onClick={() => scrollTo("faq")} className="text-gray-300 hover:text-white transition">
// // //                   FAQ
// // //                 </button>
// // //               </li>
// // //               <li>
// // //                 <button onClick={() => scrollTo("privacy")} className="text-gray-300 hover:text-white transition">
// // //                   Privacy Policy
// // //                 </button>
// // //               </li>
// // //             </ul>
// // //           </motion.div>

// // //           {/* Contact */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ delay: 0.2 }}
// // //           >
// // //             <h4 className="mb-4">Connect</h4>
// // //             <ul className="space-y-3">
// // //               <li>
// // //                 <a
// // //                   href="mailto:skillshareweb2026@gmail.com"
// // //                   className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
// // //                 >
// // //                   <Mail className="w-4 h-4" />
// // //                   <span>skillshareweb2026@gmail.com</span>
// // //                 </a>
// // //               </li>
// // //               <li>
// // //                 <div className="flex gap-4 mt-4">
// // //                   <motion.a
// // //                     href="#"
// // //                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// // //                   >
// // //                     <Twitter className="w-5 h-5" />
// // //                   </motion.a>

// // //                   <motion.a
// // //                     href="#"
// // //                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// // //                   >
// // //                     <Github className="w-5 h-5" />
// // //                   </motion.a>
// // //                 </div>
// // //               </li>
// // //             </ul>
// // //           </motion.div>
// // //         </div>

// // //         {/* Bottom bar */}
// // //         <motion.div
// // //           className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
// // //           initial={{ opacity: 0 }}
// // //           whileInView={{ opacity: 1 }}
// // //           viewport={{ once: true }}
// // //           transition={{ delay: 0.3 }}
// // //         >
// // //           <p className="text-gray-400 text-sm">
// // //             © {currentYear} Skill Share. All rights reserved.
// // //           </p>

// // //           <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
// // //             <Sparkles className="w-4 h-4 text-purple-400" />
// // //             <span className="text-sm text-purple-300">Hackathon Project 2026</span>
// // //           </div>
// // //         </motion.div>
// // //       </div>
// // //     </footer>
// // //   );
// // // }
// // import { motion } from "motion/react";
// // import { Mail, Github, Twitter, Heart, Sparkles, X } from "lucide-react";
// // import { useState } from "react";

// // export function Footer() {
// //   const currentYear = new Date().getFullYear();
// //   const [openForm, setOpenForm] = useState(false);

// //   const scrollTo = (id: string) => {
// //     const el = document.getElementById(id);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth" });
// //     }
// //   };

// //   return (
// //     <>
// //       <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16 relative overflow-hidden">

// //         {/* Background decoration */}
// //         <div className="absolute inset-0 opacity-5">
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
// //               backgroundSize: "40px 40px",
// //             }}
// //           />
// //         </div>

// //         <div className="container mx-auto px-4 relative z-10">
// //           <div className="grid md:grid-cols-4 gap-12 mb-12">

// //             {/* Brand */}
// //             <motion.div className="md:col-span-2">
// //               <div className="flex items-center gap-2 mb-4">
// //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
// //                   <Sparkles className="w-6 h-6 text-white" />
// //                 </div>
// //                 <h3 className="text-2xl">Skill Share</h3>
// //               </div>

// //               <p className="text-gray-300 mb-6 max-w-md">
// //                 Connecting students, sharing knowledge, and building a collaborative campus community.
// //               </p>

// //               <div className="flex items-center gap-2 text-sm text-gray-400">
// //                 <Heart className="w-4 h-4 text-pink-500" />
// //                 <span>Built with love for students, by students</span>
// //               </div>
// //             </motion.div>

// //             {/* Quick Links */}
// //             <motion.div>
// //               <h4 className="mb-4">Quick Links</h4>
// //               <ul className="space-y-3">
// //                 <li><button onClick={() => scrollTo("about")} className="hover:text-white">About Us</button></li>
// //                 <li><button onClick={() => scrollTo("how-it-works")} className="hover:text-white">How It Works</button></li>
// //                 <li><button onClick={() => scrollTo("features")} className="hover:text-white">Features</button></li>
// //                 <li><button onClick={() => scrollTo("faq")} className="hover:text-white">FAQ</button></li>
// //                 <li><button onClick={() => scrollTo("privacy")} className="hover:text-white">Privacy Policy</button></li>
// //               </ul>
// //             </motion.div>

// //             {/* Contact */}
// //             <motion.div>
// //               <h4 className="mb-4">Connect</h4>
// //               <ul className="space-y-3">
// //                 <li>
// //                   <button
// //                     onClick={() => setOpenForm(true)}
// //                     className="flex items-center gap-2 text-gray-300 hover:text-white"
// //                   >
// //                     <Mail className="w-4 h-4" />
// //                     Contact Us
// //                   </button>
// //                 </li>

// //                 <li>
// //                   <div className="flex gap-4 mt-4">
// //                     <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
// //                       <Twitter className="w-5 h-5" />
// //                     </a>
// //                     <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
// //                       <Github className="w-5 h-5" />
// //                     </a>
// //                   </div>
// //                 </li>
// //               </ul>
// //             </motion.div>
// //           </div>

// //           {/* Bottom bar */}
// //           <div className="pt-8 border-t border-white/10 flex justify-between items-center">
// //             <p className="text-gray-400 text-sm">
// //               © {currentYear} Skill Share. All rights reserved.
// //             </p>

// //             <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
// //               <Sparkles className="w-4 h-4 text-purple-400" />
// //               <span className="text-sm text-purple-300">Hackathon Project 2026</span>
// //             </div>
// //           </div>
// //         </div>
// //       </footer>

// //       {/* ================= GOOGLE FORM MODAL ================= */}
// //       {openForm && (
// //         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
// //           <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] relative overflow-hidden">

// //             <button
// //               onClick={() => setOpenForm(false)}
// //               className="absolute top-4 right-4 z-10 bg-gray-100 rounded-full p-2"
// //             >
// //               <X />
// //             </button>

// //             <iframe
// //               src="https://docs.google.com/forms/d/e/1FAIpQLScj6m7G0Jsz8HDBld0lHB6aqjuo9t2PouDbYkjbqF2rvrz4_Q/viewform?embedded=true"
// //               className="w-full h-full border-0"
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }
// import { motion } from "motion/react";
// import { Mail, Github, Twitter, Heart, Sparkles } from "lucide-react";

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   const scrollTo = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16 relative overflow-hidden">

//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid md:grid-cols-4 gap-12 mb-12">

//           {/* Brand section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="md:col-span-2"
//           >
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
//                 <Sparkles className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-2xl">Skill Share</h3>
//             </div>

//             <p className="text-gray-300 mb-6 max-w-md">
//               Connecting students, sharing knowledge, and building a collaborative campus community.
//               Your journey to better learning starts here.
//             </p>

//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <Heart className="w-4 h-4 text-pink-500" />
//               <span>Built with love for students, by students</span>
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//           >
//             <h4 className="mb-4">Quick Links</h4>
//             <ul className="space-y-3">
//               <li>
//                 <button onClick={() => scrollTo("about")} className="text-gray-300 hover:text-white transition">
//                   About Us
//                 </button>
//               </li>
//               <li>
//                 <button onClick={() => scrollTo("how-it-works")} className="text-gray-300 hover:text-white transition">
//                   How It Works
//                 </button>
//               </li>
//               <li>
//                 <button onClick={() => scrollTo("features")} className="text-gray-300 hover:text-white transition">
//                   Features
//                 </button>
//               </li>
//               <li>
//                 <button onClick={() => scrollTo("faq")} className="text-gray-300 hover:text-white transition">
//                   FAQ
//                 </button>
//               </li>
//               <li>
//                 <button onClick={() => scrollTo("privacy")} className="text-gray-300 hover:text-white transition">
//                   Privacy Policy
//                 </button>
//               </li>
//             </ul>
//           </motion.div>

//           {/* ================= CONNECT SECTION ================= */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//           >
//             <h4 className="mb-4">Connect</h4>
//             <ul className="space-y-3">

//               {/* Email */}
//               <li>
//                 <a
//                   href="mailto:skillshareweb2026@gmail.com"
//                   className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
//                 >
//                   <Mail className="w-4 h-4" />
//                   <span>skillshareweb2026@gmail.com</span>
//                 </a>
//               </li>

//               {/* Social icons */}
//               <li>
//                 <div className="flex gap-4 mt-4">
//                   <motion.a
//                     href="#"
//                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <Twitter className="w-5 h-5" />
//                   </motion.a>

//                   <motion.a
//                     href="#"
//                     className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <Github className="w-5 h-5" />
//                   </motion.a>
//                 </div>
//               </li>

//             </ul>
//           </motion.div>
//         </div>

//         {/* Bottom bar */}
//         <motion.div
//           className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3 }}
//         >
//           <p className="text-gray-400 text-sm">
//             © {currentYear} Skill Share. All rights reserved.
//           </p>

//           <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
//             <Sparkles className="w-4 h-4 text-purple-400" />
//             <span className="text-sm text-purple-300">Hackathon Project 2026</span>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }
import { motion } from "motion/react";
import { Mail, Github, Twitter, Heart, Sparkles, X, MessageSquare } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showForm, setShowForm] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <motion.div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl">Skill Share</h3>
              </div>

              <p className="text-gray-300 mb-6 max-w-md">
                Connecting students, sharing knowledge, and building a collaborative campus community.
                Your journey to better learning starts here.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Built with love for students, by students</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollTo("about")} className="text-gray-300 hover:text-white">About Us</button></li>
                <li><button onClick={() => scrollTo("how-it-works")} className="text-gray-300 hover:text-white">How It Works</button></li>
                <li><button onClick={() => scrollTo("features")} className="text-gray-300 hover:text-white">Features</button></li>
                <li><button onClick={() => scrollTo("faq")} className="text-gray-300 hover:text-white">FAQ</button></li>
                <li><button onClick={() => scrollTo("privacy")} className="text-gray-300 hover:text-white">Privacy Policy</button></li>
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div>
              <h4 className="mb-4">Connect</h4>
              <ul className="space-y-4">

                {/* Email Display */}
                <li className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>skillshareweb2026@gmail.com</span>
                </li>

                {/* Contact Form Button */}
                <li>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contact Form
                  </button>
                </li>

                {/* Social Icons */}
                <li>
                  <div className="flex gap-4 mt-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                  </div>
                </li>

              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Skill Share. All rights reserved.
            </p>

            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Hackathon Project 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= GOOGLE FORM POPUP ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">

          <div className="bg-white rounded-xl w-full max-w-4xl h-[85vh] relative overflow-hidden shadow-2xl">

            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Google Form */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScj6m7G0Jsz8HDBld0lHB6aqjuo9t2PouDbYkjbqF2rvrz4_Q/viewform?embedded=true"
              className="w-full h-full border-0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}
    </>
  );
}
