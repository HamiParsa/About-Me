"use client";

import { useState, useEffect, useRef } from "react";
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

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 1: Theme Configuration
// ──────────────────────────────────────────────────────────────────────────────

const THEME = {
  // Primary palette - Cyberpunk Neon
  colors: {
    primary: "#8B5CF6", // Purple neon
    primaryDark: "#6D28D9",
    secondary: "#06B6D4", // Cyan electric
    accent: "#F472B6", // Pink neon
    accent2: "#34D399", // Emerald
    bg: "#0A0A0F",
    bgCard: "rgba(255, 255, 255, 0.05)",
    bgCardHover: "rgba(255, 255, 255, 0.08)",
    text: "#E2E8F0",
    textMuted: "#94A3B8",
    border: "rgba(139, 92, 246, 0.2)",
    glow: "rgba(139, 92, 246, 0.15)",
    glowSecondary: "rgba(6, 182, 212, 0.15)",
    glowPink: "rgba(244, 114, 182, 0.15)",
  },
  // Glassmorphism settings
  glass: {
    backdrop: "blur(20px)",
    bg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.08)",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  },
  // Animation speeds
  animation: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 2: Particle System (Background)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Particle component for the animated background
 * Creates floating neon dots with varying sizes and speeds
 */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const colors = [
      THEME.colors.primary,
      THEME.colors.secondary,
      THEME.colors.accent,
      THEME.colors.accent2,
    ];
    
    particles.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color + "80");
        gradient.addColorStop(1, p.color + "00");
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles
        particles.current.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color + "20";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: THEME.colors.bg }}
    />
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 3: Types & Content
// ──────────────────────────────────────────────────────────────────────────────

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

type TechCategory = {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  technologies: Array<{
    name: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    color: string;
  }>;
};

type Content = {
  greeting: string;
  name: string;
  age: string;
  about: string;
  connect: string;
  status: string;
  skills: string;
  skillList: Skill[];
  techCategories: TechCategory[];
  contact: string;
  nameLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submit: string;
  success: string;
  error: string;
  motto: string;
  mottoSub: string;
  mottoFooter: string;
  statusTitle: string;
  statusHeading: string;
  quickActions: string;
  viewGitHub: string;
  viewLinkedIn: string;
  viewTelegram: string;
  viewWebsite: string;
  techStack: string;
  home: string;
  skillsLink: string;
  contactLink: string;
  brand: string;
  builtWith: string;
  openSource: string;
  repository: string;
  aboutMe: string;
  explore: string;
  getInTouch: string;
  technologies: string;
  allSkills: string;
  expertise: string;
  experience: string;
  projects: string;
};

const content: Record<Lang, Content> = {
  en: {
    greeting: "Hey, I'm",
    name: "Hami Parsa",
    age: "20 years old",
    about: `Full-stack developer with a passion for building elegant, high-performance applications. \nI believe in writing clean code, continuous learning, and pushing the boundaries of what's possible.\nCurrently exploring AI integration and building next-gen web experiences.`,
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
    ],
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
    motto: "Build with passion. Code with purpose.",
    mottoSub: "Creating the future, one commit at a time.",
    mottoFooter: "Committed to excellence, innovation, and pushing the boundaries of what's possible.",
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
    experience: "Experience",
    projects: "Projects",
  },
  fa: {
    greeting: "سلام، من",
    name: "حامی پارسا",
    age: "۲۰ ساله",
    about: `توسعه‌دهنده فول‌استک با اشتیاق به ساخت اپلیکیشن‌های زیبا و با عملکرد بالا.\nبه کدنویسی تمیز، یادگیری مداوم و عبور از مرزهای ممکن باور دارم.\nدر حال حاضر روی یکپارچه‌سازی هوش مصنوعی و ساخت تجربه‌های نسل بعدی وب کار می‌کنم.`,
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
    ],
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
    motto: "با شور بساز. با هدف کدنویس.",
    mottoSub: "ساختن آینده، هر commit یک قدم.",
    mottoFooter: "متعهد به تعالی، نوآوری و عبور از مرزهای ممکن.",
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
    experience: "تجربه",
    projects: "پروژه‌ها",
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 4: Social & Quick Action Links
// ──────────────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { Icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/in/HamiParsa" },
  { Icon: Github, name: "GitHub", href: "https://github.com/HamiParsa" },
  { Icon: Send, name: "Telegram", href: "https://t.me/HamiParsa" },
  { Icon: Globe, name: "Website", href: "https://hamiparsa.github.io/Profile-Bio/" },
  { Icon: Instagram, name: "Instagram", href: "https://www.instagram.com/hamii.parsa" },
] as const;

const QUICK_ACTIONS = [
  { icon: Github, label: "viewGitHub", href: "https://github.com/HamiParsa" },
  { icon: Linkedin, label: "viewLinkedIn", href: "https://www.linkedin.com/in/HamiParsa" },
  { icon: Send, label: "viewTelegram", href: "https://t.me/HamiParsa" },
] as const;

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 5: Neon Glow Card Component
// ──────────────────────────────────────────────────────────────────────────────

/**
 * A glassmorphism card with neon glow border effect
 * Used throughout the site for consistent styling
 */
function NeonCard({
  children,
  className = "",
  glowColor = THEME.colors.primary,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`
        relative p-6 rounded-2xl
        bg-[rgba(255,255,255,0.03)]
        backdrop-blur-[20px]
        border border-[rgba(255,255,255,0.06)]
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-500
        ${hover ? "hover:border-[rgba(139,92,246,0.3)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)]" : ""}
        ${className}
      `}
    >
      {/* Neon glow ring on hover */}
      {hover && (
        <div
          className="absolute -inset-2px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${glowColor}40, transparent, ${glowColor}20)`,
            filter: "blur(4px)",
          }}
        />
      )}
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 6: Main Component
// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  // ─── State ──────────────────────────────────────────────────────────────
  
  const [lang, setLang] = useState<Lang>("en");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Scroll Progress ──────────────────────────────────────────────────
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ─── Effects ──────────────────────────────────────────────────────────
  
  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as Lang | null;
    // eslint-disable-next-line
    if (saved === "fa") setLang("fa");
  }, []);

  useEffect(() => {
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────
  
  const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isFa = lang === "fa";
  const t = content[lang];
  const c = THEME.colors;

  // ─── Render ──────────────────────────────────────────────────────────
  
  return (
    <div
      ref={containerRef}
      dir={isFa ? "rtl" : "ltr"}
      className={`relative min-h-screen overflow-x-hidden ${
        isFa ? 'font-["Vazirmatn"]' : "font-sans"
      }`}
      style={{ background: c.bg, color: c.text }}
    >
      {/* ─── Particle Background ──────────────────────────────────────── */}
      <ParticleBackground />

      {/* ─── Mouse Follower Glow ──────────────────────────────────────── */}
      <div
        className="fixed pointer-events-none z-0 w-500px h-500px rounded-full blur-3xl opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${c.primary}40, transparent 70%)`,
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
      />

      {/* ─── Progress Bar ────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2px z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(to right, ${c.primary}, ${c.secondary}, ${c.accent})`,
          boxShadow: `0 0 30px ${c.primary}60`,
        }}
      />

      {/* ─── Navigation ────────────────────────────────────────────────── */}
      
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="relative">
          {/* Glow behind navbar */}
          <div
            className="absolute -inset-1 rounded-2xl blur-2xl opacity-30"
            style={{
              background: `linear-gradient(to right, ${c.primary}30, ${c.secondary}30, ${c.accent}30)`,
            }}
          />
          
          {/* Navbar glass */}
          <div
            className="relative flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-[20px] border"
            style={{
              background: "rgba(10, 10, 15, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "skillsLink", "contactLink"].map((key) => (
                <a
                  key={key}
                  href={`#${key === "home" ? "home" : key === "skillsLink" ? "skills" : "contact"}`}
                  className="text-xs text-[#94A3B8] hover:text-[#E2E8F0] transition-all duration-300 tracking-[0.15em] font-medium uppercase relative group"
                >
                  {t[key as keyof typeof t] as string}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-2px transition-all duration-300 group-hover:w-full"
                    style={{ background: c.primary }}
                  />
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-[#E2E8F0] transition-all duration-300 group px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
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
                className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-2 p-4 rounded-2xl backdrop-blur-[20px] border md:hidden"
              style={{
                background: "rgba(10, 10, 15, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <div className="flex flex-col gap-3">
                {["home", "skillsLink", "contactLink"].map((key) => (
                  <a
                    key={key}
                    href={`#${key === "home" ? "home" : key === "skillsLink" ? "skills" : "contact"}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    {t[key as keyof typeof t] as string}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Main Content ────────────────────────────────────────────────── */}
      
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        
        {/* ─── HERO ────────────────────────────────────────────────────── */}
        
        <section id="home" className="min-h-[80vh] flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative shrink-0 group"
            style={{ perspective: "1000px" }}
          >
            {/* Animated rings */}
            <div
              className="absolute -inset-8 rounded-full animate-spin-slow"
              style={{
                border: `1px solid ${c.primary}30`,
              }}
            />
            <div
              className="absolute -inset-16 rounded-full animate-spin-reverse"
              style={{
                border: `1px solid ${c.secondary}20`,
                animationDuration: "25s",
              }}
            />
            <div
              className="absolute -inset-24 rounded-full animate-spin-slow"
              style={{
                border: `1px solid ${c.accent}15`,
                animationDuration: "30s",
              }}
            />

            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle, ${c.primary}60, ${c.secondary}30)`,
              }}
            />

            {/* Image */}
            <div
              className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 relative transform transition-transform duration-700 group-hover:scale-105"
              style={{
                borderColor: `${c.primary}50`,
                boxShadow: `0 0 60px ${c.primary}20`,
              }}
            >
              <Image
                width={800}
                height={800}
                src="https://avatars.githubusercontent.com/u/227557537?v=4"
                alt="Hami Parsa"
                className="w-full h-full object-cover"
                priority
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, ${c.primary}20, ${c.secondary}10)`,
                }}
              />
            </div>

            {/* Status Badge */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full flex items-center gap-2.5 backdrop-blur-md border text-xs font-bold whitespace-nowrap"
              style={{
                background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                color: "#0A0A0F",
                borderColor: `${c.primary}40`,
                boxShadow: `0 0 30px ${c.primary}40`,
              }}
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
              </div>
              {t.status}
            </div>
          </motion.div>

          {/* Text */}
          <div className={`flex-1 space-y-8 ${isFa ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              {/* Greeting */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${c.primary}50, transparent)`,
                  }}
                />
                <p className="text-xl" style={{ color: `${c.primary}80` }}>
                  {t.greeting}
                </p>
                <div
                  className="w-12 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${c.primary}50, transparent)`,
                  }}
                />
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${c.primary}, ${c.secondary}, ${c.accent})`,
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {t.name}
                </span>
              </h1>

              {/* Title */}
              <p className="text-xl md:text-2xl text-[#94A3B8]">
                {t.age} •{" "}
                <span style={{ color: c.primary }}>Full-Stack Developer</span>
              </p>
            </motion.div>

            {/* About */}
            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-base leading-relaxed text-[#94A3B8] max-w-2xl whitespace-pre-line"
              >
                {t.about}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
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
                  className="px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                    color: "#0A0A0F",
                    boxShadow: `0 0 30px ${c.primary}30`,
                  }}
                >
                  <Send size={16} />
                  {t.getInTouch}
                </motion.button>
              </a>
              <a href="#skills">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94A3B8",
                  }}
                >
                  <Code2 size={16} className="inline mr-2" />
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
                <div
                  className="w-12 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${c.primary}30, transparent)`,
                  }}
                />
                <p className="uppercase tracking-[0.2em] text-xs" style={{ color: `${c.primary}40` }}>
                  {t.connect}
                </p>
                <div
                  className="w-12 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${c.primary}30, transparent)`,
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ Icon, name, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Icon size={18} className="text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors" />
                    <span className="text-sm text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors">
                      {name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── MOTTO ──────────────────────────────────────────────────── */}
        
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: c.primary }}
            />
            <div
              className="w-64 h-64 rounded-full blur-3xl opacity-20 absolute"
              style={{ background: c.secondary }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border mb-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <Sparkles size={14} style={{ color: c.primary }} />
              <span className="text-xs text-[#94A3B8] font-mono tracking-widest">✦ MOTTO</span>
            </div>

            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-[#E2E8F0]">
              {t.motto}
              <span className="block text-[#94A3B8] text-2xl md:text-3xl mt-3">
                {t.mottoSub}
              </span>
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[#94A3B8]/30">
              <span>— Hami Parsa</span>
              <span className="w-px h-4 bg-[#94A3B8]/10" />
              <span className="font-mono tracking-widest text-[10px]">2025</span>
            </div>
          </div>
        </motion.section>

        {/* ─── STATUS & QUICK ACTIONS ────────────────────────────────── */}
        
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <NeonCard glowColor={c.primary}>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <span className="text-xs font-mono text-[#94A3B8]/50 tracking-widest">
                  {t.statusTitle}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#E2E8F0] mb-3">
                {t.statusHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Node.js", "Django", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[10px] font-mono rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#94A3B8",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </NeonCard>

            {/* Quick Actions */}
            <NeonCard glowColor={c.secondary}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={14} className="text-[#94A3B8]/30" />
                <span className="text-xs font-mono text-[#94A3B8]/50 tracking-widest">
                  {t.quickActions}
                </span>
              </div>
              <div className="space-y-2">
                {QUICK_ACTIONS.map((item, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ x: 4 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <item.icon size={16} className="text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors" />
                    <span className="text-sm text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors">
                      {t[item.label as keyof typeof t] as string}
                    </span>
                  </motion.a>
                ))}
              </div>
            </NeonCard>
          </div>
        </motion.section>

        {/* ─── SKILLS ──────────────────────────────────────────────────── */}
        
        <section id="skills" className="relative pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${c.primary}, ${c.secondary}, ${c.accent})`,
                  WebkitBackgroundClip: "text",
                }}
              >
                {t.skills}
              </span>
            </h2>
            <p className="text-center text-[#94A3B8]/50 text-sm mb-12">
              {t.expertise} • {t.techStack}
            </p>

            {/* Tech Categories */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {t.techCategories.map((category, idx) => (
                  <NeonCard key={idx} glowColor={c.primary}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <category.icon size={20}  />
                      </div>
                      <span className="text-sm font-semibold text-[#E2E8F0]">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <tech.icon size={14} className={tech.color} />
                          <span className="text-[10px] text-[#94A3B8]">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </NeonCard>
                ))}
              </div>
            </div>

            {/* Skill Bars */}
            <h3 className="text-2xl font-semibold text-center mb-8 text-[#E2E8F0]/60">
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
                >
                  <NeonCard glowColor={c.primary} hover>
                    <div className="relative flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 ${skill.color}`}
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <skill.icon size={32} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-[#E2E8F0]">
                            {skill.name}
                          </span>
                          <span className={`text-sm font-bold ${skill.color}`}>
                            {skill.percent}%
                          </span>
                        </div>
                        {skill.description && (
                          <p className="text-[10px] text-[#94A3B8]/40 mb-1">
                            {skill.description}
                          </p>
                        )}
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full bg-linear-to-r ${skill.gradient} rounded-full`}
                            style={{
                              boxShadow: `0 0 20px ${c.primary}40`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── CONTACT ────────────────────────────────────────────────── */}
        
        <section id="contact" className="relative pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${c.primary}, ${c.secondary}, ${c.accent})`,
                  WebkitBackgroundClip: "text",
                }}
              >
                {t.contact}
              </span>
            </h2>
            <p className="text-center text-[#94A3B8]/50 text-sm mb-12">
              {t.getInTouch}
            </p>

            <ContactForm t={t} isFa={isFa} />
          </motion.div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      
      <footer
        className="relative z-10 border-t mt-12"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[#E2E8F0] font-semibold">
                  Hami<span style={{ color: c.primary }}>Parsa</span>
                </span>
                <p className="text-xs text-[#94A3B8]/30 font-mono tracking-widest">FULL-STACK</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/HamiParsa/About-Me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#94A3B8]/30 hover:text-[#E2E8F0] transition-colors flex items-center gap-2"
              >
                <Github size={14} />
                {t.repository}
              </a>
              <span className="text-[#94A3B8]/10">|</span>
              <span className="text-xs text-[#94A3B8]/20">
                {t.builtWith} <span style={{ color: c.primary }}>Love</span>
              </span>
            </div>

            <div className="flex gap-3">
              {[Github, Linkedin, Send, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <Icon size={16} className="text-[#94A3B8]/30 hover:text-[#E2E8F0] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-xs text-[#94A3B8]/20">
              © {new Date().getFullYear()} Hami Parsa
            </p>
            <p className="text-xs text-[#94A3B8]/10 font-mono tracking-widest">
              {t.openSource}
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Scroll to Top ────────────────────────────────────────────── */}
      
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl shadow-lg transition-all duration-300 group"
            style={{
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              boxShadow: `0 0 30px ${c.primary}40`,
            }}
          >
            <ChevronUp size={22} className="text-[#0A0A0F] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Global Styles ────────────────────────────────────────────── */}
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 25s linear infinite; }
        
        ::selection {
          background: ${c.primary}50;
          color: white;
        }
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${c.bg}; }
        ::-webkit-scrollbar-thumb {
          background: ${c.primary};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${c.secondary};
        }
      `}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 7: Contact Form
// ──────────────────────────────────────────────────────────────────────────────

function ContactForm({ t, isFa }: { t: Content; isFa: boolean }) {
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

  const c = THEME.colors;

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <label className={`block text-xs font-medium text-[#94A3B8]/50 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
            {t.nameLabel}
          </label>
          <div className="relative">
            <User size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-[#94A3B8]/20`} />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 rounded-xl text-[#E2E8F0] placeholder-[#94A3B8]/20 outline-none transition-all duration-300`}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${status === "error" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.06)"}`,
              }}
              placeholder={t.nameLabel}
              dir={isFa ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="relative group">
          <label className={`block text-xs font-medium text-[#94A3B8]/50 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
            {t.phoneLabel}
          </label>
          <div className="relative">
            <Phone size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-[#94A3B8]/20`} />
            <input
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              required
              className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 rounded-xl text-[#E2E8F0] placeholder-[#94A3B8]/20 outline-none transition-all duration-300`}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${status === "error" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.06)"}`,
              }}
              placeholder={t.phoneLabel}
              dir={isFa ? "rtl" : "ltr"}
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <label className={`block text-xs font-medium text-[#94A3B8]/50 mb-1.5 ${isFa ? "text-right" : "text-left"}`}>
          {t.messageLabel}
        </label>
        <div className="relative">
          <MessageSquare size={16} className={`absolute ${isFa ? "right-3" : "left-3"} top-3.5 text-[#94A3B8]/20`} />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={`w-full ${isFa ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} py-2.5 rounded-xl text-[#E2E8F0] placeholder-[#94A3B8]/20 outline-none transition-all duration-300 resize-none`}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${status === "error" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.06)"}`,
            }}
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
        className="relative w-full py-3.5 overflow-hidden group rounded-xl font-bold transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
          color: "#0A0A0F",
          boxShadow: `0 0 30px ${c.primary}30`,
        }}
      >
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
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