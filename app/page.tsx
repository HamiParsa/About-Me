"use client";

import { useState, useEffect, useEffectEvent } from "react";
import emailjs from "emailjs-com";
import {
  Linkedin,
  Github,
  Send,
  Globe,
  ArrowRightLeft,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiGit,
  DiMongodb,
} from "react-icons/di";
import { TbBrandTailwind } from "react-icons/tb";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
type Lang = "en" | "fa";

type Skill = {
  name: string;
  percent: number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  gradient: string;
};

// ────────────────────────────────────────────────
// Content
// ────────────────────────────────────────────────
const content = {
  en: {
    greeting: "Hey, I'm",
    name: "Hami Parsa",
    age: "20 years old",
    about: `I'm Hami Parsa, 20.\nAbove all, I strive to be a decent human—true to humanity, no ego trips.\nI'm deeply passionate about technology and aim to become the best version of myself in this field.\nCurrently focused on full-stack web development, but my vision is much bigger: become a world-class software engineer, contribute to smarter systems, shine, and take pride in my impact on the world.`,
    connect: "Let's connect",
    status: "Open to work",
    skills: "Skills",
    skillList: [
      {
        name: "JavaScript / TypeScript",
        percent: 88,
        icon: DiJavascript1,
        color: "text-yellow-400",
        gradient: "from-yellow-500 via-yellow-400 to-amber-500",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-500 via-cyan-400 to-blue-500",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-500 via-teal-400 to-emerald-500",
      },
      {
        name: "Python • Django",
        percent: 75,
        icon: DiPython,
        color: "text-green-500",
        gradient: "from-green-600 via-green-500 to-lime-500",
      },
      {
        name: "MongoDB • PostgreSQL",
        percent: 72,
        icon: DiMongodb,
        color: "text-emerald-500",
        gradient: "from-emerald-600 via-emerald-500 to-teal-500",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-600 via-orange-500 to-amber-500",
      },
    ] as Skill[],
    contact: "Get in Touch",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    messageLabel: "Your Message",
    submit: "Send Message",
    success: "Message sent successfully ✓",
    error: "Something went wrong. Please try again.",
  },
  fa: {
    greeting: "سلام، من",
    name: "حامی پارسا",
    age: "۲۰ ساله",
    about: `حامی پارسا هستم، ۲۰ ساله.\nاول از همه دوست دارم انسان باشم؛ پایبند به قانون انسانیت و دور از خودنمایی.\nعاشق دنیای تکنولوژی‌ام و می‌خوام روزی بهترین نسخه خودم رو تو این حوزه بسازم.\nالان روی فول‌استک وب کار می‌کنم، اما هدفم خیلی بزرگ‌تره: مهندس نرم‌افزار درجه‌یک بشم، دنیا رو هوشمندتر کنم، بدرخشم و به وجودم تو این دنیا افتخار کنم.`,
    connect: "بیا باهم در ارتباط باشیم",
    status: "آماده همکاری",
    skills: "مهارت‌ها",
    skillList: [
      {
        name: "JavaScript / TypeScript",
        percent: 88,
        icon: DiJavascript1,
        color: "text-yellow-400",
        gradient: "from-yellow-500 via-yellow-400 to-amber-500",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-500 via-cyan-400 to-blue-500",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-500 via-teal-400 to-emerald-500",
      },
      {
        name: "Python • Django",
        percent: 75,
        icon: DiPython,
        color: "text-green-500",
        gradient: "from-green-600 via-green-500 to-lime-500",
      },
      {
        name: "MongoDB • PostgreSQL",
        percent: 72,
        icon: DiMongodb,
        color: "text-emerald-500",
        gradient: "from-emerald-600 via-emerald-500 to-teal-500",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-600 via-orange-500 to-amber-500",
      },
    ] as Skill[],
    contact: "تماس با من",
    nameLabel: "نام",
    phoneLabel: "شماره تماس",
    messageLabel: "پیام شما",
    submit: "ارسال پیام",
    success: "پیام با موفقیت ارسال شد ✓",
    error: "مشکلی پیش آمد. دوباره امتحان کنید.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  const readLanguage = useEffectEvent(() => {
    const saved = localStorage.getItem("preferredLang") as Lang | null;
    if (saved === "fa") {
      setLang("fa");
    }
  });

  useEffect(() => {
    readLanguage();
  }, []);
  useEffect(() => {
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  const isFa = lang === "fa";
  const t = content[lang];

  const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));

  return (
    <div
      dir={isFa ? "rtl" : "ltr"}
      className={`relative min-h-screen bg-[#0a0a1f] text-gray-100 overflow-hidden ${
        isFa ? 'font-["Vazirmatn"]' : "font-sans"
      }`}
    >
      {/* Background nebula */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f0e1a] via-indigo-950/30 to-[#000000] animate-slow-drift" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_30%,rgba(99,102,241,0.2),transparent_50%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.18),transparent_55%)] animate-pulse-slow" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-3xl font-extrabold bg-linear-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            HP
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            onClick={toggleLang}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-600/40 hover:border-indigo-400/70 text-sm font-medium transition-all duration-300"
          >
            <span>{isFa ? "English" : "فارسی"}</span>
            <ArrowRightLeft
              size={16}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 mb-24">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative shrink-0 group"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-indigo-500/40 shadow-2xl shadow-indigo-950/60 relative">
              <Image
                width={800}
                height={800}
                src="https://yourimageshare.com/ib/GXnJY5bS7c.png"
                alt="Hami Parsa"
                className="w-full h-full object-cover transition-all duration-800 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-800 shadow-[0_0_40px_15px_rgba(99,102,241,0.45)] pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-700/95 to-blue-700/95 text-white text-xs font-semibold px-7 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 backdrop-blur-md border border-indigo-400/40">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              {t.status}
            </div>
          </motion.div>

          {/* Intro + social cards */}
          <div
            className={`flex-1 space-y-12 ${isFa ? "text-right" : "text-left"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="space-y-5"
            >
              <p className="text-2xl md:text-3xl text-indigo-300/80 font-light">
                {t.greeting}
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-linear-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                {t.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-medium">
                {t.age} • Full-Stack Developer
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-lg leading-relaxed text-gray-300 max-w-3xl whitespace-pre-line"
              >
                {t.about}
              </motion.p>
            </AnimatePresence>

            {/* Social cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-10"
            >
              <p className="uppercase tracking-widest text-sm text-indigo-400/70 mb-8 font-medium text-center lg:text-left">
                {t.connect}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    Icon: Linkedin,
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/HamiParsa",
                    baseColor: "from-blue-600/30 to-blue-400/20",
                    hoverColor:
                      "hover:from-blue-600 hover:to-blue-400 hover:shadow-blue-500/50",
                    iconColor: "text-blue-400 group-hover:text-white",
                  },
                  {
                    Icon: Github,
                    name: "GitHub",
                    href: "https://github.com/HamiParsa",
                    baseColor: "from-gray-700/30 to-gray-500/20",
                    hoverColor:
                      "hover:from-gray-800 hover:to-gray-600 hover:shadow-gray-400/50",
                    iconColor: "text-gray-300 group-hover:text-white",
                  },
                  {
                    Icon: Send,
                    name: "Telegram",
                    href: "https://t.me/HeroHami",
                    baseColor: "from-cyan-600/30 to-cyan-400/20",
                    hoverColor:
                      "hover:from-cyan-600 hover:to-cyan-400 hover:shadow-cyan-500/50",
                    iconColor: "text-cyan-400 group-hover:text-white",
                  },
                  {
                    Icon: Globe,
                    name: "Website",
                    href: "https://hamiparsa.github.io/Profile-Bio/",
                    baseColor: "from-emerald-600/30 to-emerald-400/20",
                    hoverColor:
                      "hover:from-emerald-600 hover:to-emerald-400 hover:shadow-emerald-500/50",
                    iconColor: "text-emerald-400 group-hover:text-white",
                  },
                ].map(
                  (
                    { Icon, name, href, baseColor, hoverColor, iconColor },
                    i,
                  ) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.12 }}
                      whileHover={{ scale: 1.08, y: -10 }}
                      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${baseColor} backdrop-blur-xl border border-gray-700/40 hover:border-transparent p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out ${hoverColor} hover:shadow-2xl shadow-lg shadow-black/30`}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[linear-gradient(120deg,transparent_30%,white_50%,transparent_70%)] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
                      <Icon
                        size={52}
                        strokeWidth={1.2}
                        className={`transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${iconColor}`}
                      />
                      <span className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors duration-500">
                        {name}
                      </span>
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-20 lg:pt-28"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            {t.skills}
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.skillList.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -6 }}
                className="group relative bg-linear-to-br from-gray-900/70 to-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-7 shadow-xl hover:shadow-2xl hover:border-gray-500/70 transition-all duration-400"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div
                    className={`p-4 rounded-xl bg-gray-800/70 border border-gray-600/40 ${skill.color} transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-current/30`}
                  >
                    <skill.icon size={44} className="drop-shadow-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {skill.name}
                    </h3>
                    <p className={`text-lg font-bold ${skill.color}`}>
                      {skill.percent}%
                    </p>
                  </div>
                </div>

                <div className="h-4 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/50 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className={`h-full bg-linear-to-r ${skill.gradient} shadow-[0_0_20px] shadow-current/60 transition-all duration-500 group-hover:shadow-[0_0_30px] group-hover:shadow-current/80`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-20 lg:pt-28"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            {t.contact}
          </h2>

          <ContactForm t={t} isFa={isFa} />
        </motion.section>
      </main>

      <footer className="relative z-10 text-center py-16 text-gray-600 text-sm border-t border-indigo-900/30">
        © {new Date().getFullYear()} Hami Parsa • Built with passion & code
      </footer>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes slow-drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(4%, 6%);
          }
        }
        .animate-slow-drift {
          animation: slow-drift 160s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.55;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 26s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// Contact Form with EmailJS + RTL fix
// ────────────────────────────────────────────────
type FormData = {
  name: string;
  number: string;
  message: string;
};

function ContactForm({
  t,
  isFa,
}: {
  t: (typeof content)["en"];
  isFa: boolean;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    number: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await emailjs.send(
        "service_97usflj",
        "template_m9immuc",
        form,
        "q1s3x3DSUxpAVErUh",
      );
      setStatus("success");
      setForm({ name: "", number: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-7">
      {/* Name */}
      <div className="relative">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.nameLabel}
        </label>
        <div className="relative">
          <User
            className={`absolute ${isFa ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-indigo-400/80`}
            size={20}
          />
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/70 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
            placeholder={t.nameLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="relative">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.phoneLabel}
        </label>
        <div className="relative">
          <Phone
            className={`absolute ${isFa ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-indigo-400/80`}
            size={20}
          />
          <input
            name="number"
            type="tel"
            value={form.number}
            onChange={handleChange}
            required
            className={`w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/70 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
            placeholder={t.phoneLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      {/* Message */}
      <div className="relative">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.messageLabel}
        </label>
        <div className="relative">
          <MessageSquare
            className={`absolute ${isFa ? "right-4" : "left-4"} top-4 text-indigo-400/80`}
            size={20}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className={`w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/70 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 resize-none`}
            placeholder={t.messageLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 bg-linear-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:via-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-2xl shadow-indigo-950/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            {isFa ? "در حال ارسال..." : "Sending..."}
          </>
        ) : (
          t.submit
        )}
      </motion.button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-center text-green-400 font-medium text-lg mt-4 flex items-center justify-center gap-2 ${isFa ? "flex-row-reverse" : ""}`}
          >
            <span>✓</span> {t.success}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-center text-red-400 font-medium text-lg mt-4 flex items-center justify-center gap-2 ${isFa ? "flex-row-reverse" : ""}`}
          >
            <span>✗</span> {t.error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
