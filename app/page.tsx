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
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-linaear-to-br from-[#05030f] via-[#12082a] to-[#000000]" />
        
        {/* Animated nebula clouds - pure CSS */}
        <div className="absolute inset-0">
          <div className="nebula-cloud nebula-1" />
          <div className="nebula-cloud nebula-2" />
          <div className="nebula-cloud nebula-3" />
          <div className="nebula-cloud nebula-4" />
        </div>

        {/* Shooting stars */}
        <div className="absolute inset-0">
          <div className="shooting-star" />
          <div className="shooting-star delay-1" />
          <div className="shooting-star delay-2" />
        </div>

        {/* Twinkling stars layer */}
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

        {/* Glowing aurora effect */}
        <div className="absolute inset-0 aurora-overlay" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Holographic Floating Pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <div className="relative">
          {/* Holographic background effect */}
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-fuchsia-500/30 blur-xl" />
          <div className="absolute -inset-1 rounded-full bg-linear-to-l from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-2xl opacity-50 animate-pulse" />
          
          <div className="relative flex items-center gap-6 px-7 py-3 rounded-full bg-black/60 backdrop-blur-3xl border border-white/10">
            
            {/* HP Logo - Bold, no circle */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">H</span>
                <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">P</span>
              </span>
            </div>

            {/* Separator with gradient */}
            <div className="w-px h-5 bg-linear-to-b from-transparent via-white/10 to-transparent" />

            {/* Language toggle - Clean */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-light text-white/40 hover:text-white/80 tracking-wider transition-all duration-300 group"
            >
              <span className="relative">
                {isFa ? "فارسی" : "EN"}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-linear-to-r from-indigo-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              </span>
              <ArrowRightLeft 
                size={11} 
                className={`transition-all duration-500 group-hover:rotate-180 ${isFa ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Small accent dot */}
            <div className="w-1 h-1 rounded-full bg-linear-to-r from-indigo-400 to-purple-400" />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-32">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 mb-24">
          {/* Avatar with premium effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative shrink-0 group"
          >
            {/* Orbital rings */}
            <div className="absolute -inset-8 rounded-full border border-indigo-500/10 animate-spin-slow" style={{ animationDuration: '20s' }} />
            <div className="absolute -inset-12 rounded-full border border-purple-500/10 animate-spin-reverse" style={{ animationDuration: '25s' }} />
            <div className="absolute -inset-16 rounded-full border border-fuchsia-500/10 animate-spin-slow" style={{ animationDuration: '30s' }} />
            
            {/* Pulsing glow rings */}
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
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-800 shadow-[0_0_40px_15px_rgba(99,102,241,0.45)] pointer-events-none" />

              {/* Animated scanline over image */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />
            </div>

            {/* Status badge - premium */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-700/95 to-purple-700/95 text-white text-xs font-semibold px-7 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 backdrop-blur-md border border-indigo-400/40">
              <div className="relative">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full" />
              </div>
              {t.status}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-fuchsia-500/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Intro + social cards */}
          <div className={`flex-1 space-y-12 ${isFa ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="space-y-5"
            >
              {/* Greeting with decorative line */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0" />
                <p className="text-2xl md:text-3xl text-indigo-300/80 font-light">
                  {t.greeting}
                </p>
                <div className="w-12 h-0.5 bg-linear-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0" />
              </div>
              
              {/* Name with glow */}
              <h1 className="relative text-5xl md:text-7xl font-black tracking-tight">
                <span className="bg-linear-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  {t.name}
                </span>
                <span className="absolute -inset-1 blur-3xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-medium">
                {t.age} • <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Full-Stack Developer</span>
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

            {/* Social cards - Enhanced */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-10"
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
                    hoverGradient: "hover:from-emerald-600 hover:to-emerald-500",
                    iconColor: "text-emerald-400 group-hover:text-white",
                    glow: "shadow-emerald-500/30",
                  },
                  {
                    Icon: Instagram,
                    name: "Instagram",
                    href: "https://www.instagram.com/hamii.parsa",
                    gradient: "from-[#E4405F]/30 via-[#E4405F]/20 to-[#E4405F]/10",
                    hoverGradient: "hover:from-[#E4405F] hover:to-[#E4405F]/80",
                    iconColor: "text-[#E4405F] group-hover:text-white",
                    glow: "shadow-[#E4405F]/30",
                  },
                ].map(
                  (
                    { Icon, name, href, gradient, hoverGradient, iconColor, glow },
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
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${gradient} backdrop-blur-xl border border-gray-700/40 hover:border-transparent p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out ${hoverGradient} hover:shadow-2xl shadow-lg shadow-black/30 ${glow}`}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[linear-gradient(120deg,transparent_30%,white_50%,transparent_70%)] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Glow behind icon */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r from-white/10 via-white/20 to-white/10 blur-2xl transition-opacity duration-500" />
                      
                      <Icon
                        size={52}
                        strokeWidth={1.2}
                        className={`transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${iconColor}`}
                      />
                      <span className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors duration-500">
                        {name}
                      </span>
                      
                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:w-full transition-all duration-500" />
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
