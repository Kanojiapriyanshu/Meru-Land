"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Lucide icons ────────────────────────────────────────────────
import { ArrowUp, ArrowRight, Check } from "lucide-react";

// ─── Phosphor icons ──────────────────────────────────────────────
import {
    RocketLaunch,
    ChartLineUp,
    DeviceMobile,
    FilmSlate,
    PaintBrush,
    Lightning,
    MagnifyingGlass,
    PencilSimpleLine,
    Target,
    Gear,
    ChartBar,
    LinkedinLogo,
    InstagramLogo,
    Sparkle,
    MapPin,
    Envelope,
    Globe,
} from "@phosphor-icons/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCard {
    id: string;
    name: string;
    tagline: string;
    description: string;
    featured: boolean;
    url?: string;
    icon: ReactNode;
    colSpan: string;
    wide?: boolean;
}

interface WorkflowStep {
    step: string;
    title: string;
    duration: string;
    description: string;
    icon: ReactNode;
    accent: boolean;
}

interface CollabFeature {
    num: string;
    icon: ReactNode;
    title: string;
    desc: string;
    cta: string;
    wide?: boolean;
}

interface HeroThumb {
    title: string;
    meta: string;
    src: string;
    alt: string;
    size?: "small" | "medium";
}

const NAV_ITEMS = [
    { href: "#collabglam", label: "CollabGlam" },
    { href: "#services", label: "Services" },
    { href: "#workflow", label: "Workflow" },
    { href: "#about", label: "About" },
] as const;

const HERO_WORDS = [
    { text: "Driving", accent: false },
    { text: "Digital", accent: false },
    { text: "Growth", accent: false },
    { text: "Through", accent: false },
    { text: "Marketing", accent: true },
    { text: "&", accent: true },
    { text: "Advertising", accent: true },
    { text: "Excellence.", accent: false },
];

const MARQUEE_ITEMS = [
    "Influencer Marketing",
    "Performance Advertising",
    "Social Media Growth",
    "Video Production",
    "Brand Strategy",
    "Marketing Automation",
    "Creator Discovery",
    "Campaign Analytics",
];

const HERO_PROOF_ITEMS = [
    { value: "5K+", label: "Creator network" },
    { value: "200+", label: "Campaigns delivered" },
    { value: "360°", label: "Ads · Video · Influencer" },
];

const HERO_THUMBS: HeroThumb[] = [
    {
        title: "Creator Shoots",
        meta: "UGC • Production",
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
        alt: "Creator team working on campaign production",
        size: "medium",
    },
    {
        title: "Brand Strategy",
        meta: "Planning • Growth",
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        alt: "Brand strategy meeting",
        size: "small",
    },
    {
        title: "Performance Tracking",
        meta: "Analytics • ROI",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Analytics dashboard and performance tracking",
        size: "medium",
    },
];

// ─── CollabGlam features — Phosphor icons ────────────────────────
const COLLAB_FEATURES: CollabFeature[] = [
    {
        num: "01",
        icon: <Target size={28} weight="duotone" />,
        title: "Creator Matching & Discovery",
        desc: "Precision-matched creators by audience demographics, engagement rate, niche, and brand affinity. No guesswork - just the right fit.",
        cta: "Explore platform",
    },
    {
        num: "02",
        icon: <Gear size={28} weight="duotone" />,
        title: "Campaign Workflows & Approvals",
        desc: "Briefs, timelines, content approvals, and creator coordination - all in one collaborative workspace. No scattered emails, no missed deadlines.",
        cta: "See workflows",
    },
    {
        num: "03",
        icon: <ChartBar size={28} weight="duotone" />,
        title: "Real-Time Performance Tracking",
        desc: "Measure creator performance, campaign ROI, reach, and learnings across every channel - with reports that actually tell a story. Built for teams that move fast.",
        cta: "View analytics",
        wide: true,
    },
];

// ─── Services — Phosphor icons ───────────────────────────────────
const SERVICES: ServiceCard[] = [
    {
        id: "influencer",
        name: "Influencer Campaign Management",
        tagline: "CollabGlam · Core Service",
        description:
            "End-to-end management of influencer campaigns - from creator selection and briefing to content approvals and detailed reporting.",
        featured: true,
        url: "https://collabglam.com",
        icon: <RocketLaunch size={22} weight="duotone" />,
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        id: "performance",
        name: "Performance Advertising",
        tagline: "Google & Meta Ads",
        description:
            "Performance-focused media planning and optimization across Google and Meta to drive measurable business outcomes.",
        featured: false,
        icon: <ChartLineUp size={22} weight="duotone" />,
        colSpan: "col-span-12 md:col-span-6",
    },
    {
        id: "social",
        name: "Social Media Growth",
        tagline: "Always-on Brand Presence",
        description:
            "Strategic content calendars, channel planning, and community building across key social platforms.",
        featured: false,
        icon: <DeviceMobile size={22} weight="duotone" />,
        colSpan: "col-span-12 sm:col-span-6 md:col-span-4",
    },
    {
        id: "video",
        name: "Video Production",
        tagline: "Creative Studio",
        description:
            "Concept-to-delivery video production for campaigns, brand stories, and social-first formats.",
        featured: false,
        icon: <FilmSlate size={22} weight="duotone" />,
        colSpan: "col-span-12 sm:col-span-6 md:col-span-4",
    },
    {
        id: "branding",
        name: "Branding & Design",
        tagline: "Identity & Visual Systems",
        description:
            "Brand identity, visual systems, and marketing design assets aligned to your growth goals.",
        featured: false,
        icon: <Sparkle size={22} weight="duotone" />,
        colSpan: "col-span-12 sm:col-span-6 md:col-span-4",
    },
    {
        id: "automation",
        name: "Marketing Automation & Analytics",
        tagline: "Data, Journeys & Insight",
        description:
            "CRM journeys, marketing automation, dashboards, and analytics to keep performance transparent and actionable.",
        featured: false,
        icon: <Lightning size={22} weight="duotone" />,
        colSpan: "col-span-12",
        wide: true,
    },
];

// ─── Workflow steps — Phosphor icons ────────────────────────────
const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        step: "01",
        title: "Discover",
        duration: "1–2 weeks",
        description:
            "Understand brand goals, target audience, existing channels, and campaign direction. We ask the questions others skip.",
        icon: <MagnifyingGlass size={24} weight="duotone" />,
        accent: false,
    },
    {
        step: "02",
        title: "Create",
        duration: "2–3 weeks",
        description:
            "Design content, creatives, influencer briefs, and a clear strategy roadmap for execution. Every asset, purposeful.",
        icon: <PencilSimpleLine size={24} weight="duotone" />,
        accent: false,
    },
    {
        step: "03",
        title: "Launch & Scale",
        duration: "Go-live",
        description:
            "Execute campaigns across digital channels, measure performance in real time, and scale what's driving results.",
        icon: <RocketLaunch size={24} weight="duotone" />,
        accent: true,
    },
];

const CAPABILITIES = [
    "Influencer Marketing Platforms",
    "Performance Growth Campaigns",
    "Creative Advertising Production",
    "Brand Strategy & Positioning",
    "Video & Animation Studio",
    "Data-Driven Marketing",
    "Technology & Product Engineering",
    "Creator Economy",
];

const easeCustom = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easeCustom, delay: i * 0.1 },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -56 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: easeCustom },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 56 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: easeCustom },
    },
};

function Reveal({
    children,
    className,
    direction = "up",
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    direction?: "up" | "left" | "right";
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-8% 0px" });
    const variant =
        direction === "left" ? fadeLeft : direction === "right" ? fadeRight : fadeUp;

    return (
        <motion.div
            ref={ref}
            variants={variant}
            custom={delay}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function CountUp({
    to,
    suffix = "",
    className,
}: {
    to: number;
    suffix?: string;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView || !ref.current) return;
        const el = ref.current;
        const dur = 1800;
        const start = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${Math.round(to * eased)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [inView, to, suffix]);

    return (
        <span ref={ref} className={className}>
            0{suffix}
        </span>
    );
}

function MagCard({
    children,
    className,
    index = 0,
    style,
}: {
    children: ReactNode;
    className?: string;
    index?: number;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-5% 0px" });

    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;

        gsap.to(el, {
            rotateY: x / 22,
            rotateX: -y / 22,
            scale: 1.015,
            transformPerspective: 900,
            duration: 0.4,
            ease: "power2.out",
        });
    }, []);

    const onLeave = useCallback(() => {
        gsap.to(ref.current, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
        });
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: easeCustom, delay: index * 0.08 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}

function HeroThumbCard({
    item,
    className = "",
}: {
    item: HeroThumb;
    className?: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -6, rotate: item.size === "small" ? -1.5 : 1.5 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className={`hero-thumb group rounded-[22px] border border-black/[0.08] bg-white/90 backdrop-blur-xl shadow-[0_18px_50px_rgba(17,24,39,0.10)] overflow-hidden ${className}`}
        >
            <div className="relative h-[110px] sm:h-[145px] lg:h-[175px]">
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
            <div className="p-4">
                <p className="syne text-[14px] font-bold text-[#111827] leading-tight">
                    {item.title}
                </p>
                <p className="mt-1 text-[12px] text-[#6B7280]">{item.meta}</p>
            </div>
        </motion.div>
    );
}

export default function Home() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [showBackTop, setShowBackTop] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [newsletterDone, setNewsletterDone] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [collabScramble, setCollabScramble] = useState("CollabGlam");

    const progressRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const heroWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const heroVisualRef = useRef<HTMLDivElement>(null);
    const collabWordmarkRef = useRef<HTMLDivElement>(null);
    const collabTaglineRef = useRef<HTMLDivElement>(null);
    const collabSubRef = useRef<HTMLDivElement>(null);
    const collabCtaRef = useRef<HTMLDivElement>(null);
    const wfLineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const heroParallaxY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            if (progressRef.current) {
                progressRef.current.style.width = `${v * 100}%`;
            }
        });
    }, [scrollYProgress]);

    useEffect(() => {
        const onScroll = () => {
            setNavScrolled(window.scrollY > 60);
            setShowBackTop(window.scrollY > 300);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = cursorRingRef.current;
        if (!cursor || !ring) return;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let raf: number;

        const onMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
        };

        document.addEventListener("mousemove", onMove);

        const tick = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            cursor.style.left = `${mx}px`;
            cursor.style.top = `${my}px`;
            ring.style.left = `${rx}px`;
            ring.style.top = `${ry}px`;
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        const expand = () => {
            ring.style.width = "56px";
            ring.style.height = "56px";
            ring.style.borderColor = "#F5C842";
            cursor.style.width = "6px";
            cursor.style.height = "6px";
        };

        const shrink = () => {
            ring.style.width = "36px";
            ring.style.height = "36px";
            ring.style.borderColor = "rgba(245,200,66,0.5)";
            cursor.style.width = "10px";
            cursor.style.height = "10px";
        };

        document.querySelectorAll("a, button, [role='button']").forEach((el) => {
            el.addEventListener("mouseenter", expand);
            el.addEventListener("mouseleave", shrink);
        });

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.15,
                defaults: { ease: "power4.out" },
            });

            const wordInners = heroWordRefs.current
                .filter(Boolean)
                .map((el) => el?.querySelector<HTMLSpanElement>(".word-inner"))
                .filter(Boolean);

            tl.fromTo(
                wordInners,
                { yPercent: 110, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.07 }
            );

            if (heroVisualRef.current) {
                tl.fromTo(
                    heroVisualRef.current,
                    { opacity: 0, x: 80, scale: 0.92 },
                    { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
                    "<0.2"
                );
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (collabWordmarkRef.current) {
                gsap.fromTo(
                    collabWordmarkRef.current,
                    { opacity: 0, scale: 0.78, y: 40 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.3,
                        ease: "expo.out",
                        scrollTrigger: { trigger: "#collabglam", start: "top 65%" },
                    }
                );
            }

            [collabTaglineRef, collabSubRef, collabCtaRef].forEach((r, i) => {
                if (!r.current) return;
                gsap.fromTo(
                    r.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.2 + i * 0.15,
                        scrollTrigger: { trigger: "#collabglam", start: "top 65%" },
                    }
                );
            });

            gsap.fromTo(
                ".cfp",
                { opacity: 0, y: 64 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.18,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".cfp-grid", start: "top 80%" },
                }
            );

            gsap.fromTo(
                ".cap-pill",
                { opacity: 0, scale: 0.75, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: { amount: 0.7, from: "center" },
                    duration: 0.55,
                    ease: "back.out(1.7)",
                    scrollTrigger: { trigger: "#capabilities", start: "top 78%" },
                }
            );

            if (wfLineRef.current) {
                gsap.fromTo(
                    wfLineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.4,
                        ease: "power2.inOut",
                        scrollTrigger: { trigger: "#workflow", start: "top 72%" },
                    }
                );
            }

            gsap.fromTo(
                ".wf-card",
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: { trigger: "#workflow", start: "top 75%" },
                }
            );

            gsap.fromTo(
                ".about-para",
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.15,
                    duration: 0.75,
                    ease: "power3.out",
                    scrollTrigger: { trigger: "#about", start: "top 78%" },
                }
            );

            document.querySelectorAll<HTMLElement>(".work-img-inner").forEach((img) => {
                gsap.to(img, {
                    yPercent: -12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.closest(".work-card"),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            gsap.to(".hero-img-wrap", {
                yPercent: -14,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const ORIGINAL = "CollabGlam";

    const startScramble = () => {
        let iter = 0;
        if (scrambleRef.current) clearInterval(scrambleRef.current);

        scrambleRef.current = setInterval(() => {
            setCollabScramble(
                ORIGINAL.split("")
                    .map((_, i) =>
                        i < iter ? ORIGINAL[i] : LETTERS[Math.floor(Math.random() * 26)]
                    )
                    .join("")
            );

            if (iter >= ORIGINAL.length) {
                clearInterval(scrambleRef.current!);
                setCollabScramble(ORIGINAL);
            }

            iter += 0.5;
        }, 40);
    };

    const stopScramble = () => {
        if (scrambleRef.current) clearInterval(scrambleRef.current);
        setCollabScramble(ORIGINAL);
    };

    const useMagnetic = () => {
        const ref = useRef<HTMLAnchorElement>(null);

        const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;

            gsap.to(el, {
                x: x * 0.28,
                y: y * 0.28,
                duration: 0.4,
                ease: "power2.out",
            });
        }, []);

        const onLeave = useCallback(() => {
            gsap.to(ref.current, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1,0.5)",
            });
        }, []);

        return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
    };

    const mag1 = useMagnetic();
    const mag2 = useMagnetic();
    const magCta = useMagnetic();

    return (
        <div
            className="min-h-screen bg-[#F8F8FA] text-[#111827] overflow-x-hidden"
            style={{ cursor: "none", fontFamily: "'Figtree', 'Inter', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { cursor: none !important; background: #F8F8FA; color: #111827; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F3F4F6; }
        ::-webkit-scrollbar-thumb { background: #F5C842; border-radius: 2px; }

        .word { display: inline-block; overflow: hidden; line-height: 1.1; }
        .word-inner { display: inline-block; }
        .syne { font-family: 'Syne', sans-serif; }
        .serif { font-family: 'DM Serif Display', serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-alt {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0px); }
        }
        @keyframes float-hero-a {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
        }
        @keyframes float-hero-b {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-14px) rotate(0deg); }
        }
        @keyframes float-hero-c {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.7); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.12); }
        }
        @keyframes float-hero-main {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-12px) rotate(-1deg); }
        }

        .float-hero-main { animation: float-hero-main 6.8s ease-in-out infinite; }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .float-1 { animation: float 4s ease-in-out infinite; }
        .float-2 { animation: float-alt 4s ease-in-out infinite; }
        .float-hero-a { animation: float-hero-a 6s ease-in-out infinite; }
        .float-hero-b { animation: float-hero-b 6.5s ease-in-out infinite; }
        .float-hero-c { animation: float-hero-c 5.5s ease-in-out infinite; }
        .pulse-dot { animation: pulse-gold 2s ease-in-out infinite; }
        .glow-orb { animation: glow-pulse 3s ease-in-out infinite; }

        .cfp { opacity: 0; }
        .cap-pill { opacity: 0; }
        .wf-card { opacity: 0; }
        .about-para { opacity: 0; }

        .hero-grid-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(17,24,39,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(17,24,39,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black 25%, transparent 80%);
          pointer-events: none;
        }
        .hero-thumb { will-change: transform; }
        .hero-proof-chip {
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(12px);
        }
      `}</style>

            {/* ── Custom cursor ─────────────────────────────────── */}
            <div
                ref={cursorRef}
                className="fixed z-[9999] pointer-events-none rounded-full bg-[#F5C842]"
                style={{
                    width: 10, height: 10, top: 0, left: 0,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s, height 0.3s",
                }}
            />
            <div
                ref={cursorRingRef}
                className="fixed z-[9998] pointer-events-none rounded-full"
                style={{
                    width: 36, height: 36, top: 0, left: 0,
                    border: "1.5px solid rgba(245,200,66,0.5)",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s, height 0.3s, border-color 0.3s",
                }}
            />

            {/* ── Scroll progress bar ───────────────────────────── */}
            <div
                ref={progressRef}
                className="fixed top-0 left-0 z-[1000] h-[2px]"
                style={{
                    width: "0%",
                    background: "linear-gradient(90deg, #C9A020, #F5C842, #FFE082)",
                    boxShadow: "0 0 12px #F5C842",
                }}
            />

            {/* ── Header ───────────────────────────────────────── */}
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: easeCustom }}
                className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-12 h-16 transition-all duration-300 ${navScrolled
                    ? "bg-white/90 backdrop-blur-2xl border-b border-black/[0.08]"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <Link href="#hero" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        className="w-9 h-9 rounded-[10px] bg-[#F5C842] flex items-center justify-center overflow-hidden shadow-lg"
                    >
                        <Image
                            src="/logo 2.jpg"
                            alt="Meru Land"
                            width={36}
                            height={36}
                            className="w-9 h-9 object-contain"
                            priority
                        />
                    </motion.div>
                    <div className="flex flex-col leading-tight">
                        <span className="syne text-[15px] font-bold text-[#111827] tracking-[0.05em]">MERU LAND</span>
                        <span className="text-[10px] text-[#9CA3AF] tracking-[0.1em] font-medium">Private Limited</span>
                    </div>
                </Link>

                <nav className="hidden lg:flex items-center gap-9">
                    {NAV_ITEMS.map((item, i) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                            className="relative text-[14px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors duration-300 group"
                        >
                            {item.label}
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#F5C842] transition-all duration-300 group-hover:w-full rounded-full" />
                        </motion.a>
                    ))}
                </nav>

                <motion.a
                    {...magCta}
                    href="#contact"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,200,66,0.35)" }}
                    whileTap={{ scale: 0.96 }}
                    className="syne hidden sm:inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[13px] px-6 py-2.5 rounded-full tracking-[0.02em] shadow-lg"
                >
                    Start a project
                    <ArrowRight size={14} />
                </motion.a>
            </motion.header>

            <main id="hero">
                {/* ── Hero ─────────────────────────────────────── */}
                <section
                    ref={heroRef}
                    className="hero-grid-bg relative min-h-[92vh] md:min-h-screen flex items-center pt-28 pb-14 md:pb-24 overflow-hidden"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(245,200,66,0.12) 0%, transparent 70%)",
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute left-[8%] top-[20%] h-40 w-40 rounded-full bg-[#F5C842]/10 blur-3xl" />
                        <div className="absolute right-[10%] top-[16%] h-56 w-56 rounded-full bg-[#F5C842]/12 blur-3xl" />
                        <div className="absolute right-[18%] bottom-[12%] h-44 w-44 rounded-full bg-[#111827]/[0.04] blur-3xl" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.02fr_1.08fr] gap-12 md:gap-6 lg:gap-8 items-center md:items-start">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="flex items-center gap-2.5 mb-8"
                                >
                                    <span className="pulse-dot w-2 h-2 rounded-full bg-[#F5C842] flex-shrink-0" />
                                    <span className="text-[12px] font-medium text-[#9CA3AF] tracking-[0.1em] uppercase">
                                        Digital Marketing · Advertising · Media
                                    </span>
                                </motion.div>

                                <h1 className="syne mb-7 text-[clamp(44px,6.2vw,86px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#111827] max-w-[720px]">
                                    {HERO_WORDS.map((w, i) => (
                                        <span
                                            key={i}
                                            className="word mr-[0.25em] mb-1"
                                            ref={(el) => { heroWordRefs.current[i] = el; }}
                                        >
                                            <span className={`word-inner ${w.accent ? "bg-gradient-to-r from-[#F5C842] to-[#FF9F0A] bg-clip-text text-transparent" : ""}`}>
                                                {w.text}
                                            </span>
                                        </span>
                                    ))}
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.7 }}
                                    className="text-[18px] leading-[1.8] text-[#6B7280] max-w-[560px] mb-10"
                                >
                                    Meru Land Pvt. Ltd. helps brands scale through creative strategy,
                                    performance campaigns, and influencer-powered storytelling — all in one orbit.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <motion.a
                                        {...mag1}
                                        href="#contact"
                                        whileTap={{ scale: 0.96 }}
                                        className="syne inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[15px] px-8 py-4 rounded-full shadow-lg tracking-[0.02em] transition-shadow hover:shadow-[0_16px_40px_rgba(245,200,66,0.30)]"
                                    >
                                        Let&apos;s collaborate
                                        <ArrowRight size={16} />
                                    </motion.a>

                                    <motion.a
                                        {...mag2}
                                        href="#services"
                                        whileTap={{ scale: 0.96 }}
                                        className="syne inline-flex items-center gap-2 border border-black/10 bg-white text-[#111827] font-bold text-[15px] px-8 py-4 rounded-full tracking-[0.02em] transition-all hover:border-[#F5C842]/50 hover:bg-[#F5C842]/[0.06]"
                                    >
                                        Explore services
                                        <ArrowRight size={16} />
                                    </motion.a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.25, duration: 0.65 }}
                                    className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[560px]"
                                >
                                    {HERO_PROOF_ITEMS.map((item) => (
                                        <motion.div
                                            key={item.label}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                            className="hero-proof-chip rounded-[18px] border border-black/[0.08] px-4 py-4 shadow-[0_10px_24px_rgba(17,24,39,0.06)]"
                                        >
                                            <p className="syne text-[20px] font-extrabold text-[#111827] leading-none">{item.value}</p>
                                            <p className="mt-1 text-[12px] text-[#6B7280]">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                ref={heroVisualRef}
                                style={{ y: heroParallaxY, opacity: heroOpacity }}
                                className="relative opacity-0 w-full max-w-[480px] sm:max-w-[680px] md:max-w-full mx-auto lg:mx-0 md:pt-10 lg:pt-0"
                            >
                                <div className="relative h-[380px] sm:h-[560px] md:h-[660px] lg:h-[820px]">
                                    {/* Left thumbnail column */}
                                    <div className="absolute left-[8px] sm:left-[12px] top-[28px] sm:top-[56px] hidden sm:flex flex-col gap-5 w-[150px] sm:w-[180px] lg:w-[210px] z-20">
                                        <HeroThumbCard item={HERO_THUMBS[0]} className="float-hero-a" />
                                        <HeroThumbCard item={HERO_THUMBS[1]} className="float-hero-b" />
                                        <HeroThumbCard item={HERO_THUMBS[2]} className="float-hero-c" />
                                    </div>

                                    {/* Main image card */}
                                    <div className="absolute right-[8px] sm:right-[8px] md:right-[12px] lg:right-[20px] top-[20px] sm:top-[56px] lg:top-[92px] w-[220px] sm:w-[320px] md:w-[390px] lg:w-[460px] max-w-[calc(100%-16px)] z-30 float-hero-main translate-x-60">
                                        <div className="hero-img-wrap relative aspect-[4/4.95] rounded-[32px] overflow-hidden shadow-[0_28px_70px_rgba(17,24,39,0.16)] border border-black/[0.08] bg-white">
                                            <img
                                                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
                                                alt="Marketing team collaborating"
                                                className="work-img-inner w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(17,24,39,0.08) 100%)" }} />

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.5, duration: 0.6 }}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                className="float-1 absolute bottom-4 left-4 bg-white/90 backdrop-blur-xl border border-black/[0.08] rounded-2xl px-4 py-3 shadow-xl"
                                            >
                                                <p className="text-[11px] text-[#9CA3AF] font-medium mb-1">Campaigns Delivered</p>
                                                <CountUp to={200} suffix="+" className="syne text-[18px] sm:text-[22px] lg:text-[26px] font-extrabold text-[#111827] leading-none" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.7, duration: 0.6 }}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                className="float-2 absolute top-4 right-4 bg-[#F5C842] rounded-2xl px-4 py-3 shadow-2xl"
                                            >
                                                <p className="text-[11px] text-black/70 font-medium mb-1">Creator Network</p>
                                                <CountUp to={5000} suffix="+" className="syne text-[18px] sm:text-[22px] lg:text-[26px] font-extrabold text-black leading-none" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Floating info cards */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.85, duration: 0.6 }}
                                        whileHover={{ y: -5 }}
                                        className="absolute left-[8px] sm:left-[28px] bottom-[8px] sm:bottom-[28px] hidden sm:block z-20 translate-x-60 -translate-y-14"
                                    >
                                        <div className="rounded-[18px] border border-black/[0.08] bg-white/92 backdrop-blur-xl px-4 py-3 shadow-[0_16px_40px_rgba(17,24,39,0.08)]">
                                            <p className="syne text-[12px] font-bold text-[#111827]">Social buzz rising</p>
                                            <p className="text-[12px] text-[#6B7280] mt-1">Short-form content • creator-led reach</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 26 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.95, duration: 0.6 }}
                                        whileHover={{ y: -5 }}
                                        className="absolute right-[8px] sm:right-[10px] lg:right-[20px] bottom-[8px] sm:bottom-[40px] hidden md:block z-40 translate-x-60 translate-y-14"
                                    >
                                        <div className="rounded-[18px] border border-black/[0.08] bg-[#111827] text-white px-5 py-4 shadow-[0_18px_44px_rgba(17,24,39,0.16)] ">
                                            <p className="syne text-[18px] font-extrabold leading-none">Ads • Video • Influencer</p>
                                            <p className="mt-1 text-[12px] text-white/70">One ecosystem for growth</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Marquee ───────────────────────────────────── */}
                <div className="border-y border-black/[0.06] bg-white py-5 overflow-hidden">
                    <div className="marquee-track flex gap-0 w-max">
                        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                            <span key={i} className="syne flex items-center gap-3 px-10 text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-[0.06em] whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] flex-shrink-0" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── CollabGlam ────────────────────────────────── */}
                <section id="collabglam" className="bg-white overflow-hidden">
                    <div className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <div className="glow-orb absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,200,66,0.14) 0%, transparent 70%)" }} />

                        <div className="relative z-10 w-full max-w-[1500px] mx-auto">
                            <Reveal>
                                <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-10">
                                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                    Influencer Marketing Platform
                                </span>
                            </Reveal>

                            <div
                                ref={collabWordmarkRef}
                                onMouseEnter={startScramble}
                                onMouseLeave={stopScramble}
                                className="syne font-extrabold leading-[0.9] tracking-[-0.055em] mb-6 select-none whitespace-nowrap"
                                style={{
                                    fontSize: "clamp(52px, 9vw, 132px)",
                                    background: "linear-gradient(180deg, #111827 0%, rgba(17,24,39,0.28) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    opacity: 0,
                                    cursor: "default",
                                }}
                            >
                                {collabScramble}
                            </div>

                            <div ref={collabTaglineRef} className="serif italic mb-6" style={{ fontSize: "clamp(18px, 2.8vw, 34px)", color: "#D29C00", opacity: 0 }}>
                                Connect. Create. Convert.
                            </div>

                            <p ref={collabSubRef} className="text-[17px] leading-[1.7] text-[#6B7280] max-w-[620px] mx-auto mb-12" style={{ opacity: 0 }}>
                                The platform that bridges brands and creators — making influencer marketing intelligent, measurable, and beautifully simple.
                            </p>

                            <div ref={collabCtaRef} className="flex flex-wrap gap-4 justify-center" style={{ opacity: 0 }}>
                                <motion.a
                                    href="https://collabglam.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(245,200,66,0.25)" }}
                                    whileTap={{ scale: 0.96 }}
                                    className="syne inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[15px] px-8 py-4 rounded-full shadow-lg tracking-[0.02em]"
                                >
                                    Visit CollabGlam.com
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                        <ArrowRight size={16} />
                                    </motion.span>
                                </motion.a>

                                <motion.a
                                    href="#contact"
                                    whileTap={{ scale: 0.96 }}
                                    className="syne inline-flex items-center gap-2 border border-black/10 bg-white text-[#111827] font-bold text-[15px] px-8 py-4 rounded-full tracking-[0.02em] transition-all hover:border-[#F5C842]/40"
                                >
                                    Partner with us
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    <div className="pb-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                        <div className="cfp-grid grid grid-cols-1 md:grid-cols-2 gap-0.5">
                            {COLLAB_FEATURES.map((feat, i) => (
                                <CollabFeaturePanel key={i} feat={feat} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Services ──────────────────────────────────── */}
                <section id="services" className="bg-[#F8F8FA] py-36">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <Reveal className="text-center mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Apps & Services
                            </span>
                            <h2 className="syne text-[clamp(36px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-5">
                                Everything your brand<br />needs to grow.
                            </h2>
                            <p className="text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                End-to-end digital marketing - from influencer campaigns to performance advertising and beyond.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-12 gap-4">
                            {SERVICES.map((svc, i) => (
                                <ServiceBentoCard key={svc.id} svc={svc} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Our Work ──────────────────────────────────── */}
                <section id="work" className="bg-[#F3F4F6] py-36 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <Reveal className="text-center mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Our Work
                            </span>
                            <h2 className="syne text-[clamp(36px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-5">
                                Creative excellence,<br />delivered.
                            </h2>
                            <p className="text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                Campaigns, productions, and brand experiences built with intention.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[
                                { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80", label: "Campaign Strategy & Planning", sub: "Brand · Digital · Performance" },
                                { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80", label: "Content & Media Reviews", sub: "Social · Influencer · Analytics" },
                                { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80", label: "Video Production Studio", sub: "Brand Films · Social Content" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ delay: i * 0.18, duration: 0.75, ease: easeCustom }}
                                    whileHover={{ y: -8 }}
                                    className="work-card group relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_18px_50px_rgba(17,24,39,0.15)] border border-black/[0.06]"
                                >
                                    <img src={item.src} alt={item.label} className="work-img-inner w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" loading="lazy" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(17,24,39,0.86) 100%)" }} />
                                    <div className="absolute inset-0 bg-[#F5C842]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-x-0 bottom-0 p-7">
                                        <p className="syne text-[16px] font-bold text-white leading-tight mb-1">{item.label}</p>
                                        <p className="text-[12px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Capabilities ──────────────────────────────── */}
                <section id="capabilities" className="bg-[#F3F4F6] py-28 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <Reveal className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Capabilities
                            </span>
                            <h2 className="syne text-[clamp(36px,5vw,68px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05]">
                                What we&apos;re<br />especially good at.
                            </h2>
                        </Reveal>

                        <div className="flex flex-wrap justify-center gap-3">
                            {CAPABILITIES.map((pill) => (
                                <motion.span
                                    key={pill}
                                    className="cap-pill syne border border-black/[0.08] bg-white px-7 py-3 rounded-full text-[14px] font-semibold text-[#6B7280] tracking-[0.02em] cursor-default select-none"
                                    whileHover={{ borderColor: "#F5C842", color: "#D29C00", backgroundColor: "rgba(245,200,66,0.08)", y: -3, scale: 1.04, boxShadow: "0 8px 28px rgba(17,24,39,0.10)" }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {pill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Workflow ──────────────────────────────────── */}
                <section id="workflow" className="bg-[#F8F8FA] py-36">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <Reveal className="text-center mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Process
                            </span>
                            <h2 className="syne text-[clamp(36px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-5">
                                A process built<br />for results.
                            </h2>
                            <p className="text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                Collaborative, clear, and crafted to move fast without missing what matters.
                            </p>
                        </Reveal>

                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="hidden md:block absolute top-[80px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-black/[0.08] z-0 overflow-hidden">
                                <div
                                    ref={wfLineRef}
                                    className="h-full origin-left"
                                    style={{ background: "linear-gradient(90deg, #C9A020, #F5C842)", boxShadow: "0 0 10px #F5C842", transform: "scaleX(0)" }}
                                />
                            </div>

                            {WORKFLOW_STEPS.map((wf) => (
                                <motion.div
                                    key={wf.step}
                                    className={`wf-card relative z-10 rounded-[24px] border p-11 ${wf.accent ? "border-[#F5C842]/35 bg-[linear-gradient(135deg,rgba(245,200,66,0.12)_0%,#ffffff_72%)]" : "border-black/[0.08] bg-white"}`}
                                    whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(17,24,39,0.10)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-5">Step {wf.step}</div>

                                    <motion.div
                                        whileHover={{ rotate: 12, scale: 1.12 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        className="w-14 h-14 rounded-[16px] bg-[#F5C842]/[0.10] border border-[#F5C842]/20 flex items-center justify-center text-[#D29C00] mb-7"
                                    >
                                        {wf.icon}
                                    </motion.div>

                                    <h3 className="syne text-[24px] font-extrabold text-[#111827] tracking-[-0.02em] mb-4">{wf.title}</h3>
                                    <p className="text-[15px] text-[#6B7280] leading-[1.7]">{wf.description}</p>
                                    <span className="inline-block mt-6 border border-black/[0.08] rounded-full px-4 py-1.5 text-[12px] text-[#9CA3AF] font-medium bg-[#F8F8FA]">{wf.duration}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── About ─────────────────────────────────────── */}
                <section id="about" className="bg-white py-36 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <Reveal>
                                    <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-8">
                                        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                        About Us
                                    </span>
                                </Reveal>

                                <Reveal>
                                    <h2 className="syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] text-[#111827] leading-[1.1] mb-10">
                                        The team behind<br />the growth.
                                    </h2>
                                </Reveal>

                                <div className="space-y-5">
                                    <p className="about-para text-[17px] leading-[1.8] text-[#6B7280]">
                                        Meru Land Pvt. Ltd. is a modern digital marketing and advertising company delivering end-to-end growth solutions through creative production, influencer collaborations, and performance-driven campaigns.
                                    </p>
                                    <p className="about-para text-[17px] leading-[1.8] text-[#6B7280]">
                                        We operate through specialized ventures, including{" "}
                                        <strong className="text-[#111827] font-semibold">Enoylity Media Creations</strong>{" "}
                                        — our dedicated creative and media production division focused on branding, video content, and digital storytelling.
                                    </p>
                                    <p className="about-para text-[17px] leading-[1.8] text-[#6B7280]">
                                        Together, Meru Land and its ventures help brands execute impactful marketing strategies that are consistent, measurable, and built for long-term growth.
                                    </p>
                                </div>

                                <div className="mt-10 flex flex-col gap-4">
                                    {[
                                        "Based in India · working with partners globally",
                                        "Available for select collaborations and long-term retainers",
                                        "Enoylity Media Creations — creative & media production arm",
                                    ].map((text, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -28 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: easeCustom }}
                                            className="flex items-center gap-4 text-[15px] text-[#6B7280]"
                                        >
                                            {/* ── Lucide Check icon ── */}
                                            <div className="w-7 h-7 rounded-full bg-[#F5C842]/10 border border-[#F5C842]/20 flex items-center justify-center flex-shrink-0 text-[#D29C00]">
                                                <Check size={13} strokeWidth={2.5} />
                                            </div>
                                            {text}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <Reveal direction="right">
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="row-span-2 rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover min-h-[360px]" loading="lazy" />
                                        </div>
                                        <div className="rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80" alt="Strategy" className="w-full h-full object-cover min-h-[168px]" loading="lazy" />
                                        </div>
                                        <div className="rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80" alt="Creative" className="w-full h-full object-cover min-h-[168px]" loading="lazy" />
                                        </div>
                                    </div>

                                    <motion.div
                                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#F5C842] rounded-[16px] px-6 py-4 text-center whitespace-nowrap shadow-[0_8px_40px_rgba(245,200,66,0.26)]"
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <span className="syne block text-[32px] font-extrabold text-black leading-none">5K+</span>
                                        <span className="text-[12px] font-semibold text-black/70">Creator Network</span>
                                    </motion.div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ── Contact ───────────────────────────────────── */}
                <section id="contact" className="bg-[#F8F8FA] py-36">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                            <div>
                                <Reveal>
                                    <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-4 py-1.5 rounded-full syne text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-8">
                                        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                        Get In Touch
                                    </span>
                                </Reveal>
                                <Reveal>
                                    <h2 className="syne text-[clamp(32px,4.5vw,60px)] font-extrabold tracking-[-0.03em] text-[#111827] leading-[1.08] mb-5">
                                        Ready to grow<br />your brand?
                                    </h2>
                                </Reveal>
                                <Reveal>
                                    <p className="text-[17px] text-[#6B7280] leading-relaxed max-w-[420px] mb-14">
                                        Tell us about your project and we&apos;ll follow up with next steps and a possible timeline.
                                    </p>
                                </Reveal>

                                <div className="flex flex-col gap-4">
                                    {[
                                        {
                                            icon: MapPin,
                                            label: "Location",
                                            value: "Radha Rani Palace, 1st Floor, Parikrama Marg, Vrindavan 281121, Uttar Pradesh, India",
                                        },
                                        {
                                            icon: Envelope,
                                            label: "Email",
                                            value: "info@meruland.com",
                                            link: "mailto:info@meruland.com",
                                        },
                                        {
                                            icon: Globe,
                                            label: "CollabGlam Platform",
                                            value: "collabglam.com",
                                            link: "https://collabglam.com",
                                        },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -24 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.6, ease: easeCustom }}
                                            whileHover={{ x: 6, borderColor: "rgba(245,200,66,0.25)" }}
                                            className="flex gap-5 items-start p-5 rounded-[16px] border border-black/[0.08] bg-white transition-all duration-300 shadow-[0_10px_24px_rgba(17,24,39,0.04)]"
                                        >
                                            <div className="w-10 h-10 rounded-[12px] bg-[#F5C842]/10 flex items-center justify-center text-[18px] flex-shrink-0">{<item.icon />}</div>
                                            <div>
                                                <p className="syne text-[11px] font-bold text-[#9CA3AF] tracking-[0.08em] uppercase mb-1">{item.label}</p>
                                                {item.link ? (
                                                    <a href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[15px] text-[#111827] font-medium hover:text-[#D29C00] transition-colors duration-300">{item.value}</a>
                                                ) : (
                                                    <p className="text-[15px] text-[#111827] font-medium">{item.value}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 56 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.9, ease: easeCustom }}
                                className="bg-white border border-black/[0.08] rounded-[28px] p-10 lg:p-14 shadow-[0_20px_60px_rgba(17,24,39,0.06)]"
                            >
                                <h3 className="syne text-[28px] font-extrabold text-[#111827] tracking-[-0.02em] mb-2">Tell us about your project</h3>
                                <p className="text-[15px] text-[#6B7280] mb-9 leading-relaxed">We read every message and respond within 1–2 business days.</p>

                                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {["Name", "Email"].map((field) => (
                                            <div key={field} className="flex flex-col gap-2">
                                                <label className="text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">{field} *</label>
                                                <input type={field === "Email" ? "email" : "text"} required placeholder={field === "Email" ? "you@company.com" : "Your name"} className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[12px] px-5 py-3.5 text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 placeholder:text-[#9CA3AF]" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">What are you looking to create?</label>
                                        <select defaultValue="Brand & digital experience" className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[12px] px-5 py-3.5 text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 appearance-none">
                                            <option>Brand &amp; digital experience</option>
                                            <option>Influencer campaign</option>
                                            <option>Performance advertising</option>
                                            <option>Video production</option>
                                            <option>Ongoing creative partnership</option>
                                            <option>Something else</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">Project details</label>
                                        <textarea rows={4} placeholder="Share context, timelines, and any links you'd like us to see." className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[12px] px-5 py-3.5 text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 placeholder:text-[#9CA3AF] resize-none" />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(245,200,66,0.30)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="syne w-full bg-[#F5C842] text-black font-extrabold text-[16px] py-5 rounded-[14px] tracking-[0.02em] transition-colors duration-300 hover:bg-[#FFE082] inline-flex items-center justify-center gap-2"
                                    >
                                        Send message
                                        <Sparkle size={16} weight="duotone" />
                                    </motion.button>

                                    <AnimatePresence>
                                        {formSubmitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-center py-4 rounded-[12px] bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] text-[14px] font-semibold flex items-center justify-center gap-2"
                                            >
                                                <Check size={16} strokeWidth={2.5} />
                                                Thank you! We&apos;ll be in touch soon.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <p className="text-center text-[13px] text-[#9CA3AF]">
                                        Prefer email?{" "}
                                        <a href="mailto:info@meruland.com" className="text-[#D29C00] hover:underline">info@meruland.com</a>
                                    </p>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Footer ────────────────────────────────────── */}
                <footer className="bg-white border-t border-black/[0.06] pt-20 pb-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <p className="syne text-[18px] font-bold text-[#111827] mb-3">Meru Land Pvt. Ltd.</p>
                                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-5 max-w-[280px]">
                                    Full-service digital marketing helping brands scale through creative strategy, performance, and influencer storytelling.
                                </p>
                                <p className="text-[13px] text-[#9CA3AF] leading-[1.7]">
                                    Radha Rani Palace, 1st Floor<br />
                                    Parikrama Marg, Vrindavan 281121<br />
                                    Uttar Pradesh, India
                                </p>

                                {/* ── Phosphor social icons ── */}
                                <div className="flex gap-3 mt-5">
                                    <motion.a
                                        href="https://www.linkedin.com/company/meru-land-pvt-ltd/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        whileHover={{ scale: 1.12, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 rounded-[12px] border border-black/[0.08] bg-[#F8F8FA] flex items-center justify-center text-[#6B7280] hover:border-[#F5C842]/40 hover:text-[#D29C00] hover:bg-[#F5C842]/[0.06] transition-all duration-300"
                                    >
                                        <LinkedinLogo size={18} weight="fill" />
                                    </motion.a>

                                    <motion.a
                                        href="https://www.instagram.com/merulandpvt.ltd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        whileHover={{ scale: 1.12, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 rounded-[12px] border border-black/[0.08] bg-[#F8F8FA] flex items-center justify-center text-[#6B7280] hover:border-[#F5C842]/40 hover:text-[#D29C00] hover:bg-[#F5C842]/[0.06] transition-all duration-300"
                                    >
                                        <InstagramLogo size={18} weight="fill" />
                                    </motion.a>
                                </div>
                            </motion.div>

                            {[
                                {
                                    title: "Navigation",
                                    links: [
                                        { label: "CollabGlam", href: "#collabglam" },
                                        { label: "Services", href: "#services" },
                                        { label: "Workflow", href: "#workflow" },
                                        { label: "About", href: "#about" },
                                        { label: "Contact", href: "#contact" },
                                    ],
                                },
                                {
                                    title: "Products",
                                    links: [
                                        { label: "CollabGlam.com ↗", href: "https://collabglam.com" },
                                        { label: "Influencer Campaigns", href: "#services" },
                                        { label: "Performance Ads", href: "#services" },
                                        { label: "Video Production", href: "#services" },
                                        { label: "Branding & Design", href: "#services" },
                                    ],
                                },
                            ].map((col) => (
                                <motion.div key={col.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                                    <p className="syne text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-5">{col.title}</p>
                                    <div className="flex flex-col gap-3">
                                        {col.links.map((link) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                                rel="noopener noreferrer"
                                                whileHover={{ x: 5, color: "#D29C00" }}
                                                className="text-[14px] text-[#6B7280] hover:text-[#D29C00] transition-colors duration-300 w-fit"
                                            >
                                                {link.label}
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                                <p className="syne text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-5">Stay in the loop</p>
                                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">Occasional updates on work, services, and new launches.</p>

                                <form onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); setNewsletterEmail(""); }} className="flex gap-2">
                                    <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="you@company.com" required className="flex-1 bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-[#F5C842] placeholder:text-[#9CA3AF] transition-colors" />
                                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="syne bg-[#F5C842] text-black font-bold text-[14px] px-4 py-3 rounded-[10px] hover:bg-[#FFE082] transition-colors flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </form>

                                <AnimatePresence>
                                    {newsletterDone && (
                                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[13px] text-[#34C759] mt-3 flex items-center gap-1.5">
                                            <Check size={13} strokeWidth={2.5} />
                                            You&apos;re in!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 border-t border-black/[0.06]">
                            <p className="text-[13px] text-[#9CA3AF]">© {new Date().getFullYear()} Meru Land Private Limited. All rights reserved.</p>
                            <div className="flex gap-6">
                                {["Privacy", "Terms", "info@meruland.com"].map((item, i) => (
                                    <a key={item} href={i === 2 ? "mailto:info@meruland.com" : "#"} className="text-[13px] text-[#9CA3AF] hover:text-[#D29C00] transition-colors duration-300">{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </main>

            {/* ── Back to top — Lucide ArrowUp ─────────────────── */}
            <AnimatePresence>
                {showBackTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.15, boxShadow: "0 12px 32px rgba(245,200,66,0.45)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Back to top"
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#F5C842] shadow-lg flex items-center justify-center text-black"
                    >
                        <ArrowUp size={20} strokeWidth={2.5} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── CollabFeaturePanel ──────────────────────────────────────────
function CollabFeaturePanel({ feat }: { feat: CollabFeature }) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
    };

    const colSpan = feat.wide ? "md:col-span-2" : "md:col-span-1";
    const radius =
        feat.wide ? "rounded-b-[36px]" : feat.num === "01" ? "rounded-tl-[36px]" : "rounded-tr-[36px]";

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            whileHover={{
                y: -10,
                borderColor: "rgba(245,200,66,0.34)",
                boxShadow:
                    "0 18px 50px rgba(245,200,66,0.10), 0 0 0 1px rgba(245,200,66,0.12), 0 0 60px rgba(245,200,66,0.12)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className={`cfp ${colSpan} ${radius} bg-white border border-black/[0.06] p-16 relative overflow-hidden min-h-[420px] flex ${feat.wide
                ? "flex-col md:flex-row items-start md:items-center gap-12"
                : "flex-col justify-end"
                } group duration-500`}
        >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                    className="absolute -inset-[10%] blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(245,200,66,0.20) 0%, rgba(245,200,66,0.10) 18%, transparent 55%)",
                    }}
                />
            </div>

            <span
                className="syne absolute top-6 right-8 font-extrabold text-[#F5C842]/[0.10] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[#F5C842]/[0.16]"
                style={{ fontSize: 120 }}
            >
                {feat.num}
            </span>

            <motion.div
                whileHover={{
                    rotate: -8,
                    scale: 1.12,
                    backgroundColor: "rgba(245,200,66,0.22)",
                    boxShadow: "0 0 30px rgba(245,200,66,0.22)",
                }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative z-10 w-16 h-16 rounded-[18px] bg-[#F5C842]/10 border border-[#F5C842]/20 flex items-center justify-center text-[#D29C00] mb-8 flex-shrink-0"
                style={{ marginBottom: feat.wide ? 0 : undefined }}
            >
                {feat.icon}
            </motion.div>

            <div className="relative z-10">
                <h3 className="syne text-[26px] font-bold text-[#111827] tracking-[-0.02em] mb-4">
                    {feat.title}
                </h3>

                <p
                    className="text-[16px] leading-[1.7] text-[#6B7280]"
                    style={{ maxWidth: feat.wide ? 600 : 340 }}
                >
                    {feat.desc}
                </p>

                <motion.a
                    href="https://collabglam.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-7 syne text-[14px] font-bold text-[#D29C00] tracking-[0.04em] transition-all duration-300 hover:gap-4"
                    whileHover={{ x: 2 }}
                >
                    {feat.cta}
                    <ArrowRight size={14} />
                </motion.a>
            </div>
        </motion.div>
    );
}

// ─── ServiceBentoCard ────────────────────────────────────────────
function ServiceBentoCard({ svc, index }: { svc: ServiceCard; index: number }) {
    return (
        <MagCard
            index={index}
            className={`${svc.colSpan} group relative bg-white border ${svc.featured ? "border-[#F5C842]/30" : "border-black/[0.08]"
                } rounded-[24px] p-10 overflow-hidden transition-all duration-500 hover:border-[#F5C842]/35 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(245,200,66,0.18)] ${svc.wide ? "flex flex-col md:flex-row items-start md:items-center gap-12" : ""
                }`}
            // style={
            //     svc.featured
            //         ? { background: "linear-gradient(135deg, rgba(245,200,66,0.08) 0%, #ffffff 60%)" }
            //         : {}
            // }
        >
            {svc.featured && (
                <motion.span
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="syne absolute top-5 right-5 bg-[#F5C842] text-black text-[10px] font-extrabold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full z-10"
                >
                    FEATURED
                </motion.span>
            )}

            <div className={`relative z-10 ${svc.wide ? "flex-1" : ""}`}>
                <motion.div
                    whileHover={{
                        rotate: -8,
                        scale: 1.1,
                        backgroundColor: "rgba(245,200,66,0.20)",
                        boxShadow: "0 10px 25px rgba(245,200,66,0.18)",
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-[52px] h-[52px] rounded-[15px] bg-[#F5C842]/10 flex items-center justify-center text-[#D29C00] mb-6"
                >
                    {svc.icon}
                </motion.div>

                <p className="syne text-[12px] font-bold text-[#D29C00] tracking-[0.04em] mb-2">
                    {svc.tagline}
                </p>

                <h3 className="syne text-[19px] font-bold text-[#111827] tracking-[-0.02em] mb-3">
                    {svc.name}
                </h3>

                <p className="text-[14px] text-[#6B7280] leading-[1.65]">
                    {svc.description}
                </p>
            </div>

            <div className={`relative z-10 ${svc.wide ? "flex-shrink-0 mt-5 md:mt-0" : "mt-6 flex items-center justify-between"}`}>
                {svc.url ? (
                    <motion.a
                        href={svc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 12px 28px rgba(245,200,66,0.22)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        className="syne inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[13px] px-6 py-2.5 rounded-full tracking-[0.02em]"
                    >
                        Visit CollabGlam
                        <ArrowRight size={13} />
                    </motion.a>
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[12px] text-[#9CA3AF] border border-black/[0.08] bg-[#F8F8FA] rounded-full px-4 py-1.5">
                            Available
                        </span>

                        <motion.a
                            href="#contact"
                            whileHover={{ color: "#D29C00", x: 3 }}
                            className="syne inline-flex items-center gap-1.5 text-[13px] font-bold text-[#6B7280] tracking-[0.04em] transition-colors duration-300"
                        >
                            Learn more
                            <ArrowRight size={13} />
                        </motion.a>
                    </div>
                )}
            </div>
        </MagCard>
    );
}