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
  Instagram,
  Code2,
  Sparkles,
  Zap,
} from "lucide-react";
import { DiJavascript1, DiReact, DiGit } from "react-icons/di";
import { TbBrandTailwind } from "react-icons/tb";
import { RiSupabaseLine } from "react-icons/ri";
import { BiLogoMongodb } from "react-icons/bi";
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { SiDjango } from "react-icons/si";
import { SiSqlite } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";

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
        gradient: "from-yellow-400 via-amber-400 to-yellow-600",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-400 via-sky-400 to-blue-500",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-400 via-cyan-400 to-sky-500",
      },
      {
        name: "SupaBase",
        percent: 72,
        icon: RiSupabaseLine,
        color: "text-emerald-400",
        gradient: "from-emerald-400 via-green-500 to-teal-500",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-500 via-red-500 to-rose-600",
      },
      {
        name: "MongoDB",
        percent: 85,
        icon: BiLogoMongodb,
        color: "text-green-500",
        gradient: "from-green-500 via-emerald-500 to-lime-500",
      },
      {
        name: "Node.Js",
        percent: 80,
        icon: FaNodeJs,
        color: "text-lime-500",
        gradient: "from-lime-500 via-green-500 to-emerald-600",
      },
      {
        name: "Express.js",
        percent: 85,
        icon: SiExpress,
        color: "text-amber-400",
        gradient: "from-amber-500 via-orange-500 to-red-500",
      },
      {
        name: "Python",
        percent: 84,
        icon: FaPython,
        color: "text-indigo-400",
        gradient: "from-indigo-500 via-blue-500 to-purple-600",
      },
      {
        name: "Django",
        percent: 70,
        icon: SiDjango,
        color: "text-rose-400",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      },
      {
        name: "SQLite",
        percent: 75,
        icon: SiSqlite,
        color: "text-purple-400",
        gradient: "from-purple-500 via-violet-500 to-indigo-600",
      },
    ] as Skill[],
    contact: "Get in Touch",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    messageLabel: "Your Message",
    submit: "Send Message",
    success: "Message sent successfully ✓",
    error: "Something went wrong. Please try again.",
    motto: "Human first. Coder second.",
    mottoSub: "Building the future, one line at a time.",
    statusTitle: "Current Status",
    techStack: "Tech Stack",
    quickActions: "Quick Actions",
    viewGitHub: "View GitHub",
    viewLinkedIn: "View LinkedIn",
    viewTelegram: "View Telegram",
    viewWebsite: "View Website",
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
        gradient: "from-yellow-400 via-amber-400 to-yellow-600",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-400 via-sky-400 to-blue-500",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-400 via-cyan-400 to-sky-500",
      },
      {
        name: "SupaBase",
        percent: 72,
        icon: RiSupabaseLine,
        color: "text-emerald-400",
        gradient: "from-emerald-400 via-green-500 to-teal-500",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-500 via-red-500 to-rose-600",
      },
      {
        name: "MongoDB",
        percent: 85,
        icon: BiLogoMongodb,
        color: "text-green-500",
        gradient: "from-green-500 via-emerald-500 to-lime-500",
      },
      {
        name: "Node.Js",
        percent: 80,
        icon: FaNodeJs,
        color: "text-lime-500",
        gradient: "from-lime-500 via-green-500 to-emerald-600",
      },
      {
        name: "Express.js",
        percent: 85,
        icon: SiExpress,
        color: "text-amber-400",
        gradient: "from-amber-500 via-orange-500 to-red-500",
      },
      {
        name: "Python",
        percent: 84,
        icon: FaPython,
        color: "text-indigo-400",
        gradient: "from-indigo-500 via-blue-500 to-purple-600",
      },
      {
        name: "Django",
        percent: 70,
        icon: SiDjango,
        color: "text-rose-400",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      },
      {
        name: "SQLite",
        percent: 75,
        icon: SiSqlite,
        color: "text-purple-400",
        gradient: "from-purple-500 via-violet-500 to-indigo-600",
      },
    ] as Skill[],
    contact: "تماس با من",
    nameLabel: "نام",
    phoneLabel: "شماره تماس",
    messageLabel: "پیام شما",
    submit: "ارسال پیام",
    success: "پیام با موفقیت ارسال شد ✓",
    error: "مشکلی پیش آمد. دوباره امتحان کنید.",
    motto: "اول انسان، دوم برنامه‌نویس.",
    mottoSub: "ساختن آینده، خط به خط.",
    statusTitle: "وضعیت فعلی",
    techStack: "تکنولوژی‌ها",
    quickActions: "دسترسی سریع",
    viewGitHub: "مشاهده گیت‌هاب",
    viewLinkedIn: "مشاهده لینکدین",
    viewTelegram: "مشاهده تلگرام",
    viewWebsite: "مشاهده وب‌سایت",
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
      {/* Epic CSS Nebula Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#05030f] via-[#12082a] to-[#000000]" />
        <div className="absolute inset-0">
          <div className="nebula-cloud nebula-1" />
          <div className="nebula-cloud nebula-2" />
          <div className="nebula-cloud nebula-3" />
          <div className="nebula-cloud nebula-4" />
        </div>
        <div className="absolute inset-0">
          <div className="shooting-star" />
          <div className="shooting-star delay-1" />
          <div className="shooting-star delay-2" />
        </div>
        <div className="absolute inset-0">
          <div className="star star-1" />
          <div className="star star-2" />
          <div className="star star-3" />
          <div className="star star-4" />
          <div className="star star-5" />
          <div className="star star-6" />
          <div className="star star-7" />
          <div className="star star-8" />
        </div>
        <div className="absolute inset-0 aurora-overlay" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-fuchsia-500/30 blur-xl" />
          <div className="absolute -inset-1 rounded-full bg-linear-to-l from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-2xl opacity-50 animate-pulse" />
          <div className="relative flex items-center gap-6 px-7 py-3 rounded-full bg-black/60 backdrop-blur-3xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">H</span>
                <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  P
                </span>
              </span>
            </div>
            <div className="w-px h-5 bg-linear-to-b from-transparent via-white/10 to-transparent" />
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-light text-white/40 hover:text-white/80 tracking-wider transition-all duration-300 group"
            >
              <span className="relative">
                {isFa ? "EN" : "فارسی"}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-linear-to-r from-indigo-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              </span>
              <ArrowRightLeft
                size={11}
                className={`transition-all duration-500 group-hover:rotate-180 ${isFa ? "rotate-180" : ""}`}
              />
            </button>
            <div className="w-1 h-1 rounded-full bg-linear-to-r from-indigo-400 to-purple-400" />
          </div>
        </div>
      </nav>

      <main id="home" className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative shrink-0 group"
          >
            <div
              className="absolute -inset-8 rounded-full border border-indigo-500/10 animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute -inset-12 rounded-full border border-purple-500/10 animate-spin-reverse"
              style={{ animationDuration: "25s" }}
            />
            <div
              className="absolute -inset-16 rounded-full border border-fuchsia-500/10 animate-spin-slow"
              style={{ animationDuration: "30s" }}
            />
            <div className="absolute -inset-4 bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            <div className="absolute -inset-2 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />

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
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-800 shadow-[0_0_40px_15px_rgba(99,102,241,0.45)] pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-700/95 to-purple-700/95 text-white text-xs font-semibold px-7 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 backdrop-blur-md border border-indigo-400/40">
              <div className="relative">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full" />
              </div>
              {t.status}
            </div>

            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-fuchsia-500/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Intro */}
          <div
            className={`flex-1 space-y-12 ${isFa ? "text-right" : "text-left"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0" />
                <p className="text-2xl md:text-3xl text-indigo-300/80 font-light">
                  {t.greeting}
                </p>
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0" />
              </div>

              <h1 className="relative text-5xl md:text-7xl font-black tracking-tight">
                <span className="bg-linear-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  {t.name}
                </span>
                <span className="absolute -inset-1 blur-3xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 font-medium">
                {t.age} •{" "}
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Full-Stack Developer
                </span>
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
              className="pt-6"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/30 to-indigo-400/0" />
                <p className="uppercase tracking-widest text-sm text-indigo-400/70 font-medium text-center">
                  {t.connect}
                </p>
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/30 to-indigo-400/0" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    Icon: Linkedin,
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/HamiParsa",
                    gradient: "from-[#0A66C2]/30 to-[#0A66C2]/10",
                    hoverGradient: "hover:from-[#0A66C2] hover:to-[#0A66C2]/80",
                    iconColor: "text-[#0A66C2] group-hover:text-white",
                    glow: "shadow-[#0A66C2]/30",
                  },
                  {
                    Icon: Github,
                    name: "GitHub",
                    href: "https://github.com/HamiParsa",
                    gradient: "from-gray-700/30 to-gray-600/10",
                    hoverGradient: "hover:from-gray-800 hover:to-gray-700",
                    iconColor: "text-gray-300 group-hover:text-white",
                    glow: "shadow-gray-400/20",
                  },
                  {
                    Icon: Send,
                    name: "Telegram",
                    href: "https://t.me/HamiParsa",
                    gradient: "from-[#26A5E4]/30 to-[#26A5E4]/10",
                    hoverGradient: "hover:from-[#26A5E4] hover:to-[#26A5E4]/80",
                    iconColor: "text-[#26A5E4] group-hover:text-white",
                    glow: "shadow-[#26A5E4]/30",
                  },
                  {
                    Icon: Globe,
                    name: "Website",
                    href: "https://hamiparsa.github.io/Profile-Bio/",
                    gradient: "from-emerald-600/30 to-emerald-400/10",
                    hoverGradient:
                      "hover:from-emerald-600 hover:to-emerald-500",
                    iconColor: "text-emerald-400 group-hover:text-white",
                    glow: "shadow-emerald-500/30",
                  },
                  {
                    Icon: Instagram,
                    name: "Instagram",
                    href: "https://www.instagram.com/hamii.parsa",
                    gradient:
                      "from-[#E4405F]/30 via-[#E4405F]/20 to-[#E4405F]/10",
                    hoverGradient: "hover:from-[#E4405F] hover:to-[#E4405F]/80",
                    iconColor: "text-[#E4405F] group-hover:text-white",
                    glow: "shadow-[#E4405F]/30",
                  },
                ].map(
                  (
                    {
                      Icon,
                      name,
                      href,
                      gradient,
                      hoverGradient,
                      iconColor,
                      glow,
                    },
                    i,
                  ) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.12 }}
                      whileHover={{
                        scale: 1.08,
                        y: -10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${gradient} backdrop-blur-xl border border-gray-700/40 hover:border-transparent p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out ${hoverGradient} hover:shadow-2xl shadow-lg shadow-black/30 ${glow}`}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[linear-gradient(120deg,transparent_30%,white_50%,transparent_70%)] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r from-white/10 via-white/20 to-white/10 blur-2xl transition-opacity duration-500" />
                      <Icon
                        size={52}
                        strokeWidth={1.2}
                        className={`transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${iconColor}`}
                      />
                      <span className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors duration-500">
                        {name}
                      </span>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:w-full transition-all duration-500" />
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Motto Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-xs text-white/40 font-mono tracking-widest">
                ✦ MOTTO
              </span>
            </div>

            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-white/80">
              {t.motto}
              <span className="block text-indigo-300/60 text-2xl md:text-3xl mt-3">
                {t.mottoSub}
              </span>
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/20">
              <span>— Hami Parsa</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="font-mono tracking-widest text-[10px]">
                2025
              </span>
            </div>
          </div>
        </motion.section>

        {/* Current Status & Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-10 relative"
        >
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl translate-x-1/2" />

          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Current Status */}
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-mono text-white/40 tracking-widest">
                    {t.statusTitle}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                  Full-Stack Developer
                </h3>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all duration-300">
                    <SiNextdotjs className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] text-white/60 font-mono">Next.js</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all duration-300">
                    <FaNodeJs className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] text-white/60 font-mono">Node.js</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 group-hover:bg-fuchsia-500/20 transition-all duration-300">
                    <SiDjango className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] text-white/60 font-mono">Django</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <DiJavascript1 className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] text-white/60 font-mono">TypeScript</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={16} className="text-white/20" />
                  <span className="text-sm font-mono text-white/40 tracking-widest">
                    {t.quickActions}
                  </span>
                </div>

                <div className="space-y-3">
                  <motion.a
                    whileHover={{ scale: 1.02, x: 5 }}
                    href="https://github.com/HamiParsa"
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white transition-colors">
                      <Github
                        size={18}
                        className="text-white/30 group-hover:text-white transition-colors"
                      />
                      {t.viewGitHub}
                    </span>
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02, x: 5 }}
                    href="https://www.linkedin.com/in/HamiParsa"
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white transition-colors">
                      <Linkedin
                        size={18}
                        className="text-white/30 group-hover:text-white transition-colors"
                      />
                      {t.viewLinkedIn}
                    </span>
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02, x: 5 }}
                    href="https://t.me/HamiParsa"
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white transition-colors">
                      <Send
                        size={18}
                        className="text-white/30 group-hover:text-white transition-colors"
                      />
                      {t.viewTelegram}
                    </span>
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 relative"
        >
          <div id="skills" className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Code2 size={14} className="text-indigo-400" />
              <span className="text-xs text-white/40 font-mono tracking-widest">
                {t.techStack}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                icon: DiJavascript1,
                name: "JavaScript",
                color: "text-yellow-400",
              },
              { icon: DiReact, name: "React", color: "text-cyan-400" },
              {
                icon: TbBrandTailwind,
                name: "Tailwind",
                color: "text-teal-400",
              },
              { icon: BiLogoMongodb, name: "MongoDB", color: "text-green-500" },
              { icon: FaNodeJs, name: "Node.js", color: "text-lime-500" },
              { icon: SiExpress, name: "Express", color: "text-amber-400" },
              { icon: FaPython, name: "Python", color: "text-indigo-400" },
              { icon: SiDjango, name: "Django", color: "text-rose-400" },
              { icon: DiGit, name: "Git", color: "text-orange-500" },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 px-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 group"
              >
                <tech.icon
                  size={32}
                  className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <span className="text-[10px] text-white/30 font-mono">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pt-20 lg:pt-28 relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400/30 rounded-full animate-float-particle"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/20 rounded-full animate-float-particle"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-fuchsia-400/20 rounded-full animate-float-particle"
              style={{ animationDelay: "4s" }}
            />
            <div
              className="absolute top-2/3 right-1/4 w-4 h-4 bg-indigo-400/10 rounded-full animate-float-particle"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-400/20 rounded-full animate-float-particle"
              style={{ animationDelay: "3s" }}
            />
          </div>

          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              {t.skills}
            </span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-linear-to-r from-transparent via-indigo-400 to-transparent rounded-full">
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-fuchsia-400 to-transparent rounded-full animate-pulse" />
            </span>
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.skillList.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.06,
                  y: -12,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 400 },
                }}
                className="group relative bg-linear-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-7 shadow-xl hover:shadow-2xl hover:border-gray-500/70 transition-all duration-500 overflow-hidden perspective-500"
              >
                <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-r from-indigo-500/0 via-purple-500/0 to-fuchsia-500/0 group-hover:from-indigo-500/50 group-hover:via-purple-500/50 group-hover:to-fuchsia-500/50 transition-all duration-700">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-gray-900/90 to-gray-800/70" />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-linear-to-tr from-white/5 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 text-[10px] font-mono text-white/10 group-hover:text-white/20 transition-colors duration-500">
                  #{String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className={`p-4 rounded-xl bg-gray-800/70 border border-gray-600/40 ${skill.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-current/30 relative`}
                    >
                      <skill.icon size={44} className="drop-shadow-lg" />
                      <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-current/30" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-indigo-200 transition-all duration-500">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className={`text-lg font-bold ${skill.color}`}>
                          {skill.percent}%
                        </p>
                        <div className="flex gap-0.5 ml-2">
                          {[...Array(5)].map((_, j) => (
                            <div
                              key={j}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                                j < Math.floor(skill.percent / 20)
                                  ? `bg-current ${skill.color}`
                                  : "bg-gray-700/50"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-4 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/50 shadow-inner relative">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                      className={`h-full bg-linear-to-r ${skill.gradient} shadow-[0_0_20px] shadow-current/60 transition-all duration-500 group-hover:shadow-[0_0_30px] group-hover:shadow-current/80 relative`}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
                    </motion.div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-white/20">
                      {skill.percent >= 80
                        ? "⚡ EXPERT"
                        : skill.percent >= 60
                          ? "🚀 ADVANCED"
                          : "📈 INTERMEDIATE"}
                    </span>
                    <span className="text-[10px] font-mono text-white/10">
                      {skill.percent}%
                    </span>
                  </div>
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
          className="pt-20 lg:pt-28 relative"
        >
          <div id="contact" className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative">
            <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              {t.contact}
            </span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-indigo-400 to-transparent rounded-full">
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-fuchsia-400 to-transparent rounded-full animate-pulse" />
            </span>
          </h2>

          <ContactForm t={t} isFa={isFa} />
        </motion.section>
      </main>

      {/* Footer - Premium */}
      <footer className="relative z-10 overflow-hidden">
        <div className="relative pt-16 pb-8 border-t border-indigo-900/30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full animate-scanline pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold text-lg">
                      Hami<span className="text-indigo-400">Parsa</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/30 font-mono tracking-widest">
                        FULL-STACK
                      </span>
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-white/20 font-mono">
                        v3.0
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Building the future, one line at a time. Committed to
                  humanity, kindness, and staying far from ego & show-off.
                </p>
              </div>

              <div>
                <h4 className="text-white/60 text-sm font-semibold tracking-wider mb-4">
                  QUICK LINKS
                </h4>
                <ul className="space-y-2.5">
                  {["Home", "Skills", "Contact"].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-indigo-400/30 group-hover:bg-indigo-400 transition-colors" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white/60 text-sm font-semibold tracking-wider mb-4">
                  CONNECT
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/HamiParsa"
                    target="_blank"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <Github
                      size={20}
                      className="text-white/40 group-hover:text-white transition-colors"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/HamiParsa"
                    target="_blank"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <Linkedin
                      size={20}
                      className="text-white/40 group-hover:text-white transition-colors"
                    />
                  </a>
                  <a
                    href="https://t.me/HamiParsa"
                    target="_blank"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <Send
                      size={20}
                      className="text-white/40 group-hover:text-white transition-colors"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/hamii.parsa"
                    target="_blank"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <Instagram
                      size={20}
                      className="text-white/40 group-hover:text-white transition-colors"
                    />
                  </a>
                </div>

                <motion.a
                  href="https://github.com/HamiParsa/About-Me"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 group w-full"
                >
                  <Github
                    size={18}
                    className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  />
                  <span className="text-sm text-indigo-300/80 group-hover:text-indigo-200 transition-colors">
                    View Repository
                  </span>
                  <svg
                    className="w-4 h-4 text-indigo-400/60 group-hover:translate-x-1 transition-transform ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm font-light tracking-wider">
                © {new Date().getFullYear()} Hami Parsa
              </p>
              <div className="flex items-center gap-6">
                <span className="text-gray-600/60 text-xs tracking-[0.15em]">
                  Built with <span className="text-indigo-400">❤</span> & code
                </span>
                <span className="w-px h-4 bg-white/10" />
                <span className="text-gray-600/40 text-[10px] font-mono tracking-widest">
                  OPEN SOURCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx global>{`
        /* Nebula Clouds */
        .nebula-cloud {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.6;
          animation: nebulaDrift 25s ease-in-out infinite alternate;
        }
        .nebula-1 {
          width: 70%;
          height: 60%;
          top: -10%;
          left: -20%;
          background: radial-gradient(
            ellipse,
            rgba(99, 102, 241, 0.3),
            transparent 70%
          );
          animation-duration: 30s;
        }
        .nebula-2 {
          width: 60%;
          height: 70%;
          bottom: -20%;
          right: -15%;
          background: radial-gradient(
            ellipse,
            rgba(139, 92, 246, 0.25),
            transparent 70%
          );
          animation-duration: 35s;
          animation-delay: -5s;
        }
        .nebula-3 {
          width: 50%;
          height: 50%;
          top: 40%;
          left: 40%;
          background: radial-gradient(
            ellipse,
            rgba(236, 72, 153, 0.2),
            transparent 70%
          );
          animation-duration: 28s;
          animation-delay: -10s;
        }
        .nebula-4 {
          width: 40%;
          height: 40%;
          top: 20%;
          right: 10%;
          background: radial-gradient(
            ellipse,
            rgba(59, 130, 246, 0.15),
            transparent 70%
          );
          animation-duration: 32s;
          animation-delay: -15s;
        }
        @keyframes nebulaDrift {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(50px, -30px) scale(1.2) rotate(5deg);
          }
          50% {
            transform: translate(-30px, 40px) scale(0.8) rotate(-3deg);
          }
          75% {
            transform: translate(40px, 20px) scale(1.1) rotate(4deg);
          }
          100% {
            transform: translate(-20px, -40px) scale(0.9) rotate(-5deg);
          }
        }

        /* Shooting Stars */
        .shooting-star {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.8)
          );
          border-radius: 50%;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
          animation: shoot 8s linear infinite;
          opacity: 0;
        }
        .shooting-star::after {
          content: "";
          position: absolute;
          top: -3px;
          right: 0;
          width: 6px;
          height: 8px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9),
            transparent
          );
          border-radius: 50%;
        }
        .shooting-star.delay-1 {
          animation-delay: 3s;
          top: 20%;
          left: 60%;
          transform: rotate(-25deg);
        }
        .shooting-star.delay-2 {
          animation-delay: 5.5s;
          top: 60%;
          left: 30%;
          transform: rotate(-35deg);
          width: 100px;
        }
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          15% {
            opacity: 1;
          }
          20% {
            opacity: 0;
            transform: translateX(-300px) translateY(100px) scale(0.5);
          }
          100% {
            opacity: 0;
          }
        }

        /* Stars */
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle var(--duration) ease-in-out infinite;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }
        .star-1 {
          top: 15%;
          left: 20%;
          width: 3px;
          height: 3px;
          --duration: 2.5s;
        }
        .star-2 {
          top: 25%;
          right: 25%;
          width: 2px;
          height: 2px;
          --duration: 3.2s;
          animation-delay: 0.5s;
        }
        .star-3 {
          top: 50%;
          left: 10%;
          width: 4px;
          height: 4px;
          --duration: 2.8s;
          animation-delay: 1s;
        }
        .star-4 {
          bottom: 30%;
          right: 15%;
          width: 2.5px;
          height: 2.5px;
          --duration: 3.5s;
          animation-delay: 0.3s;
        }
        .star-5 {
          top: 70%;
          left: 40%;
          width: 3px;
          height: 3px;
          --duration: 2.3s;
          animation-delay: 1.5s;
        }
        .star-6 {
          top: 40%;
          right: 40%;
          width: 1.5px;
          height: 1.5px;
          --duration: 4s;
          animation-delay: 0.8s;
        }
        .star-7 {
          bottom: 15%;
          left: 60%;
          width: 2px;
          height: 2px;
          --duration: 3.8s;
          animation-delay: 1.2s;
        }
        .star-8 {
          top: 80%;
          right: 50%;
          width: 3.5px;
          height: 3.5px;
          --duration: 2.7s;
          animation-delay: 0.7s;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
            box-shadow:
              0 0 20px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(139, 92, 246, 0.3);
          }
        }

        /* Aurora */
        .aurora-overlay {
          background:
            radial-gradient(
              ellipse at 20% 50%,
              rgba(99, 102, 241, 0.08),
              transparent 50%
            ),
            radial-gradient(
              ellipse at 80% 30%,
              rgba(139, 92, 246, 0.06),
              transparent 40%
            ),
            radial-gradient(
              ellipse at 50% 80%,
              rgba(236, 72, 153, 0.04),
              transparent 45%
            );
          animation: auroraPulse 15s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }
        @keyframes auroraPulse {
          0% {
            opacity: 0.5;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1.1) rotate(3deg);
          }
        }

        /* Vignette */
        .bg-radial-vignette {
          background: radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }

        /* Animations */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translate(30px, -30px) scale(1.5);
            opacity: 0.4;
          }
          75% {
            opacity: 0.8;
          }
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        .perspective-500 {
          perspective: 500px;
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// Contact Form with EmailJS
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
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-7 relative">
      <div className="absolute -inset-8 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative group">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.nameLabel}
        </label>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <User
            className={`absolute ${isFa ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-indigo-400/60 group-hover:text-indigo-400 transition-colors duration-300 z-10`}
            size={20}
          />
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className={`relative w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/80 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 group-hover:border-indigo-500/60`}
            placeholder={t.nameLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      <div className="relative group">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.phoneLabel}
        </label>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <Phone
            className={`absolute ${isFa ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-indigo-400/60 group-hover:text-indigo-400 transition-colors duration-300 z-10`}
            size={20}
          />
          <input
            name="number"
            type="tel"
            value={form.number}
            onChange={handleChange}
            required
            className={`relative w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/80 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 group-hover:border-indigo-500/60`}
            placeholder={t.phoneLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      <div className="relative group">
        <label
          className={`block text-sm font-medium text-gray-300 mb-2 ${isFa ? "text-right" : "text-left"}`}
        >
          {t.messageLabel}
        </label>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <MessageSquare
            className={`absolute ${isFa ? "right-4" : "left-4"} top-4 text-indigo-400/60 group-hover:text-indigo-400 transition-colors duration-300 z-10`}
            size={20}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className={`relative w-full ${isFa ? "pr-12 pl-5 text-right" : "pl-12 pr-5 text-left"} py-3.5 bg-gray-900/80 border ${
              status === "error"
                ? "border-red-600"
                : "border-indigo-600/40 focus:border-indigo-500"
            } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 resize-none group-hover:border-indigo-500/60`}
            placeholder={t.messageLabel}
            dir={isFa ? "rtl" : "ltr"}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        type="submit"
        className="relative w-full py-4 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-purple-600 to-fuchsia-600 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-fuchsia-500 transition-all duration-300 rounded-xl" />
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-white/10 to-fuchsia-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/30 to-fuchsia-400/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center justify-center gap-3 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
            <>
              {t.submit}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`text-center text-green-400 font-medium text-lg mt-4 flex items-center justify-center gap-2 ${isFa ? "flex-row-reverse" : ""}`}
          >
            <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            {t.success}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`text-center text-red-400 font-medium text-lg mt-4 flex items-center justify-center gap-2 ${isFa ? "flex-row-reverse" : ""}`}
          >
            <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            {t.error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
