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
import { ArrowUp, ArrowRight, Check, X, Menu } from "lucide-react";

// ─── Phosphor icons ──────────────────────────────────────────────
import {
    RocketLaunch,
    ChartLineUp,
    DeviceMobile,
    FilmSlate,
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

const HERO_LINES = [
    { text: "Driving Digital", accent: false },
    { text: "Growth Through", accent: false },
    // {text:"Through", accent: false},
    { text: "Marketing &", accent: true },
    { text: "Advertising", accent: true },
    { text: "Excellence.", accent: false },
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

// ─── CollabGlam features ─────────────────────────────────────────
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

// ─── Services ────────────────────────────────────────────────────
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

// ─── Workflow steps ───────────────────────────────────────────────
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
            <div className="relative h-[90px] sm:h-[120px] lg:h-[155px]">
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
            <div className="p-2.5 sm:p-3.5">
                <p className="syne text-[11px] sm:text-[13px] font-bold text-[#111827] leading-tight">
                    {item.title}
                </p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#6B7280]">{item.meta}</p>
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
    // ── Mobile menu state ────────────────────────────────────────
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Close mobile menu on route change / scroll
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

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
    // Trigger scramble once when section scrolls into view
    useEffect(() => {
        const el = collabWordmarkRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Small delay so GSAP fade-in starts first
                        setTimeout(() => startScramble(), 320);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    const useMagnetic = () => {
        const ref = useRef<HTMLAnchorElement>(null);

        const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: "power2.out" });
        }, []);

        const onLeave = useCallback(() => {
            gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
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
        @keyframes goldShimmer {
  0%   { background-position: 0%   center; }
  100% { background-position: 220% center; }
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

        /* ── Mobile nav overlay ── */
        .mobile-nav-overlay {
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(4px);
        }
      `}</style>

            {/* ── Custom cursor (hidden on touch devices) ────────── */}
            <div
                ref={cursorRef}
                className="fixed z-[9999] pointer-events-none rounded-full bg-[#F5C842] hidden md:block"
                style={{
                    width: 10, height: 10, top: 0, left: 0,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s, height 0.3s",
                }}
            />
            <div
                ref={cursorRingRef}
                className="fixed z-[9998] pointer-events-none rounded-full hidden md:block"
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
                className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-4 sm:px-6 lg:px-12 h-14 sm:h-16 transition-all duration-300 ${navScrolled
                    ? "bg-white/90 backdrop-blur-2xl border-b border-black/[0.08]"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                {/* Logo */}
                <Link href="#hero" className="flex items-center gap-2 sm:gap-3 group">
                    <motion.div
                        whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#F5C842] flex items-center justify-center overflow-hidden shadow-lg"
                    >
                        <Image
                            src="/logo 2.jpg"
                            alt="Meru Land"
                            width={36}
                            height={36}
                            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                            priority
                        />
                    </motion.div>
                    <div className="flex flex-col leading-tight">
                        <span className="syne text-[13px] sm:text-[15px] font-bold text-[#111827] tracking-[0.05em]">MERU LAND</span>
                        <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] tracking-[0.1em] font-medium">Private Limited</span>
                    </div>
                </Link>

                {/* Desktop nav */}
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

                {/* Right side: CTA + hamburger */}
                <div className="flex items-center gap-3">
                    <motion.a
                        {...magCta}
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,200,66,0.35)" }}
                        whileTap={{ scale: 0.96 }}
                        className="syne hidden sm:inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[13px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full tracking-[0.02em] shadow-lg"
                    >
                        Start a project
                        <ArrowRight size={14} />
                    </motion.a>

                    {/* Hamburger — visible on < lg */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[10px] border border-black/[0.08] bg-white/80 backdrop-blur text-[#111827] shadow-sm"
                    >
                        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </motion.button>
                </div>
            </motion.header>

            {/* ── Mobile menu overlay ───────────────────────────── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-nav-overlay fixed inset-0 z-[490] lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 340, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-[495] w-[280px] sm:w-[320px] bg-white shadow-2xl flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between px-6 h-14 sm:h-16 border-b border-black/[0.06]">
                                <span className="syne text-[15px] font-bold text-[#111827]">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 rounded-[10px] border border-black/[0.08] flex items-center justify-center">
                                    <X size={16} />
                                </button>
                            </div>

                            <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                                {NAV_ITEMS.map((item, i) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07, duration: 0.35 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="syne text-[17px] font-semibold text-[#111827] py-3.5 border-b border-black/[0.06] hover:text-[#D29C00] transition-colors duration-200 flex items-center justify-between group"
                                    >
                                        {item.label}
                                        <ArrowRight size={14} className="text-[#9CA3AF] group-hover:text-[#D29C00] transition-colors" />
                                    </motion.a>
                                ))}
                            </nav>

                            <div className="px-6 pb-8">
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="syne w-full inline-flex items-center justify-center gap-2 bg-[#F5C842] text-black font-bold text-[14px] px-6 py-3.5 rounded-full shadow-lg tracking-[0.02em]"
                                >
                                    Start a project
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main id="hero">
                {/* ── Hero ─────────────────────────────────────── */}
                <section
                    ref={heroRef}
                    className="hero-grid-bg relative min-h-[100svh] flex items-center pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 lg:pb-24 overflow-hidden"
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

                    <div className="relative z-10 mx-auto w-full max-w-[1680px] pl-0 pr-4 sm:pl-2 sm:pr-6 lg:pl-2 lg:pr-10 xl:pl-0 xl:pr-12 2xl:pl-0 2xl:pr-16">
                        <div className="grid grid-cols-1 xl:grid-cols-[minmax(760px,1.12fr)_minmax(500px,660px)] 2xl:grid-cols-[minmax(880px,1.16fr)_minmax(560px,720px)] gap-10 lg:gap-14 xl:gap-12 2xl:gap-16 items-center">
                            {/* Left content */}
                            <div className="max-w-none pl-0">
                                <motion.div
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-5 sm:mb-8 flex items-center gap-2.5"
                                >
                                    <span className="pulse-dot h-2 w-2 flex-shrink-0 rounded-full bg-[#F5C842]" />
                                    <span className="text-[11px] sm:text-[12px] font-medium text-[#9CA3AF] tracking-[0.1em] uppercase">
                                        Digital Marketing · Advertising · Media
                                    </span>
                                </motion.div>

                                <h1 className="syne mb-5 sm:mb-7 max-w-none text-[clamp(34px,4.9vw,76px)] sm:text-[clamp(40px,5.2vw,82px)] lg:text-[clamp(46px,5.4vw,88px)] 2xl:text-[clamp(52px,5.2vw,98px)] font-extrabold leading-[0.9] tracking-[-0.055em] text-[#111827]">
                                    {HERO_LINES.map((line, i) => (
                                        <span
                                            key={i}
                                            className="word block mb-1 sm:mb-1.5"
                                            ref={(el) => {
                                                heroWordRefs.current[i] = el;
                                            }}
                                        >
                                            <span
                                                className={`word-inner block whitespace-nowrap ${line.accent
                                                    ? "bg-gradient-to-r from-[#D9A300] via-[#F5C842] to-[#FFB547] bg-clip-text text-transparent"
                                                    : ""
                                                    }`}
                                            >
                                                {line.text}
                                            </span>
                                        </span>
                                    ))}
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.7 }}
                                    className="mb-7 sm:mb-10 max-w-[560px] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.75] text-[#6B7280]"
                                >
                                    Meru Land Pvt. Ltd. helps brands scale through creative strategy,
                                    performance campaigns, and influencer-powered storytelling — all in one orbit.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    className="flex flex-wrap gap-3 sm:gap-4"
                                >
                                    <motion.a
                                        {...mag1}
                                        href="#contact"
                                        whileTap={{ scale: 0.96 }}
                                        className="syne inline-flex items-center gap-2 rounded-full bg-[#F5C842] px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-bold tracking-[0.02em] text-black shadow-lg transition-shadow hover:shadow-[0_16px_40px_rgba(245,200,66,0.30)]"
                                    >
                                        Let&apos;s collaborate
                                        <ArrowRight size={15} />
                                    </motion.a>

                                    <motion.a
                                        {...mag2}
                                        href="#services"
                                        whileTap={{ scale: 0.96 }}
                                        className="syne inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-bold tracking-[0.02em] text-[#111827] transition-all hover:border-[#F5C842]/50 hover:bg-[#F5C842]/[0.06]"
                                    >
                                        Explore services
                                        <ArrowRight size={15} />
                                    </motion.a>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.25, duration: 0.65 }}
                                    className="mt-8 sm:mt-10 grid max-w-[560px] grid-cols-3 gap-2 sm:gap-3"
                                >
                                    {HERO_PROOF_ITEMS.map((item) => (
                                        <motion.div
                                            key={item.label}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                                            className="hero-proof-chip rounded-[14px] sm:rounded-[18px] border border-black/[0.08] px-2.5 sm:px-3 py-2 sm:py-3 shadow-[0_10px_24px_rgba(17,24,39,0.06)]"
                                        >
                                            <p className="syne text-[14px] sm:text-[18px] font-extrabold leading-none text-[#111827]">
                                                {item.value}
                                            </p>
                                            <p className="mt-1 text-[10px] sm:text-[12px] leading-tight text-[#6B7280]">
                                                {item.label}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Right visual */}

                            <motion.div
                                ref={heroVisualRef}
                                style={{ y: heroParallaxY, opacity: heroOpacity }}
                                className="relative ml-auto w-full max-w-[1400px] px-4"
                            >
                                {/* Mobile + Tablet layout */}
                                <div className="xl:hidden">
                                    <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-center">
                                        {/* Left Column Thumbs (Visible on MD+) */}
                                        <div className="hidden md:flex flex-col gap-4 shrink-0">
                                            <HeroThumbCard item={HERO_THUMBS[0]} className="float-hero-a" />
                                            <HeroThumbCard item={HERO_THUMBS[1]} className="float-hero-b" />
                                            <HeroThumbCard item={HERO_THUMBS[2]} className="float-hero-c" />
                                        </div>

                                        {/* Main Visual */}
                                        <div className="relative w-full max-w-[400px]">
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-black/[0.08] shadow-2xl">
                                                <img
                                                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
                                                    alt="Marketing team"
                                                    className="h-full w-full object-cover"
                                                />
                                                {/* Inner Badges */}
                                                <div className="absolute top-4 right-4 rounded-2xl bg-[#F5C842] px-4 py-3 shadow-lg">
                                                    <p className="text-[10px] font-medium text-black/70">Creator Network</p>
                                                    <p className="syne text-lg font-bold text-black">5000+</p>
                                                </div>
                                            </div>

                                            {/* Bottom Tag */}
                                            <div className="mt-4 rounded-2xl bg-[#111827] p-5 text-white md:absolute md:-bottom-4 md:-right-4 md:mt-0">
                                                <p className="syne text-base font-extrabold">Ads • Video • Influencer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop / XL layout removed from here and moved to the right-edge */}
                            </motion.div>
                        </div>
                    </div>

                    {/* Desktop visual moved to right edge of viewport (XL+) */}
                    <div className="hidden xl:block absolute right-6 top-20 z-50">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-12">

                            {/* 1. Thumbnail Stack */}
                            <div className="flex flex-col gap-6 z-20 w-[200px] 2xl:w-[240px]">
                                <HeroThumbCard item={HERO_THUMBS[0]} className="float-hero-a" />
                                <HeroThumbCard item={HERO_THUMBS[1]} className="float-hero-b" />
                                <HeroThumbCard item={HERO_THUMBS[2]} className="float-hero-c" />
                            </div>

                            {/* 2. Main Container */}
                            <div className="relative z-10 w-full max-w-[600px] 2xl:max-w-[750px] float-hero-main">
                                <div className="hero-img-wrap h-96  relative  aspect-[4/5] overflow-hidden rounded-[40px] border border-black/[0.08] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
                                        className="h-full w-full object-cover"
                                        alt="Team"
                                    />
                                    {/* kept image only; moved Creator Network badge above image for stacking */}

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ delay: 0.35, duration: 0.6 }}
                                        className="absolute bottom-8 left-8 rounded-[22px] border border-black/[0.08] bg-white/90 px-6 py-4 shadow-xl backdrop-blur-xl"
                                    >
                                        <p className="text-[12px] font-medium text-[#9CA3AF]">Campaigns Delivered</p>
                                        <CountUp to={200} suffix="+" className="syne text-3xl font-extrabold text-[#111827]" />
                                    </motion.div>
                                </div>

                                {/* 3. Overlapping Social Buzz + Main Tag grouped at bottom-right */}
                                {/* <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="absolute right-6 bottom-32 z-40"
                                >
                                    <div className="rounded-[20px] border border-black/[0.08] bg-white/95 px-6 py-5 shadow-xl backdrop-blur-xl">
                                        <p className="syne text-sm font-bold text-[#111827]">Social buzz rising</p>
                                        <p className="text-xs text-[#6B7280]">Short-form content • creator reach</p>
                                    </div>
                                </motion.div> */}

                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    whileInView={{ opacity: 1, y: 300 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ delay: 0.18, duration: 0.6 }}
                                    className="absolute right-0 bottom-12 z-40"
                                >
                                    <div className="rounded-[24px] bg-[#111827] px-8 py-6 text-white shadow-2xl">
                                        <p className="syne text-2xl 2xl:text-3xl font-extrabold leading-tight">
                                            Ads • Video • Influencer
                                        </p>
                                        <p className="mt-1 text-sm text-white/70">One ecosystem for growth</p>
                                    </div>
                                </motion.div>

                                {/* Creator Network moved above the image so it doesn't get suppressed */}
                                <motion.div
                                    initial={{ opacity: 0, y: -12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.25, duration: 0.6 }}
                                    className="absolute -top-10 right-0 z-50"
                                >
                                    <div className="rounded-[22px] bg-[#F5C842] px-6 py-4 shadow-2xl">
                                        <p className="text-[12px] font-medium text-black/70">Creator Network</p>
                                        <CountUp to={5000} suffix="+" className="syne text-3xl font-extrabold text-black" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Marquee ───────────────────────────────────── */}
                <div className="border-y border-black/[0.06] bg-white py-4 sm:py-5 overflow-hidden">
                    <div className="marquee-track flex gap-0 w-max">
                        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                            <span
                                key={i}
                                className="syne flex items-center gap-2 sm:gap-3 px-6 sm:px-10 text-[11px] sm:text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-[0.06em] whitespace-nowrap"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] flex-shrink-0" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                {/* ── CollabGlam ────────────────────────────────── */}
                {/* ── CollabGlam ────────────────────────────────── */}
                <section
                    id="collabglam"
                    className="overflow-hidden relative"
                    style={{ background: "rgba(245,235,215,0.12)" }}
                >
                    {/* ── Left portrait — covers left half, fades at center ── */}
                    <motion.div
                        className="hidden sm:block absolute inset-y-0 left-0 w-[50%] pointer-events-none select-none z-[1]"
                        animate={{ y: [0, -18, 0] }}
                        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 52%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 52%, transparent 100%)",
                        }}
                    >
                        <img
                            src="/female lady.jpg"
                            alt=""
                            aria-hidden
                            className="w-full h-full object-cover object-top"
                            style={{
                                opacity: 0.55,
                                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 84%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 84%, transparent 100%)",
                            }}
                        />
                    </motion.div>

                    {/* ── Right portrait — covers right half, fades at center ── */}
                    <motion.div
                        className="hidden sm:block absolute inset-y-0 right-0 w-[50%] pointer-events-none select-none z-[1]"
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                        style={{
                            maskImage: "linear-gradient(to left, transparent 0%, black 8%, black 52%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 8%, black 52%, transparent 100%)",
                        }}
                    >
                        <img
                            src="/Rectangle.jpg"
                            alt=""
                            aria-hidden
                            className="w-full h-full object-cover object-top"
                            style={{
                                opacity: 0.55,
                                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 84%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 84%, transparent 100%)",
                            }}
                        />
                    </motion.div>

                    {/* ── Center content ── */}
                    <div className="relative min-h-[80vh] sm:min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                        {/* Subtle gold halo behind the wordmark only */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 38% 35% at 50% 46%, rgba(245,200,66,0.06) 0%, transparent 70%)",
                            }}
                        />

                        <div className="relative z-10 w-full max-w-[1500px] mx-auto">
                            <Reveal>
                                <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-8 sm:mb-10">
                                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                    Influencer Marketing Platform
                                </span>
                            </Reveal>

                            {/* Wordmark + sparkles */}
                            <div className="relative inline-block w-full">
                                {[
                                    { top: "-18%", left: "12%", size: 7, delay: 0 },
                                    { top: "-22%", left: "38%", size: 5, delay: 0.4 },
                                    { top: "-14%", left: "62%", size: 9, delay: 0.8 },
                                    { top: "-20%", left: "82%", size: 6, delay: 0.2 },
                                    { top: "90%", left: "22%", size: 8, delay: 0.6 },
                                    { top: "95%", left: "50%", size: 5, delay: 1.0 },
                                    { top: "88%", left: "74%", size: 7, delay: 0.3 },
                                    { top: "30%", left: "3%", size: 6, delay: 0.7 },
                                    { top: "50%", left: "96%", size: 8, delay: 0.15 },
                                ].map((s, i) => (
                                    <motion.span
                                        key={i}
                                        className="absolute pointer-events-none select-none z-20"
                                        style={{ top: s.top, left: s.left }}
                                        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4], rotate: [0, 180, 360] }}
                                        transition={{ duration: 2.2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                                    >
                                        <span
                                            style={{
                                                display: "block",
                                                width: s.size,
                                                height: s.size,
                                                background: "#F5C842",
                                                clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                                                filter: "drop-shadow(0 0 4px #F5C842)",
                                            }}
                                        />
                                    </motion.span>
                                ))}

                                <div
                                    ref={collabWordmarkRef}
                                    //  onMouseEnter={startScramble}
                                    // onMouseLeave={stopScramble}
                                    className="syne font-extrabold leading-[0.9] tracking-[-0.055em] mb-4 sm:mb-6 select-none break-words"
                                    style={{
                                        fontSize: "clamp(48px, 10vw, 132px)",
                                        backgroundImage: "linear-gradient(105deg, #7A5500 0%, #C9A020 18%, #F5C842 32%, #FFF0A0 50%, #F5C842 68%, #C9A020 82%, #FFE082 100%)",
                                        backgroundSize: "220% auto",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                        animation: "goldShimmer 3.5s linear infinite",
                                        opacity: 0,
                                        cursor: "default",
                                    }}
                                >
                                    {collabScramble}
                                </div>
                            </div>

                            <div
                                ref={collabTaglineRef}
                                className="serif italic mb-4 sm:mb-6"
                                style={{ fontSize: "clamp(16px, 3vw, 34px)", color: "#D29C00", opacity: 0 }}
                            >
                                Connect. Create. Convert.
                            </div>

                            <p
                                ref={collabSubRef}
                                className="text-[15px] sm:text-[17px] leading-[1.7] text-[#6B7280] max-w-[560px] mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
                                style={{ opacity: 0 }}
                            >
                                The platform that bridges brands and creators — making influencer marketing
                                intelligent, measurable, and beautifully simple.
                            </p>

                            <div
                                ref={collabCtaRef}
                                className="inline-flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center mx-auto"
                                style={{ opacity: 0 }}
                            >
                                <motion.a
                                    href="https://collabglam.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(245,200,66,0.25)" }}
                                    whileTap={{ scale: 0.96 }}
                                    className="syne inline-flex items-center justify-center gap-2 bg-[#F5C842] text-black font-bold text-[14px] sm:text-[15px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg tracking-[0.02em] whitespace-nowrap"
                                >
                                    Visit CollabGlam.com
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                        <ArrowRight size={16} />
                                    </motion.span>
                                </motion.a>

                                <motion.a
                                    href="#contact"
                                    whileTap={{ scale: 0.96 }}
                                    className="syne inline-flex items-center justify-center gap-2 border border-[#F5C842]/30 bg-black/5 backdrop-blur-sm text-[#111827] font-bold text-[14px] sm:text-[15px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full tracking-[0.02em] transition-all hover:border-[#F5C842]/50 hover:bg-black/10 whitespace-nowrap"
                                >
                                    Partner with us
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* CollabGlam feature panels */}
                    <div className="relative z-10 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                        {/* Section label */}
                        <div className="text-center mb-10 sm:mb-14">
                            <p className="syne text-[11px] font-bold text-[#D29C00] tracking-[0.18em] uppercase">
                                Platform Features
                            </p>
                        </div>
                        <div className="cfp-grid grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {COLLAB_FEATURES.map((feat, i) => (
                                <CollabFeaturePanel key={i} feat={feat} />
                            ))}
                        </div>
                    </div>

                    {/* ── Platform Showcase ── */}
                    <div className="relative z-10 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">

                        {/* Section header */}
                        <div className="text-center mb-12 sm:mb-16">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Platform in Action
                            </span>
                            <h3 className="syne text-[clamp(24px,4vw,52px)] font-extrabold tracking-[-0.03em] text-[#111827] leading-[1.08]">
                                Built for campaigns<br />that actually convert.
                            </h3>
                        </div>

                        {/* Mockup grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-start">

                            {/* ── Left MacBook ── */}
                            <div className="relative group">
                                <motion.div
                                    initial={{ opacity: 0, x: -40, rotate: -2 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                                    whileHover={{ rotate: 0, scale: 1.02 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative"
                                >
                                    <img
                                        src="/MacBook Air (15 inch).png"
                                        alt="CollabGlam campaign creation"
                                        className="w-full drop-shadow-2xl"
                                    />

                                    {/* Callout — Creator Brief */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute top-[18%] right-2 sm:right-0 lg:right-2 z-20"
                                    >
                                        <div
                                            className="rounded-[14px] px-4 py-3 shadow-xl"
                                            style={{
                                                background: "rgba(255,252,245,0.92)",
                                                border: "1px solid rgba(245,200,66,0.30)",
                                                backdropFilter: "blur(16px)",
                                                WebkitBackdropFilter: "blur(16px)",
                                                boxShadow: "0 8px 32px rgba(17,24,39,0.14)",
                                            }}
                                        >
                                            <p className="syne text-[10px] font-bold text-[#D29C00] tracking-[0.1em] uppercase mb-1">
                                                Campaign Brief
                                            </p>
                                            <p className="syne text-[14px] font-extrabold text-[#111827]">
                                                Summer Drop'25
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                                                <p className="text-[11px] text-[#6B7280]">24 creators matched</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Callout — Reach */}
                                    {/* Callout — ROI */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.65, duration: 0.6 }}
                                        className="absolute top-[14%] left-2 sm:left-0 lg:left-2 z-20"
                                    >
                                        {/* <div
                                            className="rounded-[14px] px-4 py-3 shadow-xl"
                                            style={{
                                                background: "rgba(17,24,39,0.90)",
                                                border: "1px solid rgba(245,200,66,0.25)",
                                                backdropFilter: "blur(16px)",
                                                WebkitBackdropFilter: "blur(16px)",
                                                boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                                            }}
                                        >
                                            <p className="syne text-[10px] font-bold text-[#F5C842] tracking-[0.1em] uppercase mb-0.5">
                                                Campaign ROI
                                            </p>
                                            <p className="syne text-[22px] font-extrabold text-white leading-none">
                                                6.8×
                                            </p>
                                            <p className="text-[10px] text-white/50 mt-0.5">Return on ad spend</p>
                                        </div> */}
                                    </motion.div>
                                </motion.div>

                                {/* Label */}
                                <p className="text-center mt-5 syne text-[12px] font-bold text-[#9CA3AF] tracking-[0.08em] uppercase">Campaign Builder</p>
                            </div>

                            {/* ── Right MacBook ── */}
                            <div className="relative group lg:mt-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 40, rotate: 2 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                                    whileHover={{ rotate: 0, scale: 1.02 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                                    className="relative"
                                >
                                    <img
                                        src="/MacBook Air (15 inch) 1.png"
                                        alt="CollabGlam product performance"
                                        className="w-full drop-shadow-2xl"
                                    />

                                    {/* Callout — ROI */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.65, duration: 0.6 }}
                                        className="absolute top-[14%] -left-4 sm:-left-8 z-20"
                                    >
                                        <div
                                            className="rounded-[14px] px-4 py-3 shadow-xl"
                                            style={{
                                                background: "rgba(17,24,39,0.90)",
                                                border: "1px solid rgba(245,200,66,0.25)",
                                                backdropFilter: "blur(16px)",
                                                WebkitBackdropFilter: "blur(16px)",
                                                boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                                            }}
                                        >
                                            <p className="syne text-[10px] font-bold text-[#F5C842] tracking-[0.1em] uppercase mb-0.5">Campaign ROI</p>
                                            <p className="syne text-[22px] font-extrabold text-white leading-none">6.8×</p>
                                            <p className="text-[10px] text-white/50 mt-0.5">Return on ad spend</p>
                                        </div>
                                    </motion.div>

                                    {/* Callout — Approvals */}
                                    {/* <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.85, duration: 0.6 }}
                                        className="absolute bottom-[20%] -right-4 sm:-right-8 z-20"
                                    >
                                        <div
                                            className="rounded-[14px] px-4 py-3 shadow-xl"
                                            style={{
                                                background: "rgba(255,252,245,0.92)",
                                                border: "1px solid rgba(245,200,66,0.28)",
                                                backdropFilter: "blur(16px)",
                                                WebkitBackdropFilter: "blur(16px)",
                                                boxShadow: "0 8px 32px rgba(17,24,39,0.12)",
                                            }}
                                        >
                                            <p className="syne text-[10px] font-bold text-[#D29C00] tracking-[0.1em] uppercase mb-1">Content Status</p>
                                            <div className="flex flex-col gap-1.5">
                                                {[
                                                    { label: "Approved", count: "18", color: "#34C759" },
                                                    { label: "In review", count: "4", color: "#F5C842" },
                                                    { label: "Pending", count: "2", color: "#9CA3AF" },
                                                ].map((s) => (
                                                    <div key={s.label} className="flex items-center justify-between gap-6">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                                                            <span className="text-[11px] text-[#6B7280]">{s.label}</span>
                                                        </div>
                                                        <span className="syne text-[11px] font-bold text-[#111827]">{s.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div> */}
                                </motion.div>

                                <p className="text-center mt-5 syne text-[12px] font-bold text-[#9CA3AF] tracking-[0.08em] uppercase">Product Performance View</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Services ──────────────────────────────────── */}
                <section id="services" className="bg-[#F8F8FA] py-16 sm:py-24 md:py-36">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <Reveal className="text-center mb-12 sm:mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4 sm:mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Apps & Services
                            </span>
                            <h2 className="syne text-[clamp(30px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-4 sm:mb-5">
                                Everything your brand<br />needs to grow.
                            </h2>
                            <p className="text-[15px] sm:text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                End-to-end digital marketing - from influencer campaigns to performance advertising and beyond.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-12 gap-3 sm:gap-4">
                            {SERVICES.map((svc, i) => (
                                <ServiceBentoCard key={svc.id} svc={svc} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Our Work ──────────────────────────────────── */}
                <section id="work" className="bg-[#F3F4F6] py-16 sm:py-24 md:py-36 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <Reveal className="text-center mb-12 sm:mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4 sm:mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Our Work
                            </span>
                            <h2 className="syne text-[clamp(30px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-4 sm:mb-5">
                                Creative excellence,<br />delivered.
                            </h2>
                            <p className="text-[15px] sm:text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                Campaigns, productions, and brand experiences built with intention.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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
                                    className="work-card group relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_18px_50px_rgba(17,24,39,0.15)] border border-black/[0.06]"
                                >
                                    <img src={item.src} alt={item.label} className="work-img-inner w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" loading="lazy" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(17,24,39,0.86) 100%)" }} />
                                    <div className="absolute inset-0 bg-[#F5C842]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                                        <p className="syne text-[14px] sm:text-[16px] font-bold text-white leading-tight mb-1">{item.label}</p>
                                        <p className="text-[11px] sm:text-[12px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Capabilities ──────────────────────────────── */}
                <section id="capabilities" className="bg-[#F3F4F6] py-16 sm:py-24 md:py-28 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <Reveal className="text-center mb-10 sm:mb-16">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4 sm:mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Capabilities
                            </span>
                            <h2 className="syne text-[clamp(28px,5vw,68px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05]">
                                What we&apos;re<br />especially good at.
                            </h2>
                        </Reveal>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {CAPABILITIES.map((pill) => (
                                <motion.span
                                    key={pill}
                                    className="cap-pill syne border border-black/[0.08] bg-white px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-[12px] sm:text-[14px] font-semibold text-[#6B7280] tracking-[0.02em] cursor-default select-none"
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
                <section id="workflow" className="bg-[#F8F8FA] py-16 sm:py-24 md:py-36">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <Reveal className="text-center mb-12 sm:mb-20">
                            <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4 sm:mb-6">
                                <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                Process
                            </span>
                            <h2 className="syne text-[clamp(28px,5vw,72px)] font-extrabold tracking-[-0.035em] text-[#111827] leading-[1.05] mb-4 sm:mb-5">
                                A process built<br />for results.
                            </h2>
                            <p className="text-[15px] sm:text-[18px] text-[#6B7280] leading-relaxed max-w-xl mx-auto">
                                Collaborative, clear, and crafted to move fast without missing what matters.
                            </p>
                        </Reveal>

                        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {/* Connector line — md+ only */}
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
                                    className={`wf-card relative z-10 rounded-[20px] sm:rounded-[24px] border p-7 sm:p-9 md:p-11 ${wf.accent ? "border-[#F5C842]/35 bg-[linear-gradient(135deg,rgba(245,200,66,0.12)_0%,#ffffff_72%)]" : "border-black/[0.08] bg-white"}`}
                                    whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(17,24,39,0.10)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-4 sm:mb-5">Step {wf.step}</div>

                                    <motion.div
                                        whileHover={{ rotate: 12, scale: 1.12 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[16px] bg-[#F5C842]/[0.10] border border-[#F5C842]/20 flex items-center justify-center text-[#D29C00] mb-5 sm:mb-7"
                                    >
                                        {wf.icon}
                                    </motion.div>

                                    <h3 className="syne text-[20px] sm:text-[24px] font-extrabold text-[#111827] tracking-[-0.02em] mb-3 sm:mb-4">{wf.title}</h3>
                                    <p className="text-[14px] sm:text-[15px] text-[#6B7280] leading-[1.7]">{wf.description}</p>
                                    <span className="inline-block mt-4 sm:mt-6 border border-black/[0.08] rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] text-[#9CA3AF] font-medium bg-[#F8F8FA]">{wf.duration}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── About ─────────────────────────────────────── */}
                <section id="about" className="bg-white py-16 sm:py-24 md:py-36 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
                            <div>
                                <Reveal>
                                    <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6 sm:mb-8">
                                        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                        About Us
                                    </span>
                                </Reveal>

                                <Reveal>
                                    <h2 className="syne text-[clamp(28px,4vw,52px)] font-extrabold tracking-[-0.03em] text-[#111827] leading-[1.1] mb-7 sm:mb-10">
                                        The team behind<br />the growth.
                                    </h2>
                                </Reveal>

                                <div className="space-y-4 sm:space-y-5">
                                    <p className="about-para text-[15px] sm:text-[17px] leading-[1.8] text-[#6B7280]">
                                        Meru Land Pvt. Ltd. is a modern digital marketing and advertising company delivering end-to-end growth solutions through creative production, influencer collaborations, and performance-driven campaigns.
                                    </p>
                                    <p className="about-para text-[15px] sm:text-[17px] leading-[1.8] text-[#6B7280]">
                                        We operate through specialized ventures, including{" "}
                                        <strong className="text-[#111827] font-semibold">Enoylity Media Creations</strong>{" "}
                                        — our dedicated creative and media production division focused on branding, video content, and digital storytelling.
                                    </p>
                                    <p className="about-para text-[15px] sm:text-[17px] leading-[1.8] text-[#6B7280]">
                                        Together, Meru Land and its ventures help brands execute impactful marketing strategies that are consistent, measurable, and built for long-term growth.
                                    </p>
                                </div>

                                <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4">
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
                                            className="flex items-start sm:items-center gap-3 sm:gap-4 text-[13px] sm:text-[15px] text-[#6B7280]"
                                        >
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F5C842]/10 border border-[#F5C842]/20 flex items-center justify-center flex-shrink-0 text-[#D29C00] mt-0.5 sm:mt-0">
                                                <Check size={12} strokeWidth={2.5} />
                                            </div>
                                            {text}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <Reveal direction="right">
                                <div className="relative mt-8 sm:mt-0">
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        <div className="row-span-2 rounded-[16px] sm:rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover min-h-[240px] sm:min-h-[360px]" loading="lazy" />
                                        </div>
                                        <div className="rounded-[16px] sm:rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80" alt="Strategy" className="w-full h-full object-cover min-h-[110px] sm:min-h-[168px]" loading="lazy" />
                                        </div>
                                        <div className="rounded-[16px] sm:rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_14px_40px_rgba(17,24,39,0.08)]">
                                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80" alt="Creative" className="w-full h-full object-cover min-h-[110px] sm:min-h-[168px]" loading="lazy" />
                                        </div>
                                    </div>

                                    <motion.div
                                        className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-[#F5C842] rounded-[14px] sm:rounded-[16px] px-5 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap shadow-[0_8px_40px_rgba(245,200,66,0.26)]"
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <span className="syne block text-[26px] sm:text-[32px] font-extrabold text-black leading-none">5K+</span>
                                        <span className="text-[11px] sm:text-[12px] font-semibold text-black/70">Creator Network</span>
                                    </motion.div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ── Contact ───────────────────────────────────── */}
                <section id="contact" className="bg-[#F8F8FA] py-16 sm:py-24 md:py-36">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
                            <div>
                                <Reveal>
                                    <span className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/25 px-3 sm:px-4 py-1.5 rounded-full syne text-[10px] sm:text-[11px] font-bold text-[#D29C00] tracking-[0.12em] uppercase mb-6 sm:mb-8">
                                        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                                        Get In Touch
                                    </span>
                                </Reveal>
                                <Reveal>
                                    <h2 className="syne text-[clamp(28px,4.5vw,60px)] font-extrabold tracking-[-0.03em] text-[#111827] leading-[1.08] mb-4 sm:mb-5">
                                        Ready to grow<br />your brand?
                                    </h2>
                                </Reveal>
                                <Reveal>
                                    <p className="text-[15px] sm:text-[17px] text-[#6B7280] leading-relaxed max-w-[420px] mb-10 sm:mb-14">
                                        Tell us about your project and we&apos;ll follow up with next steps and a possible timeline.
                                    </p>
                                </Reveal>

                                <div className="flex flex-col gap-3 sm:gap-4">
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
                                            className="flex gap-3 sm:gap-5 items-start p-4 sm:p-5 rounded-[14px] sm:rounded-[16px] border border-black/[0.08] bg-white transition-all duration-300 shadow-[0_10px_24px_rgba(17,24,39,0.04)]"
                                        >
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#F5C842]/10 flex items-center justify-center text-[16px] sm:text-[18px] flex-shrink-0">
                                                {<item.icon />}
                                            </div>
                                            <div>
                                                <p className="syne text-[10px] sm:text-[11px] font-bold text-[#9CA3AF] tracking-[0.08em] uppercase mb-1">{item.label}</p>
                                                {item.link ? (
                                                    <a href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[13px] sm:text-[15px] text-[#111827] font-medium hover:text-[#D29C00] transition-colors duration-300">{item.value}</a>
                                                ) : (
                                                    <p className="text-[13px] sm:text-[15px] text-[#111827] font-medium">{item.value}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact form */}
                            <motion.div
                                initial={{ opacity: 0, y: 56 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.9, ease: easeCustom }}
                                className="bg-white border border-black/[0.08] rounded-[20px] sm:rounded-[28px] p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(17,24,39,0.06)]"
                            >
                                <h3 className="syne text-[22px] sm:text-[28px] font-extrabold text-[#111827] tracking-[-0.02em] mb-2">Tell us about your project</h3>
                                <p className="text-[13px] sm:text-[15px] text-[#6B7280] mb-6 sm:mb-9 leading-relaxed">We read every message and respond within 1–2 business days.</p>

                                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-3 sm:space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        {["Name", "Email"].map((field) => (
                                            <div key={field} className="flex flex-col gap-1.5 sm:gap-2">
                                                <label className="text-[12px] sm:text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">{field} *</label>
                                                <input type={field === "Email" ? "email" : "text"} required placeholder={field === "Email" ? "you@company.com" : "Your name"} className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[10px] sm:rounded-[12px] px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 placeholder:text-[#9CA3AF]" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-[12px] sm:text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">What are you looking to create?</label>
                                        <select defaultValue="Brand & digital experience" className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[10px] sm:rounded-[12px] px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 appearance-none">
                                            <option>Brand &amp; digital experience</option>
                                            <option>Influencer campaign</option>
                                            <option>Performance advertising</option>
                                            <option>Video production</option>
                                            <option>Ongoing creative partnership</option>
                                            <option>Something else</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <label className="text-[12px] sm:text-[13px] font-semibold text-[#6B7280] tracking-[0.02em]">Project details</label>
                                        <textarea rows={4} placeholder="Share context, timelines, and any links you'd like us to see." className="bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[10px] sm:rounded-[12px] px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] outline-none transition-all duration-300 focus:border-[#F5C842] focus:ring-2 focus:ring-[#F5C842]/10 placeholder:text-[#9CA3AF] resize-none" />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(245,200,66,0.30)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="syne w-full bg-[#F5C842] text-black font-extrabold text-[14px] sm:text-[16px] py-4 sm:py-5 rounded-[12px] sm:rounded-[14px] tracking-[0.02em] transition-colors duration-300 hover:bg-[#FFE082] inline-flex items-center justify-center gap-2"
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
                                                className="text-center py-3 sm:py-4 rounded-[12px] bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2"
                                            >
                                                <Check size={16} strokeWidth={2.5} />
                                                Thank you! We&apos;ll be in touch soon.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <p className="text-center text-[12px] sm:text-[13px] text-[#9CA3AF]">
                                        Prefer email?{" "}
                                        <a href="mailto:info@meruland.com" className="text-[#D29C00] hover:underline">info@meruland.com</a>
                                    </p>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Footer ────────────────────────────────────── */}
                <footer className="bg-white border-t border-black/[0.06] pt-12 sm:pt-20 pb-8 sm:pb-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sm:col-span-2 lg:col-span-1">
                                <p className="syne text-[16px] sm:text-[18px] font-bold text-[#111827] mb-2 sm:mb-3">Meru Land Pvt. Ltd.</p>
                                <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-relaxed mb-4 sm:mb-5 max-w-[280px]">
                                    Full-service digital marketing helping brands scale through creative strategy, performance, and influencer storytelling.
                                </p>
                                <p className="text-[12px] sm:text-[13px] text-[#9CA3AF] leading-[1.7]">
                                    Radha Rani Palace, 1st Floor<br />
                                    Parikrama Marg, Vrindavan 281121<br />
                                    Uttar Pradesh, India
                                </p>

                                <div className="flex gap-3 mt-4 sm:mt-5">
                                    <motion.a
                                        href="https://www.linkedin.com/company/meru-land-pvt-ltd/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        whileHover={{ scale: 1.12, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] border border-black/[0.08] bg-[#F8F8FA] flex items-center justify-center text-[#6B7280] hover:border-[#F5C842]/40 hover:text-[#D29C00] hover:bg-[#F5C842]/[0.06] transition-all duration-300"
                                    >
                                        <LinkedinLogo size={16} weight="fill" />
                                    </motion.a>

                                    <motion.a
                                        href="https://www.instagram.com/merulandpvt.ltd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        whileHover={{ scale: 1.12, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] border border-black/[0.08] bg-[#F8F8FA] flex items-center justify-center text-[#6B7280] hover:border-[#F5C842]/40 hover:text-[#D29C00] hover:bg-[#F5C842]/[0.06] transition-all duration-300"
                                    >
                                        <InstagramLogo size={16} weight="fill" />
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
                                    <p className="syne text-[11px] sm:text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-4 sm:mb-5">{col.title}</p>
                                    <div className="flex flex-col gap-2 sm:gap-3">
                                        {col.links.map((link) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                                rel="noopener noreferrer"
                                                whileHover={{ x: 5, color: "#D29C00" }}
                                                className="text-[13px] sm:text-[14px] text-[#6B7280] hover:text-[#D29C00] transition-colors duration-300 w-fit"
                                            >
                                                {link.label}
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="sm:col-span-2 lg:col-span-1">
                                <p className="syne text-[11px] sm:text-[12px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-4 sm:mb-5">Stay in the loop</p>
                                <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-relaxed mb-3 sm:mb-4">Occasional updates on work, services, and new launches.</p>

                                <form onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); setNewsletterEmail(""); }} className="flex gap-2">
                                    <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="you@company.com" required className="flex-1 bg-[#F8F8FA] border border-black/[0.08] text-[#111827] rounded-[10px] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] outline-none focus:border-[#F5C842] placeholder:text-[#9CA3AF] transition-colors" />
                                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="syne bg-[#F5C842] text-black font-bold text-[14px] px-3 sm:px-4 py-2.5 sm:py-3 rounded-[10px] hover:bg-[#FFE082] transition-colors flex items-center justify-center">
                                        <ArrowRight size={15} />
                                    </motion.button>
                                </form>

                                <AnimatePresence>
                                    {newsletterDone && (
                                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[12px] sm:text-[13px] text-[#34C759] mt-3 flex items-center gap-1.5">
                                            <Check size={13} strokeWidth={2.5} />
                                            You&apos;re in!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-5 sm:pt-7 border-t border-black/[0.06]">
                            <p className="text-[11px] sm:text-[13px] text-[#9CA3AF] text-center sm:text-left">© {new Date().getFullYear()} Meru Land Private Limited. All rights reserved.</p>
                            <div className="flex gap-4 sm:gap-6">
                                {["Privacy", "Terms", "info@meruland.com"].map((item, i) => (
                                    <a key={item} href={i === 2 ? "mailto:info@meruland.com" : "#"} className="text-[11px] sm:text-[13px] text-[#9CA3AF] hover:text-[#D29C00] transition-colors duration-300">{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </main>

            {/* ── Back to top ───────────────────────────────────── */}
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
                        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F5C842] shadow-lg flex items-center justify-center text-black"
                    >
                        <ArrowUp size={18} strokeWidth={2.5} />
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
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const colSpan = feat.wide ? "md:col-span-2" : "md:col-span-1";
    const isWide = feat.wide;

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(245,200,66,0.16), 0 2px 0 rgba(245,200,66,0.30)" }}
            className={`cfp ${colSpan} relative overflow-hidden rounded-[24px] sm:rounded-[32px] group cursor-default`}
            style={{
                background: "rgba(255,252,245,0.82)",
                border: "1px solid rgba(245,200,66,0.22)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 4px 24px rgba(17,24,39,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
        >
            {/* Mouse-follow gold spotlight */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "radial-gradient(circle 280px at var(--mx,50%) var(--my,50%), rgba(245,200,66,0.10) 0%, transparent 70%)",
                }}
            />

            {/* Top-edge gold shimmer line */}
            <div
                className="absolute top-0 left-[8%] right-[8%] h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(245,200,66,0.45) 35%, rgba(255,240,160,0.75) 50%, rgba(245,200,66,0.45) 65%, transparent)",
                }}
            />

            {/* Ghost step number */}
            <span
                className="syne absolute select-none pointer-events-none font-extrabold leading-none"
                style={{
                    fontSize: "clamp(100px,16vw,180px)",
                    right: "-12px",
                    bottom: "-18px",
                    background: "linear-gradient(180deg, rgba(245,200,66,0.55) 0%, rgba(245,200,66,0.18) 60%, transparent 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                }}
            >
                {feat.num}
            </span>

            <div
                className={`relative z-10 p-8 sm:p-12 ${isWide
                    ? "flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
                    : "flex flex-col justify-between min-h-[300px] sm:min-h-[360px]"
                    }`}
            >
                {/* Icon */}
                <motion.div
                    whileHover={{ rotate: -10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] sm:rounded-[20px] flex items-center justify-center ${isWide ? "" : "mb-auto"}`}
                    style={{
                        background: "linear-gradient(135deg, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0.06) 100%)",
                        border: "1px solid rgba(245,200,66,0.30)",
                        boxShadow: "0 4px 16px rgba(245,200,66,0.12)",
                        color: "#C9A020",
                    }}
                >
                    {feat.icon}
                </motion.div>

                {/* Text */}
                <div className={isWide ? "flex-1" : "mt-8 sm:mt-10"}>
                    {/* Step pill */}
                    <span
                        className="syne inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase mb-3 sm:mb-4 px-3 py-1 rounded-full"
                        style={{
                            background: "rgba(245,200,66,0.12)",
                            border: "1px solid rgba(245,200,66,0.28)",
                            color: "#A07800",
                        }}
                    >
                        Step {feat.num}
                    </span>

                    <h3 className="syne text-[20px] sm:text-[24px] md:text-[26px] font-extrabold tracking-[-0.025em] mb-3 sm:mb-4 text-[#111827] leading-tight">
                        {feat.title}
                    </h3>

                    <p
                        className="text-[14px] sm:text-[15px] leading-[1.75] text-[#6B7280]"
                        style={{ maxWidth: isWide ? 560 : 340 }}
                    >
                        {feat.desc}
                    </p>

                    <motion.a
                        href="https://collabglam.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="syne inline-flex items-center gap-2 mt-6 sm:mt-8 text-[13px] sm:text-[14px] font-bold tracking-[0.05em] transition-all duration-300"
                        style={{ color: "#C9A020" }}
                        whileHover={{ x: 4 } as never}
                    >
                        {feat.cta}
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight size={13} />
                        </motion.span>
                    </motion.a>
                </div>
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
                } rounded-[18px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-[#F5C842]/35 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(245,200,66,0.18)] ${svc.wide ? "flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10 md:gap-12" : ""
                }`}
        >
            {svc.featured && (
                <motion.span
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="syne absolute top-4 right-4 sm:top-5 sm:right-5 bg-[#F5C842] text-black text-[9px] sm:text-[10px] font-extrabold tracking-[0.1em] uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full z-10"
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
                    className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-[12px] sm:rounded-[15px] bg-[#F5C842]/10 flex items-center justify-center text-[#D29C00] mb-4 sm:mb-6"
                >
                    {svc.icon}
                </motion.div>

                <p className="syne text-[11px] sm:text-[12px] font-bold text-[#D29C00] tracking-[0.04em] mb-1.5 sm:mb-2">
                    {svc.tagline}
                </p>

                <h3 className="syne text-[16px] sm:text-[18px] md:text-[19px] font-bold text-[#111827] tracking-[-0.02em] mb-2 sm:mb-3">
                    {svc.name}
                </h3>

                <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[1.65]">
                    {svc.description}
                </p>
            </div>

            <div className={`relative z-10 ${svc.wide ? "flex-shrink-0 mt-4 sm:mt-5 md:mt-0" : "mt-4 sm:mt-6 flex items-center justify-between"}`}>
                {svc.url ? (
                    <motion.a
                        href={svc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 12px 28px rgba(245,200,66,0.22)" }}
                        whileTap={{ scale: 0.96 }}
                        className="syne inline-flex items-center gap-2 bg-[#F5C842] text-black font-bold text-[12px] sm:text-[13px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full tracking-[0.02em]"
                    >
                        Visit CollabGlam
                        <ArrowRight size={12} />
                    </motion.a>
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] sm:text-[12px] text-[#9CA3AF] border border-black/[0.08] bg-[#F8F8FA] rounded-full px-3 sm:px-4 py-1.5">
                            Available
                        </span>

                        <motion.a
                            href="#contact"
                            whileHover={{ color: "#D29C00", x: 3 }}
                            className="syne inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold text-[#6B7280] tracking-[0.04em] transition-colors duration-300"
                        >
                            Learn more
                            <ArrowRight size={12} />
                        </motion.a>
                    </div>
                )}
            </div>
        </MagCard>
    );
}