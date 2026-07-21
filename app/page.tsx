"use client";

import { useState, useEffect, useEffectEvent, useRef } from "react";
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
  Sparkles,
  Zap,
  ChevronUp,
  Code2,
  Menu,
  X,
  Layout,
  Server,
  Database,
  Cloud,
} from "lucide-react";
import { DiJavascript1, DiReact, DiGit } from "react-icons/di";
import { TbBrandTailwind, TbBrandNextjs } from "react-icons/tb";
import { RiSupabaseLine } from "react-icons/ri";
import { BiLogoMongodb } from "react-icons/bi";
import { FaNodeJs, FaPython } from "react-icons/fa";
import { SiDjango, SiSqlite, SiExpress, SiTypescript } from "react-icons/si";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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
  category: "frontend" | "backend" | "database" | "devops";
  description?: string;
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
    skills: "Skills & Expertise",
    skillList: [
      {
        name: "JavaScript / TypeScript",
        percent: 88,
        icon: DiJavascript1,
        color: "text-yellow-400",
        gradient: "from-yellow-400 via-amber-400 to-orange-500",
        category: "frontend",
        description: "ES6+, TypeScript, JSDoc",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-400 via-sky-400 to-blue-500",
        category: "frontend",
        description: "Hooks, SSR, App Router",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-400 via-cyan-400 to-sky-500",
        category: "frontend",
        description: "Responsive, Animations",
      },
      {
        name: "Supabase",
        percent: 72,
        icon: RiSupabaseLine,
        color: "text-emerald-400",
        gradient: "from-emerald-400 via-green-500 to-teal-500",
        category: "database",
        description: "Realtime, Auth, Storage",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-500 via-red-500 to-rose-600",
        category: "devops",
        description: "CI/CD, Actions, Version Control",
      },
      {
        name: "MongoDB",
        percent: 85,
        icon: BiLogoMongodb,
        color: "text-green-500",
        gradient: "from-green-500 via-emerald-500 to-lime-500",
        category: "database",
        description: "Aggregation, Indexing",
      },
      {
        name: "Node.js",
        percent: 80,
        icon: FaNodeJs,
        color: "text-lime-500",
        gradient: "from-lime-500 via-green-500 to-emerald-600",
        category: "backend",
        description: "REST APIs, Middleware",
      },
      {
        name: "Express.js",
        percent: 85,
        icon: SiExpress,
        color: "text-amber-400",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        category: "backend",
        description: "Routing, Middleware",
      },
      {
        name: "Python",
        percent: 84,
        icon: FaPython,
        color: "text-indigo-400",
        gradient: "from-indigo-500 via-blue-500 to-purple-600",
        category: "backend",
        description: "Scripting, Automation",
      },
      {
        name: "Django",
        percent: 70,
        icon: SiDjango,
        color: "text-rose-400",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
        category: "backend",
        description: "DRF, ORM, Admin",
      },
      {
        name: "SQLite",
        percent: 75,
        icon: SiSqlite,
        color: "text-purple-400",
        gradient: "from-purple-500 via-violet-500 to-indigo-600",
        category: "database",
        description: "Lightweight, Embedded",
      },
    ] as Skill[],

    // Tech Stack Categories - Complete with icons
    techCategories: [
      {
        name: "Frontend",
        icon: Layout,
        technologies: [
          { name: "JavaScript", icon: DiJavascript1, color: "text-yellow-400" },
          { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
          { name: "React", icon: DiReact, color: "text-cyan-400" },
          { name: "Next.js", icon: TbBrandNextjs, color: "text-white" },
          { name: "Tailwind CSS", icon: TbBrandTailwind, color: "text-teal-400" },
        ],
      },
      {
        name: "Backend",
        icon: Server,
        technologies: [
          { name: "Node.js", icon: FaNodeJs, color: "text-lime-500" },
          { name: "Express.js", icon: SiExpress, color: "text-amber-400" },
          { name: "Python", icon: FaPython, color: "text-indigo-400" },
          { name: "Django", icon: SiDjango, color: "text-rose-400" },
        ],
      },
      {
        name: "Database",
        icon: Database,
        technologies: [
          { name: "MongoDB", icon: BiLogoMongodb, color: "text-green-500" },
          { name: "Supabase", icon: RiSupabaseLine, color: "text-emerald-400" },
          { name: "SQLite", icon: SiSqlite, color: "text-purple-400" },
        ],
      },
      {
        name: "DevOps • Tools",
        icon: Cloud,
        technologies: [
          { name: "Git", icon: DiGit, color: "text-orange-500" },
          { name: "GitHub", icon: DiGit, color: "text-orange-500" },
        ],
      },
    ],

    contact: "Get in Touch",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    messageLabel: "Your Message",
    submit: "Send Message",
    success: "Message sent successfully ✓",
    error: "Something went wrong. Please try again.",
    motto: "Human first. Coder second.",
    mottoSub: "Building the future, one line at a time.",
    mottoFooter:
      "Building the future, one line at a time. Committed to humanity, kindness, and staying far from ego & show-off.",
    statusTitle: "Current Status",
    statusHeading: "Full-Stack Developer",
    quickActions: "Quick Actions",
    viewGitHub: "View GitHub",
    viewLinkedIn: "View LinkedIn",
    viewTelegram: "View Telegram",
    viewWebsite: "View Website",
    techStack: "Tech Stack",
    home: "Home",
    skillsLink: "Skills",
    contactLink: "Contact",
    brand: "HamiParsa",
    builtWith: "Built with",
    openSource: "OPEN SOURCE",
    repository: "View Repository",
    aboutMe: "About Me",
    explore: "Explore",
    getInTouch: "Get in Touch",
    technologies: "Technologies",
    allSkills: "All Skills",
    expertise: "Expertise",
  },
  fa: {
    greeting: "سلام، من",
    name: "حامی پارسا",
    age: "۲۰ ساله",
    about: `حامی پارسا هستم، ۲۰ ساله.\nاول از همه دوست دارم انسان باشم؛ پایبند به قانون انسانیت و دور از خودنمایی.\nعاشق دنیای تکنولوژی‌ام و می‌خوام روزی بهترین نسخه خودم رو تو این حوزه بسازم.\nالان روی فول‌استک وب کار می‌کنم، اما هدفم خیلی بزرگ‌تره: مهندس نرم‌افزار درجه‌یک بشم، دنیا رو هوشمندتر کنم، بدرخشم و به وجودم تو این دنیا افتخار کنم.`,
    connect: "بیا باهم در ارتباط باشیم",
    status: "آماده همکاری",
    skills: "مهارت‌ها و تخصص",
    skillList: [
      {
        name: "JavaScript / TypeScript",
        percent: 88,
        icon: DiJavascript1,
        color: "text-yellow-400",
        gradient: "from-yellow-400 via-amber-400 to-orange-500",
        category: "frontend",
        description: "ES6+, TypeScript, JSDoc",
      },
      {
        name: "React • Next.js",
        percent: 85,
        icon: DiReact,
        color: "text-cyan-400",
        gradient: "from-cyan-400 via-sky-400 to-blue-500",
        category: "frontend",
        description: "Hooks, SSR, App Router",
      },
      {
        name: "Tailwind CSS",
        percent: 92,
        icon: TbBrandTailwind,
        color: "text-teal-400",
        gradient: "from-teal-400 via-cyan-400 to-sky-500",
        category: "frontend",
        description: "Responsive, Animations",
      },
      {
        name: "Supabase",
        percent: 72,
        icon: RiSupabaseLine,
        color: "text-emerald-400",
        gradient: "from-emerald-400 via-green-500 to-teal-500",
        category: "database",
        description: "Realtime, Auth, Storage",
      },
      {
        name: "Git • GitHub",
        percent: 94,
        icon: DiGit,
        color: "text-orange-500",
        gradient: "from-orange-500 via-red-500 to-rose-600",
        category: "devops",
        description: "CI/CD, Actions, Version Control",
      },
      {
        name: "MongoDB",
        percent: 85,
        icon: BiLogoMongodb,
        color: "text-green-500",
        gradient: "from-green-500 via-emerald-500 to-lime-500",
        category: "database",
        description: "Aggregation, Indexing",
      },
      {
        name: "Node.js",
        percent: 80,
        icon: FaNodeJs,
        color: "text-lime-500",
        gradient: "from-lime-500 via-green-500 to-emerald-600",
        category: "backend",
        description: "REST APIs, Middleware",
      },
      {
        name: "Express.js",
        percent: 85,
        icon: SiExpress,
        color: "text-amber-400",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        category: "backend",
        description: "Routing, Middleware",
      },
      {
        name: "Python",
        percent: 84,
        icon: FaPython,
        color: "text-indigo-400",
        gradient: "from-indigo-500 via-blue-500 to-purple-600",
        category: "backend",
        description: "Scripting, Automation",
      },
      {
        name: "Django",
        percent: 70,
        icon: SiDjango,
        color: "text-rose-400",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
        category: "backend",
        description: "DRF, ORM, Admin",
      },
      {
        name: "SQLite",
        percent: 75,
        icon: SiSqlite,
        color: "text-purple-400",
        gradient: "from-purple-500 via-violet-500 to-indigo-600",
        category: "database",
        description: "Lightweight, Embedded",
      },
    ] as Skill[],

    techCategories: [
      {
        name: "فرانت‌اند",
        icon: Layout,
        technologies: [
          { name: "JavaScript", icon: DiJavascript1, color: "text-yellow-400" },
          { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
          { name: "React", icon: DiReact, color: "text-cyan-400" },
          { name: "Next.js", icon: TbBrandNextjs, color: "text-white" },
          { name: "Tailwind CSS", icon: TbBrandTailwind, color: "text-teal-400" },
        ],
      },
      {
        name: "بک‌اند",
        icon: Server,
        technologies: [
          { name: "Node.js", icon: FaNodeJs, color: "text-lime-500" },
          { name: "Express.js", icon: SiExpress, color: "text-amber-400" },
          { name: "Python", icon: FaPython, color: "text-indigo-400" },
          { name: "Django", icon: SiDjango, color: "text-rose-400" },
        ],
      },
      {
        name: "پایگاه داده",
        icon: Database,
        technologies: [
          { name: "MongoDB", icon: BiLogoMongodb, color: "text-green-500" },
          { name: "Supabase", icon: RiSupabaseLine, color: "text-emerald-400" },
          { name: "SQLite", icon: SiSqlite, color: "text-purple-400" },
        ],
      },
      {
        name: "دواپس • ابزارها",
        icon: Cloud,
        technologies: [
          { name: "Git", icon: DiGit, color: "text-orange-500" },
          { name: "GitHub", icon: DiGit, color: "text-orange-500" },
        ],
      },
    ],

    contact: "تماس با من",
    nameLabel: "نام",
    phoneLabel: "شماره تماس",
    messageLabel: "پیام شما",
    submit: "ارسال پیام",
    success: "پیام با موفقیت ارسال شد ✓",
    error: "مشکلی پیش آمد. دوباره امتحان کنید.",
    motto: "اول انسان، دوم برنامه‌نویس.",
    mottoSub: "ساختن آینده، خط به خط.",
    mottoFooter:
      "ساختن آینده، خط به خط. متعهد به انسانیت، مهربانی و دوری از خودنمایی و تکبر.",
    statusTitle: "وضعیت فعلی",
    statusHeading: "توسعه‌دهنده فول‌استک",
    quickActions: "دسترسی سریع",
    viewGitHub: "مشاهده گیت‌هاب",
    viewLinkedIn: "مشاهده لینکدین",
    viewTelegram: "مشاهده تلگرام",
    viewWebsite: "مشاهده وب‌سایت",
    techStack: "تکنولوژی‌ها",
    home: "خانه",
    skillsLink: "مهارت‌ها",
    contactLink: "تماس",
    brand: "حامی پارسا",
    builtWith: "ساخته شده با",
    openSource: "متن‌باز",
    repository: "مشاهده ریپازیتوری",
    aboutMe: "درباره من",
    explore: "کاوش",
    getInTouch: "در ارتباط باش",
    technologies: "تکنولوژی‌ها",
    allSkills: "همه مهارت‌ها",
    expertise: "تخصص",
  },
};

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      const handleScroll = () => {
        setScrolled(window.scrollY > 100);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const isFa = lang === "fa";
  const t = content[lang];
  const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Premium Dark Golden Palette
  const colors = {
    primary: "#D4A853",
    secondary: "#F59E0B",
    accent: "#B8860B",
    dark: "#0A0806",
    darkCard: "#14100C",
    border: "rgba(212,168,83,0.15)",
    glow: "rgba(212,168,83,0.08)",
    text: "#C9C4B8",
    textLight: "#E8E0D0",
  };

  return (
    <div
      ref={containerRef}
      dir={isFa ? "rtl" : "ltr"}
      className={`relative min-h-screen bg-[#0A0806] text-[#C9C4B8] overflow-x-hidden ${
        isFa ? 'font-["Vazirmatn"]' : "font-sans"
      }`}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2px z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
          boxShadow: "0 0 20px rgba(212,168,83,0.3)",
        }}
      />

      {/* Mouse Follower */}
      <div
        className="fixed pointer-events-none z-0 w-600px h-600px rounded-full blur-3xl opacity-20 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0806]" />
        
        <div className="absolute top-0 -left-40 w-500px h-500px bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-500px h-500px bg-yellow-600/5 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, ${colors.primary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        
        <div className="shooting-star" />
        <div className="shooting-star delay-1" />
        <div className="shooting-star delay-2" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-amber-600/20 via-yellow-600/20 to-amber-600/20 blur-xl" />
          <div className="relative flex items-center justify-between px-6 py-3 rounded-2xl bg-[#14100C]/95 backdrop-blur-2xl border border-[#D4A853]/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-500 to-yellow-500 blur-lg opacity-50" />
                <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-[#0A0806] font-bold text-sm">H</span>
                </div>
              </div>
              <span className="text-[#E8E0D0] font-semibold tracking-tight">
                Hami<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-400">Parsa</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["home", "skillsLink", "contactLink"].map((key) => (
                <a
                  key={key}
                  href={`#${key === "home" ? "home" : key === "skillsLink" ? "skills" : "contact"}`}
                  className="text-xs text-[#C9C4B8]/40 hover:text-[#D4A853] transition-all duration-300 tracking-[0.15em] font-medium uppercase"
                >
                  {t[key as keyof typeof t] as string}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-xs font-medium text-[#C9C4B8]/40 hover:text-[#D4A853] transition-all duration-300 group px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
              >
                <span>{isFa ? "EN" : "فا"}</span>
                <ArrowRightLeft
                  size={12}
                  className={`transition-all duration-500 group-hover:rotate-180 ${
                    isFa ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[#C9C4B8]/60"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-2 p-4 rounded-2xl bg-[#14100C]/98 backdrop-blur-2xl border border-[#D4A853]/20 md:hidden"
            >
              <div className="flex flex-col gap-3">
                {["home", "skillsLink", "contactLink"].map((key) => (
                  <a
                    key={key}
                    href={`#${key === "home" ? "home" : key === "skillsLink" ? "skills" : "contact"}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-[#C9C4B8]/60 hover:text-[#D4A853] transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    {t[key as keyof typeof t] as string}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Hero Section */}
        <section id="home" className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative shrink-0 group"
          >
            <div className="absolute -inset-8 rounded-full border border-[#D4A853]/10 animate-spin-slow" />
            <div className="absolute -inset-16 rounded-full border border-[#D4A853]/10 animate-spin-reverse" style={{ animationDuration: "25s" }} />
            <div className="absolute -inset-24 rounded-full border border-[#D4A853]/5 animate-spin-slow" style={{ animationDuration: "30s" }} />

            <div className="absolute -inset-4 bg-linear-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-[#D4A853]/40 shadow-2xl shadow-[#D4A853]/20 relative">
              <Image
                width={800}
                height={800}
                src="https://avatars.githubusercontent.com/u/227557537?v=4"
                alt="Hami Parsa"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0A0806]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-r from-[#D4A853]/10 via-transparent to-amber-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#D4A853] to-[#F59E0B] text-[#0A0806] text-xs font-bold px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 backdrop-blur-md border border-amber-400/30">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
              </div>
              {t.status}
            </div>
          </motion.div>

          {/* Intro */}
          <div className={`flex-1 space-y-8 ${isFa ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/50 to-[#D4A853]/0" />
                <p className="text-xl text-[#D4A853]/60 font-light tracking-wide">
                  {t.greeting}
                </p>
                <div className="w-12 h-px bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/50 to-[#D4A853]/0" />
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                <span className="bg-linear-to-r from-white via-amber-200 to-yellow-200 bg-clip-text text-transparent">
                  {t.name}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[#C9C4B8]/60 font-medium">
                {t.age} •{" "}
                <span className="bg-linear-to-r from-[#D4A853] to-[#F59E0B] bg-clip-text text-transparent font-semibold">
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
                transition={{ duration: 0.6 }}
                className="text-base leading-relaxed text-[#C9C4B8]/60 max-w-2xl whitespace-pre-line"
              >
                {t.about}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-linear-to-r from-[#D4A853] to-[#F59E0B] rounded-full text-sm font-bold text-[#0A0806] shadow-lg shadow-[#D4A853]/30 hover:shadow-[#D4A853]/50 transition-all duration-300 flex items-center gap-2"
                >
                  <Send size={16} />
                  {t.getInTouch}
                </motion.button>
              </a>
              <a href="#skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-[#C9C4B8]/60 hover:text-[#D4A853] transition-all duration-300 flex items-center gap-2"
                >
                  <Code2 size={16} />
                  {t.explore}
                </motion.button>
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/30 to-[#D4A853]/0" />
                <p className="uppercase tracking-[0.2em] text-xs text-[#D4A853]/40 font-medium">
                  {t.connect}
                </p>
                <div className="w-12 h-px bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/30 to-[#D4A853]/0" />
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/in/HamiParsa" },
                  { Icon: Github, name: "GitHub", href: "https://github.com/HamiParsa" },
                  { Icon: Send, name: "Telegram", href: "https://t.me/HamiParsa" },
                  { Icon: Globe, name: "Website", href: "https://hamiparsa.github.io/Profile-Bio/" },
                  { Icon: Instagram, name: "Instagram", href: "https://www.instagram.com/hamii.parsa" },
                ].map(({ Icon, name, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4A853]/40 transition-all duration-300 flex items-center gap-2.5 hover:bg-[#D4A853]/5"
                  >
                    <Icon size={18} className="text-[#C9C4B8]/30 group-hover:text-[#D4A853] transition-colors" />
                    <span className="text-sm text-[#C9C4B8]/40 group-hover:text-[#D4A853] transition-colors">
                      {name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Motto */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-[#D4A853]/5 rounded-full blur-3xl" />
            <div className="w-64 h-64 bg-amber-500/5 rounded-full blur-3xl absolute" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-[#D4A853]/20 mb-8 backdrop-blur-sm">
              <Sparkles size={14} className="text-[#D4A853]" />
              <span className="text-xs text-[#C9C4B8]/30 font-mono tracking-widest">✦ MOTTO</span>
            </div>

            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-[#E8E0D0]/80">
              {t.motto}
              <span className="block text-[#D4A853]/40 text-2xl md:text-3xl mt-3">
                {t.mottoSub}
              </span>
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/10">
              <span>— Hami Parsa</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="font-mono tracking-widest text-[10px]">2025</span>
            </div>
          </div>
        </motion.section>

        {/* Status & Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#D4A853]/10 hover:border-[#D4A853]/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/5 to-[#D4A853]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <span className="text-xs font-mono text-[#C9C4B8]/30 tracking-widest">
                  {t.statusTitle}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#E8E0D0] mb-3 group-hover:text-[#D4A853] transition-colors">
                {t.statusHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Node.js", "Django", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[10px] font-mono text-[#C9C4B8]/40 bg-white/5 rounded-full border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#D4A853]/10 hover:border-[#D4A853]/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/5 to-[#D4A853]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex items-center gap-3 mb-4">
                <Zap size={14} className="text-[#C9C4B8]/20" />
                <span className="text-xs font-mono text-[#C9C4B8]/30 tracking-widest">
                  {t.quickActions}
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Github, label: t.viewGitHub, href: "https://github.com/HamiParsa" },
                  { icon: Linkedin, label: t.viewLinkedIn, href: "https://www.linkedin.com/in/HamiParsa" },
                  { icon: Send, label: t.viewTelegram, href: "https://t.me/HamiParsa" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ x: 4 }}
                    href={item.href}
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/action"
                  >
                    <item.icon size={16} className="text-[#C9C4B8]/30 group-hover/action:text-[#D4A853] transition-colors" />
                    <span className="text-sm text-[#C9C4B8]/40 group-hover/action:text-[#D4A853] transition-colors">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <section id="skills" className="relative pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-linear-to-r from-[#D4A853] via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                {t.skills}
              </span>
            </h2>
            <p className="text-center text-[#C9C4B8]/40 text-sm mb-12">
              {t.expertise} • {t.techStack}
            </p>

            {/* Tech Categories - Complete with all icons */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {t.techCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-[#D4A853]/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-white/5">
                        <category.icon size={20} className="text-[#D4A853]" />
                      </div>
                      <span className="text-sm font-semibold text-[#E8E0D0]">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech, i) => (
                        <div
                          key={i}
                          className="group/tech flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-[#D4A853]/20"
                        >
                          <tech.icon size={14} className={tech.color} />
                          <span className="text-[10px] text-[#C9C4B8]/60 group-hover/tech:text-[#D4A853] transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skill Bars */}
            <h3 className="text-2xl font-semibold text-center mb-8 text-[#E8E0D0]/80">
              {t.allSkills}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {t.skillList.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-[#D4A853]/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#D4A853]/0 via-[#D4A853]/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${skill.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-current/20`}>
                      <skill.icon size={32} />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-[#E8E0D0] group-hover:text-[#D4A853] transition-colors">
                          {skill.name}
                        </span>
                        <span className={`text-sm font-bold ${skill.color}`}>
                          {skill.percent}%
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-[10px] text-[#C9C4B8]/30 mb-1">
                          {skill.description}
                        </p>
                      )}
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full bg-linear-to-r ${skill.gradient} rounded-full shadow-lg shadow-current/20`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-linear-to-r from-[#D4A853] via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                {t.contact}
              </span>
            </h2>
            <p className="text-center text-[#C9C4B8]/40 text-sm mb-12">
              {t.getInTouch}
            </p>

            <ContactForm t={t} isFa={isFa} />
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#D4A853]/10 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-500 to-yellow-500 blur-lg opacity-30" />
                <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#D4A853] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#D4A853]/30">
                  <span className="text-[#0A0806] font-bold text-sm">H</span>
                </div>
              </div>
              <div>
                <span className="text-[#E8E0D0] font-semibold">Hami<span className="text-[#D4A853]">Parsa</span></span>
                <p className="text-xs text-[#C9C4B8]/30 font-mono tracking-widest">FULL-STACK</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/HamiParsa/About-Me"
                target="_blank"
                className="text-xs text-[#C9C4B8]/30 hover:text-[#D4A853] transition-colors flex items-center gap-2"
              >
                <Github size={14} />
                {t.repository}
              </a>
              <span className="text-white/10">|</span>
              <span className="text-xs text-[#C9C4B8]/20">
                {t.builtWith} <span className="text-[#D4A853]">✦</span>
              </span>
            </div>

            <div className="flex gap-3">
              {[Github, Linkedin, Send, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Icon size={16} className="text-[#C9C4B8]/30 hover:text-[#D4A853] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#C9C4B8]/20">
              © {new Date().getFullYear()} Hami Parsa
            </p>
            <p className="text-xs text-[#C9C4B8]/10 font-mono tracking-widest">
              {t.openSource}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-linear-to-r from-[#D4A853] to-[#F59E0B] text-[#0A0806] shadow-lg shadow-[#D4A853]/30 hover:shadow-[#D4A853]/50 transition-all duration-300 group"
          >
            <ChevronUp size={22} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(212,168,83,0.4));
          border-radius: 50%;
          animation: shoot 7s linear infinite;
          opacity: 0;
        }
        .shooting-star::after {
          content: '';
          position: absolute;
          top: -3px;
          right: 0;
          width: 5px;
          height: 7px;
          background: radial-gradient(circle, rgba(212,168,83,0.8), transparent);
          border-radius: 50%;
        }
        .shooting-star.delay-1 { animation-delay: 2.5s; top: 20%; left: 65%; transform: rotate(-25deg); width: 80px; }
        .shooting-star.delay-2 { animation-delay: 4.5s; top: 55%; left: 35%; transform: rotate(-35deg); width: 60px; }

        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0; }
          5% { opacity: 1; }
          15% { opacity: 1; }
          20% { opacity: 0; transform: translateX(-300px) translateY(120px) scale(0.5); }
          100% { opacity: 0; }
        }

        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-spin-reverse { animation: spin-reverse linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        ::selection {
          background: rgba(212, 168, 83, 0.3);
          color: white;
        }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0A0806;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #D4A853, #F59E0B);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #F59E0B, #D4A853);
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────
// Contact Form
// ────────────────────────────────────────────────
function ContactForm({
  t,
  isFa,
}: {
  t: (typeof content)["en"];
  isFa: boolean;
}) {
  const [form, setForm] = useState({ name: "", number: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        "q1s3x3DSUxpAVErUh"
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
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <label className={`block text-xs font-medium text-[#C9C4B8]/40 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
            {t.nameLabel}
          </label>
          <div className="relative">
            <User size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-[#C9C4B8]/20 group-hover:text-[#D4A853] transition-colors`} />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 bg-white/5 border ${status === "error" ? "border-red-500/50" : "border-white/10"} rounded-xl text-[#E8E0D0] placeholder-[#C9C4B8]/20 focus:border-[#D4A853]/50 focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 outline-none`}
              placeholder={t.nameLabel}
              dir={isFa ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="relative group">
          <label className={`block text-xs font-medium text-[#C9C4B8]/40 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
            {t.phoneLabel}
          </label>
          <div className="relative">
            <Phone size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-[#C9C4B8]/20 group-hover:text-[#D4A853] transition-colors`} />
            <input
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              required
              className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 bg-white/5 border ${status === "error" ? "border-red-500/50" : "border-white/10"} rounded-xl text-[#E8E0D0] placeholder-[#C9C4B8]/20 focus:border-[#D4A853]/50 focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 outline-none`}
              placeholder={t.phoneLabel}
              dir={isFa ? "rtl" : "ltr"}
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <label className={`block text-xs font-medium text-[#C9C4B8]/40 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
          {t.messageLabel}
        </label>
        <div className="relative">
          <MessageSquare size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-3.5 text-[#C9C4B8]/20 group-hover:text-[#D4A853] transition-colors`} />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 bg-white/5 border ${status === "error" ? "border-red-500/50" : "border-white/10"} rounded-xl text-[#E8E0D0] placeholder-[#C9C4B8]/20 focus:border-[#D4A853]/50 focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 outline-none resize-none`}
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
        className="relative w-full py-3.5 overflow-hidden group rounded-xl bg-linear-to-r from-[#D4A853] to-[#F59E0B] text-[#0A0806] font-bold shadow-lg shadow-[#D4A853]/25 hover:shadow-[#D4A853]/50 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#D4A853]/0 via-white/20 to-[#F59E0B]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {isFa ? "در حال ارسال..." : "Sending..."}
            </>
          ) : (
            <>
              {t.submit}
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-emerald-400 text-sm flex items-center justify-center gap-2"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {t.success}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-red-400 text-sm flex items-center justify-center gap-2"
          >
            <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            {t.error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}