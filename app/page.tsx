"use client";

// ============================================================
// IMPORTS
// ============================================================

import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import {
  Github,
  Linkedin,
  Send,
  Mail,
  Phone,
  User,
  MessageSquare,
  Code2,
  Briefcase,
  Users,
  Award,
  Clock,
  Heart,
  ChevronUp,
  Sparkles,
  Menu,
  X,
  Globe,
  Layout,
  Server,
  HelpCircle,
  Crown,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { DiJavascript1, DiReact, DiGit } from "react-icons/di";
import { TbBrandTailwind } from "react-icons/tb";
import { RiSupabaseLine } from "react-icons/ri";
import { BiLogoMongodb } from "react-icons/bi";
import { FaNodeJs, FaPython } from "react-icons/fa";
import {SiExpress } from "react-icons/si";

// ============================================================
// CONFIGURATION - CRIMSON GOLD THEME
// ============================================================

const CONFIG = {
  colors: {
    bg: "#0A0A0A",
    bgSecondary: "#121212",
    bgCard: "rgba(255,255,255,0.04)",
    bgCardHover: "rgba(255,255,255,0.08)",
    text: "#FFFFFF",
    textPrimary: "#F5F5F5",
    textSecondary: "#D4D4D4",
    textMuted: "#A3A3A3",
    textDim: "#737373",
    primary: "#DC2626", // Crimson Red
    primaryDark: "#991B1B",
    primaryLight: "#EF4444",
    secondary: "#F59E0B", // Gold
    secondaryLight: "#FBBF24",
    accent: "#FCD34D", // Light Gold
    border: "rgba(255,255,255,0.06)",
    borderLight: "rgba(255,255,255,0.1)",
    glow: "rgba(220, 38, 38, 0.2)",
    glowGold: "rgba(245, 158, 11, 0.2)",
  },
  nav: {
    en: ["Home", "Skills", "Services", "Timeline", "FAQ", "Contact"],
    fa: ["خانه", "مهارت‌ها", "خدمات", "تایم‌لاین", "سوالات", "تماس"],
  },
  content: {
    en: {
      greeting: "Hey, I'm",
      name: "Hami Parsa",
      title: "Full-Stack Developer",
      titleWords: ["Developer", "Designer", "Creator", "Innovator"],
      age: "20",
      bio: [
        "Building elegant, high-performance applications with modern web technologies.",
        "Passionate about clean code, AI integration, and pushing the boundaries.",
        "I believe in writing code that tells a story and solves real problems.",
      ],
      status: "Open to work",
      skillsTitle: "Skills & Expertise",
      servicesTitle: "My Services",
      servicesSub: "What I can do for you",
      timelineTitle: "Learning Journey",
      timelineSub: "My path to becoming a developer",
      faqTitle: "FAQ",
      faqSub: "Answers to common questions",
      contactTitle: "Get in Touch",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      messageLabel: "Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! ✓",
      error: "Something went wrong. Please try again.",
      viewWork: "View Work",
      motto: "Build with purpose. Code with passion.",
      builtWith: "Built with",
      openSource: "OPEN SOURCE",
      repository: "View Repository",
      quickActions: "Quick Actions",
      viewGitHub: "View GitHub",
      viewLinkedIn: "View LinkedIn",
      statusTitle: "Current Status",
      statusActive: "Available for projects",
      techStack: "Tech Stack",
      allSkills: "All Skills",
      viewProject: "View Project",
      viewCode: "View Code",
      loading: "Loading...",
      stats: {
        projects: "Projects",
        experience: "Experience",
        clients: "Clients",
        commits: "Commits",
      },
    },
    fa: {
      greeting: "سلام، من",
      name: "حامی پارسا",
      title: "توسعه‌دهنده فول‌استک",
      titleWords: ["توسعه‌دهنده", "طراح", "خلاق", "نوآور"],
      age: "۲۰",
      bio: [
        "ساخت اپلیکیشن‌های زیبا و با عملکرد بالا با تکنولوژی‌های مدرن.",
        "علاقه‌مند به کدنویسی تمیز، هوش مصنوعی و عبور از مرزهای ممکن.",
        "به کدی که داستان بگه و مشکلات واقعی رو حل کنه باور دارم.",
      ],
      status: "آماده همکاری",
      skillsTitle: "مهارت‌ها و تخصص",
      servicesTitle: "خدمات من",
      servicesSub: "چیزی که می‌تونم برات انجام بدم",
      timelineTitle: "مسیر یادگیری",
      timelineSub: "مسیر من برای تبدیل شدن به یک توسعه‌دهنده",
      faqTitle: "سوالات متداول",
      faqSub: "پاسخ به سوالات پرتکرار",
      contactTitle: "در ارتباط باش",
      nameLabel: "نام شما",
      phoneLabel: "شماره تماس",
      messageLabel: "پیام",
      submit: "ارسال پیام",
      sending: "در حال ارسال...",
      success: "پیام با موفقیت ارسال شد ✓",
      error: "مشکلی پیش آمد. دوباره امتحان کنید.",
      viewWork: "مشاهده کارها",
      motto: "با هدف بساز. با شوق کدنویس.",
      builtWith: "ساخته شده با",
      openSource: "متن‌باز",
      repository: "مشاهده ریپازیتوری",
      quickActions: "دسترسی سریع",
      viewGitHub: "مشاهده گیت‌هاب",
      viewLinkedIn: "مشاهده لینکدین",
      statusTitle: "وضعیت فعلی",
      statusActive: "در دسترس برای پروژه",
      techStack: "تکنولوژی‌ها",
      allSkills: "همه مهارت‌ها",
      viewProject: "مشاهده پروژه",
      viewCode: "مشاهده کد",
      loading: "در حال بارگذاری...",
      stats: {
        projects: "پروژه",
        experience: "تجربه",
        clients: "مشتری",
        commits: "کامیت",
      },
    },
  },
  skills: [
    { name: "JavaScript / TypeScript", percent: 88, icon: DiJavascript1, color: "#F7DF1E" },
    { name: "React / Next.js", percent: 85, icon: DiReact, color: "#61DAFB" },
    { name: "Tailwind CSS", percent: 92, icon: TbBrandTailwind, color: "#06B6D4" },
    { name: "Node.js", percent: 80, icon: FaNodeJs, color: "#339933" },
    { name: "Express.js", percent: 85, icon: SiExpress, color: "#FFFFFF" },
    { name: "Python / Django", percent: 75, icon: FaPython, color: "#3776AB" },
    { name: "MongoDB", percent: 85, icon: BiLogoMongodb, color: "#47A248" },
    { name: "Supabase", percent: 72, icon: RiSupabaseLine, color: "#3ECF8E" },
    { name: "Git / GitHub", percent: 94, icon: DiGit, color: "#F05032" },
  ],
  services: {
    en: [
      {
        title: "Web Development",
        desc: "Full-stack web applications with Next.js, React, Node.js, and Django.",
        icon: Code2,
      },
      {
        title: "UI/UX Design",
        desc: "Beautiful, responsive interfaces with Tailwind CSS and Framer Motion.",
        icon: Layout,
      },
      {
        title: "API & Backend",
        desc: "RESTful APIs, authentication, databases, and cloud deployment.",
        icon: Server,
      },
    ],
    fa: [
      {
        title: "توسعه وب",
        desc: "اپلیکیشن‌های فول‌استک با Next.js، React، Node.js و Django",
        icon: Code2,
      },
      {
        title: "طراحی UI/UX",
        desc: "رابط‌های زیبا و ریسپانسیو با Tailwind CSS و Framer Motion",
        icon: Layout,
      },
      {
        title: "API و بک‌اند",
        desc: "APIهای RESTful، احراز هویت، پایگاه داده و استقرار در ابر",
        icon: Server,
      },
    ],
  },
  timeline: {
    en: [
      {
        year: "2021",
        title: "Started Coding",
        desc: "Began learning HTML, CSS, and JavaScript fundamentals.",
        icon: Code2,
      },
      {
        year: "2022",
        title: "React & Frontend",
        desc: "Mastered React, Next.js, and modern frontend development.",
        icon: DiReact,
      },
      {
        year: "2023",
        title: "Backend & Databases",
        desc: "Learned Node.js, Python, Django, MongoDB, and SQL databases.",
        icon: Server,
      },
      {
        year: "2024",
        title: "Full-Stack Professional",
        desc: "Built real-world applications and started freelancing.",
        icon: Crown,
      },
    ],
    fa: [
      {
        year: "۲۰۲۱",
        title: "شروع کدنویسی",
        desc: "شروع یادگیری HTML، CSS و مبانی JavaScript",
        icon: Code2,
      },
      {
        year: "۲۰۲۲",
        title: "React و فرانت‌اند",
        desc: "تسلط بر React، Next.js و توسعه فرانت‌اند مدرن",
        icon: DiReact,
      },
      {
        year: "۲۰۲۳",
        title: "بک‌اند و پایگاه داده",
        desc: "یادگیری Node.js، Python، Django، MongoDB و پایگاه داده",
        icon: Server,
      },
      {
        year: "۲۰۲۴",
        title: "توسعه‌دهنده فول‌استک حرفه‌ای",
        desc: "ساخت اپلیکیشن‌های واقعی و شروع فریلنسینگ",
        icon: Crown,
      },
    ],
  },
  faq: {
    en: [
      {
        q: "What technologies do you work with?",
        a: "Next.js, React, TypeScript, Tailwind, Node.js, Python, Django, MongoDB, Supabase, and more.",
      },
      {
        q: "Do you work remotely?",
        a: "Yes! I'm available for remote work worldwide.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on scope. Simple site: 1-2 weeks. Complex apps: 4-8 weeks.",
      },
      {
        q: "Do you offer post-launch support?",
        a: "Absolutely. I provide maintenance, updates, and support after launch.",
      },
    ],
    fa: [
      {
        q: "با چه تکنولوژی‌هایی کار می‌کنی؟",
        a: "Next.js، React، TypeScript، Tailwind، Node.js، Python، Django، MongoDB، Supabase و بیشتر.",
      },
      {
        q: "دورکاری هم قبول می‌کنی؟",
        a: "بله! برای کارهای دورکاری در سراسر جهان در دسترس هستم.",
      },
      {
        q: "هر پروژه چقدر زمان می‌بره؟",
        a: "به بزرگی پروژه بستگی داره. سایت ساده: ۱-۲ هفته. اپلیکیشن‌های پیچیده: ۴-۸ هفته.",
      },
      {
        q: "پشتیبانی بعد از راه‌اندازی هم داری؟",
        a: "قطعاً. نگهداری، بروزرسانی و پشتیبانی بعد از راه‌اندازی رو ارائه می‌دم.",
      },
    ],
  },
  social: [
    { icon: Github, href: "https://github.com/HamiParsa" },
    { icon: Linkedin, href: "https://linkedin.com/in/HamiParsa" },
    { icon: Send, href: "https://t.me/HamiParsa" },
    { icon: Globe, href: "https://hamiparsa.github.io/Profile-Bio/" },
  ],
};

// ============================================================
// LOADING SCREEN
// ============================================================

function LoadingScreen() {
  const c = CONFIG.colors;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center"
      style={{ background: c.bg }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div
          className="w-24 h-24 rounded-full border-4 flex items-center justify-center"
          style={{
            borderColor: `${c.primary}30`,
            borderTopColor: c.primary,
            borderRightColor: c.secondary,
            animation: "spin 1s linear infinite",
          }}
        >
          <span className="text-3xl font-black" style={{ color: c.primary }}>
            H
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl font-bold" style={{ color: c.text }}>
          Hami<span style={{ color: c.primary }}>Parsa</span>
        </h2>
        <p className="text-sm mt-2" style={{ color: c.textMuted }}>
          {CONFIG.content.en.loading}
        </p>
        <div className="mt-4 flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-2 h-2 rounded-full"
              style={{ background: c.secondary }}
            />
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
}

// ============================================================
// STATIC BACKGROUND
// ============================================================

function StaticBackground() {
  const c = CONFIG.colors;

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0" style={{ background: c.bg }} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${c.primary}08, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: c.primary }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: c.secondary }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: c.accent }}
      />
    </div>
  );
}

// ============================================================
// CIRCULAR PROGRESS
// ============================================================

function CircularProgress({
  percent,
  color,
  size = 80,
  label,
  icon: Icon,
}: {
  percent: number;
  color: string;
  size?: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const c = CONFIG.colors;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="p-4 rounded-2xl text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
      style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
    >
      <div className="relative" style={{ width: size, height: size, margin: "0 auto" }}>
        <svg className="w-full h-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: isVisible ? offset : circumference,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 12px ${color}30)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-xs font-medium" style={{ color: c.textSecondary }}>
          {label}
        </span>
        <div className="text-sm font-bold" style={{ color: isVisible ? color : c.textDim }}>
          {isVisible ? percent : 0}%
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TYPEWRITER
// ============================================================

function TypewriterNeon({
  words,
  speed = 120,
  delay = 2500,
}: {
  words: string[];
  speed?: number;
  delay?: number;
}) {
  const [currentWord, setCurrentWord] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const colors = [CONFIG.colors.primary, CONFIG.colors.secondary, CONFIG.colors.accent];

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullWord = words[currentWord];
        const currentLength = text.length;

        if (!isDeleting) {
          if (currentLength < fullWord.length) {
            setText(fullWord.substring(0, currentLength + 1));
          } else {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (currentLength > 0) {
            setText(fullWord.substring(0, currentLength - 1));
          } else {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentWord, words, speed, delay]);

  const currentColor = colors[currentWord % colors.length];

  return (
    <span className="text-xl font-bold" style={{ color: currentColor, textShadow: `0 0 30px ${currentColor}30` }}>
      {text}
      <span className="inline-block w-0.5 h-6 ml-1 animate-pulse" style={{ background: currentColor }} />
    </span>
  );
}

// ============================================================
// CONTACT FORM
// ============================================================
// eslint-disable-next-line
function ContactForm({ t }: { t: any; isFa: boolean }) {
  const [form, setForm] = useState({ name: "", number: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const c = CONFIG.colors;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await emailjs.send("service_np5zft2", "template_m9immuc", form, "q1s3x3DSUxpAVErUh");
      setStatus("success");
      setForm({ name: "", number: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: c.textMuted }}>
            {t.nameLabel}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: c.textMuted }} />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                color: c.text,
              }}
              placeholder={t.nameLabel}
            />
          </div>
        </div>

        <div>
          <label className="block  text-xs font-medium mb-1.5" style={{ color: c.textMuted }}>
            {t.phoneLabel}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: c.textMuted }} />
            <input
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              required
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                color: c.text,
              }}
              placeholder={t.phoneLabel}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: c.textMuted }}>
          {t.messageLabel}
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3.5 w-4 h-4" style={{ color: c.textMuted }} />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
            style={{
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              color: c.text,
            }}
            placeholder={t.messageLabel}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full py-3.5 rounded-xl font-bold transition-all duration-300 overflow-hidden group"
        style={{
          background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
          color: "#0A0A0A",
          boxShadow: `0 0 40px ${c.glow}`,
        }}
      >
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)" }}
        />
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm"
            style={{ color: "#22c55e" }}
          >
            {t.success}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm"
            style={{ color: "#ef4444" }}
          >
            {t.error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ============================================================
// SERVICES SECTION
// ============================================================
// eslint-disable-next-line
function ServicesSection({ t, isFa }: { t: any; isFa: boolean }) {
  const c = CONFIG.colors;
  const services = isFa ? CONFIG.services.fa : CONFIG.services.en;

  return (
    <section id="services" className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: c.text }}>
            {t.servicesTitle}
          </h2>
          <p className="mt-2 text-sm" style={{ color: c.textMuted }}>
            {t.servicesSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl text-center backdrop-blur-sm transition-all duration-300"
              style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
            >
              <service.icon className="w-10 h-10 mx-auto mb-4" style={{ color: c.primary }} />
              <h3 className="text-lg font-bold" style={{ color: c.text }}>
                {service.title}
              </h3>
              <p className="text-sm mt-2" style={{ color: c.textMuted }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// TIMELINE SECTION
// ============================================================
// eslint-disable-next-line
function TimelineSection({ t, isFa }: { t: any; isFa: boolean }) {
  const c = CONFIG.colors;
  const timeline = isFa ? CONFIG.timeline.fa : CONFIG.timeline.en;

  return (
    <section id="timeline" className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: c.text }}>
            {t.timelineTitle}
          </h2>
          <p className="mt-2 text-sm" style={{ color: c.textMuted }}>
            {t.timelineSub}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {i < timeline.length - 1 && (
                <div
                  className="absolute left-29px top-64px w-2px h-[calc(100%-60px)]"
                  style={{ background: `linear-gradient(to bottom, ${c.primary}, ${c.secondary}50)` }}
                />
              )}

              {/* Year badge */}
              <div
                className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold z-10"
                style={{
                  background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                  color: "#0A0A0A",
                  boxShadow: `0 0 30px ${c.glow}`,
                }}
              >
                {item.year}
              </div>

              {/* Content */}
              <div
                className="flex-1 p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" style={{ color: c.primary }} />
                  <h3 className="text-lg font-bold" style={{ color: c.text }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm mt-2" style={{ color: c.textMuted }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// FAQ SECTION
// ============================================================
// eslint-disable-next-line
function FAQSection({ t, isFa }: { t: any; isFa: boolean }) {
  const c = CONFIG.colors;
  const faqs = isFa ? CONFIG.faq.fa : CONFIG.faq.en;

  return (
    <section id="faq" className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: c.text }}>
            {t.faqTitle}
          </h2>
          <p className="mt-2 text-sm" style={{ color: c.textMuted }}>
            {t.faqSub}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:translate-x-1"
              style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: c.primary }} />
                <div>
                  <div className="font-bold text-sm" style={{ color: c.text }}>
                    {item.q}
                  </div>
                  <div className="text-sm mt-1" style={{ color: c.textMuted }}>
                    {item.a}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Home() {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const c = CONFIG.colors;
  const t = CONFIG.content[lang];
  const isFa = lang === "fa";
  const navItems = isFa ? CONFIG.nav.fa : CONFIG.nav.en;
  const navHrefs = isFa
    ? ["#home", "#skills", "#services", "#timeline", "#faq", "#contact"]
    : ["#home", "#skills", "#services", "#timeline", "#faq", "#contact"];

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as "en" | "fa" | null;
// eslint-disable-next-line
    if (saved === "fa") setLang("fa");

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      ref={containerRef}
      dir={isFa ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden"
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: isFa ? "Vazirmatn, sans-serif" : "Geist, system-ui, sans-serif",
      }}
    >
      <StaticBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-2px z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(to right, ${c.primary}, ${c.secondary}, ${c.accent})`,
          boxShadow: `0 0 20px ${c.glow}`,
        }}
      />

      {/* ==========================================================
          NAVIGATION
          ========================================================== */}

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div
          className="flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.7)",
            border: `1px solid ${c.border}`,
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <span className="text-lg font-black tracking-tight" style={{ color: c.text }}>
            H<span style={{ color: c.primary }}>.</span>Parsa
          </span>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((section, index) => (
              <a
                key={section}
                href={navHrefs[index]}
                className="text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 relative group"
                style={{ color: c.textMuted }}
              >
                {section}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-2px transition-all duration-300 group-hover:w-full"
                  style={{ background: c.primary }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105"
              style={{ background: c.bgCard, border: `1px solid ${c.border}`, color: c.textMuted }}
            >
              {isFa ? "EN" : "FA"}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl"
              style={{ background: c.bgCard }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 p-4 rounded-2xl backdrop-blur-xl md:hidden"
              style={{ background: "rgba(10,10,10,0.95)", border: `1px solid ${c.border}` }}
            >
              {navItems.map((section, index) => (
                <a
                  key={section}
                  href={navHrefs[index]}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ color: c.textMuted }}
                >
                  {section}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==========================================================
          MAIN CONTENT
          ========================================================== */}

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* ==========================================================
            HERO SECTION
            ========================================================== */}

        <section id="home" className="min-h-[70vh] flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative shrink-0 group"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-spin-slow"
                style={{
                  border: `1px solid ${c.primary}${20 + i * 10}`,
                  inset: -((i + 1) * 20),
                  animationDuration: `${20 + i * 5}s`,
                  animationDirection: i % 2 === 0 ? "normal" : "reverse",
                }}
              />
            ))}

            <div
              className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 transition-transform duration-700 group-hover:scale-105"
              style={{ borderColor: `${c.primary}40`, boxShadow: `0 0 60px ${c.glow}` }}
            >
              <Image
                width={400}
                height={400}
                src="https://avatars.githubusercontent.com/u/227557537?v=4"
                alt="Hami Parsa"
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2.5"
              style={{
                background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                color: "#0A0A0A",
                boxShadow: `0 0 40px ${c.glow}`,
              }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t.status}
            </div>
          </motion.div>

          <div className={`flex-1 space-y-6 ${isFa ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${c.primary}50, transparent)` }}
                />
                <p className="text-lg" style={{ color: c.textMuted }}>
                  {t.greeting}
                </p>
                <div
                  className="w-12 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${c.primary}50, transparent)` }}
                />
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mt-4" style={{ color: c.text }}>
                {t.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-xl" style={{ color: c.textMuted }}>
                  {t.age} •
                </span>
                <TypewriterNeon words={t.titleWords} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 max-w-xl"
            >
              {t.bio.map((line: string, i: number) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: c.textMuted }}>
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a href="#contact">
                <button
                  className="relative px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
                    color: "#0A0A0A",
                    boxShadow: `0 0 40px ${c.glow}`,
                  }}
                >
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)" }}
                  />
                </button>
              </a>
              <a href="#services">
                <button
                  className="px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{ background: c.bgCard, border: `1px solid ${c.border}`, color: c.textMuted }}
                >
                  <Code2 className="inline w-4 h-4 mr-2" />
                  {t.viewWork}
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 pt-4"
            >
              {CONFIG.social.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: c.textMuted }} />
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================================
            MOTTO SECTION
            ========================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: c.primary }} />
          </div>

          <div className="relative text-center max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border mb-8"
              style={{ background: c.bgCard, borderColor: c.border }}
            >
              <Sparkles className="w-4 h-4" style={{ color: c.primary }} />
              <span className="text-xs tracking-[0.2em]" style={{ color: c.textMuted }}>
                MOTTO
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-light leading-[1.2]" style={{ color: c.text }}>
              Build with{" "}
              <span
                className="font-bold bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${c.primary}, ${c.secondary}, ${c.accent})`,
                  WebkitBackgroundClip: "text",
                }}
              >
                <TypewriterNeon words={["purpose", "passion", "love", "creativity"]} speed={150} delay={2000} />
              </span>
            </h2>

            <p className="mt-6 text-sm tracking-widest" style={{ color: c.textMuted }}>
              — Hami Parsa • 2025
            </p>
          </div>
        </motion.section>

        {/* ==========================================================
            STATS SECTION
            ========================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "20+", label: t.stats.projects, icon: Briefcase },
            { value: "3+", label: t.stats.experience, icon: Award },
            { value: "15+", label: t.stats.clients, icon: Users },
            { value: "500+", label: t.stats.commits, icon: Clock },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
              style={{ background: c.bgCard, border: `1px solid ${c.border}` }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: c.primary }} />
              <div className="text-2xl font-bold" style={{ color: c.text }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: c.textMuted }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ==========================================================
            SKILLS SECTION
            ========================================================== */}

        <section id="skills" className="pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: c.text }}>
                {t.skillsTitle}
              </h2>
              <p className="mt-2 text-sm" style={{ color: c.textMuted }}>
                {t.techStack} • {t.allSkills}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {CONFIG.skills.map((skill, i) => (
                <CircularProgress
                  key={i}
                  percent={skill.percent}
                  color={skill.color}
                  label={skill.name}
                  icon={skill.icon}
                  size={100}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ==========================================================
            SERVICES SECTION
            ========================================================== */}

        <ServicesSection t={t} isFa={isFa} />

        {/* ==========================================================
            TIMELINE SECTION
            ========================================================== */}

        <TimelineSection t={t} isFa={isFa} />

        {/* ==========================================================
            FAQ SECTION
            ========================================================== */}

        <FAQSection t={t} isFa={isFa} />

        {/* ==========================================================
            CONTACT SECTION
            ========================================================== */}

        <section id="contact" className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: c.text }}>
                {t.contactTitle}
              </h2>
            </div>

            <ContactForm t={t} isFa={isFa} />
          </motion.div>
        </section>
      </main>

      {/* ==========================================================
          FOOTER
          ========================================================== */}

      <footer className="relative z-10 border-t" style={{ borderColor: c.border }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black" style={{ color: c.text }}>
                H<span style={{ color: c.primary }}>.</span>Parsa
              </span>
              <span className="text-xs tracking-widest" style={{ color: c.textMuted }}>
                FULL-STACK
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/HamiParsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-2 transition-colors"
                style={{ color: c.textMuted }}
              >
                <Github className="w-4 h-4" />
                {t.repository}
              </a>
              <span className="text-xs" style={{ color: c.textMuted }}>
                {t.builtWith} <Heart className="inline w-3 h-3" style={{ color: c.primary }} />
              </span>
            </div>

            <span className="text-xs" style={{ color: c.textMuted }}>
              {t.openSource}
            </span>
          </div>
        </div>
      </footer>

      {/* ==========================================================
          SCROLL TO TOP
          ========================================================== */}

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              boxShadow: `0 0 40px ${c.glow}`,
            }}
          >
            <ChevronUp className="w-5 h-5" style={{ color: "#0A0A0A" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==========================================================
          GLOBAL STYLES
          ========================================================== */}

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        ::selection {
          background: ${c.primary}50;
          color: white;
        }
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${c.bg};
        }
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