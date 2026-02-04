"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "#collabglam", label: "CollabGlam" },
  { href: "#services", label: "Services" },
  { href: "#workflows", label: "Workflows" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const appCards = [
  {
    id: "influencer-campaigns",
    name: "Influencer Campaign Management",
    tagline: "Creators, content & coordination",
    description:
      "End-to-end management of influencer campaigns, from creator selection and briefing to approvals and reporting.",
    status: "Core service",
    featured: true,
    url: "https://collabglam.com",
  },
  {
    id: "performance-ads",
    name: "Performance Advertising (Google/Meta Ads)",
    tagline: "Search, social & display",
    description:
      "Performance-focused media planning and optimization across Google and Meta to drive measurable business outcomes.",
    status: "Available",
    featured: false,
  },
  {
    id: "social-media",
    name: "Social Media Growth & Strategy",
    tagline: "Always-on brand presence",
    description:
      "Strategic content calendars, channel planning, and community building across key social platforms.",
    status: "Available",
    featured: false,
  },
  {
    id: "video-production",
    name: "Video Production & Creative Studio",
    tagline: "Stories in motion",
    description:
      "Concept-to-delivery video production for campaigns, brand stories, product explainers, and social-first formats.",
    status: "Available",
    featured: false,
  },
  {
    id: "branding-design",
    name: "Branding & Design Solutions",
    tagline: "Identity, systems & visual language",
    description:
      "Brand identity, visual systems, and marketing design assets aligned to your growth and campaign goals.",
    status: "Available",
    featured: false,
  },
  {
    id: "automation-analytics",
    name: "Marketing Automation & Analytics",
    tagline: "Data, journeys & insight",
    description:
      "CRM journeys, marketing automation, dashboards, and analytics to keep performance transparent and actionable.",
    status: "Available",
    featured: false,
  },
];

const workflows = [
  {
    step: "01",
    title: "Discover",
    duration: "1–2 weeks",
    description:
      "Understand brand goals, target audience, existing channels, and campaign direction.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Create",
    duration: "2–3 weeks",
    description:
      "Design content, creatives, influencer briefs, and a clear strategy roadmap for execution.",
    icon: "🎨",
  },
  {
    step: "03",
    title: "Launch & Scale",
    duration: "Go-live",
    description:
      "Execute campaigns across digital channels, measure performance, and scale what works.",
    icon: "🚀",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleNewsletterSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@meruland.com");
    } catch (err) {
      // ignore copy failures
    }
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg">
              <Image
                src="/logo 2.jpg"
                alt="Meru Land logo"
                width={50}
                height={50}
                className="h-18 w-14 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">MERU LAND</span>
              <span className="text-xs text-gray-500">Private Limited</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-yellow-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-lg bg-yellow-400 px-6 py-2 text-sm font-semibold text-gray-900 shadow-md transition hover:bg-yellow-500 sm:inline-block"
          >
            Start a project
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero Section with Image */}
        <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-semibold text-yellow-800">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Digital marketing, advertising & media
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Driving Digital Growth Through{" "}
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                    Marketing & Advertising
                  </span>{" "}
                  Excellence.
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                  Meru Land Pvt. Ltd. is a full-service digital marketing and advertising company
                  helping brands scale through creative strategy, performance campaigns, and
                  influencer-powered storytelling.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="rounded-lg bg-yellow-400 px-8 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-500"
                  >
                    Let&apos;s collaborate
                  </a>
                  <a
                    href="#services"
                    className="rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-yellow-600"
                  >
                    Explore services
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80"
                    alt="Marketing and creative team collaborating in a modern workspace"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* collabGlam Featured Section */}
        <section id="collabglam" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-semibold text-yellow-800">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                Influencer Marketing Platform
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                CollabGlam — Influencer Marketing Platform
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                CollabGlam connects brands with the right creators, making influencer marketing
                simple, measurable, and scalable.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Creator matching & discovery
                      </h3>
                      <p className="text-gray-600">
                        Shortlist creators by audience, category, and performance signals that match
                        your brand.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Campaign workflows & approvals
                      </h3>
                      <p className="text-gray-600">
                        Keep briefs, timelines, and approvals in one place across brands, creators,
                        and teams.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Performance tracking & reporting
                      </h3>
                      <p className="text-gray-600">
                        Measure creator performance, campaign ROI, and learnings across channels.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="https://collabglam.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-500"
                  >
                    Visit CollabGlam.com
                    <span>→</span>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-yellow-400 shadow-md">
                    <Image
                      src="/collab.jpg"
                      alt="CollabGalm logo"
                      width={130}
                      height={132}
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apps & Services Grid */}
        <section id="services" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Apps & Services
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                End-to-end creative solutions for modern brands
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {appCards.map((app) => (
                <div
                  key={app.id}
                  className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                    app.featured ? "border-2 border-yellow-400" : "border border-gray-200"
                  }`}
                >
                  {app.featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
                      FEATURED
                    </div>
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500">
                      <span className="text-xl font-bold text-white">
                        {app.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                      <p className="text-xs text-gray-500">{app.tagline}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-gray-600">{app.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">{app.status}</span>
                    {app.url ? (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-yellow-400 px-4 py-2 text-xs font-semibold text-gray-900 transition hover:bg-yellow-500"
                      >
                        Visit
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-yellow-600"
                      >
                        Learn more
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Showcase Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Work</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Showcasing creative excellence across land, brand, and digital experiences
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  id: 1,
                  src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
                  alt: "Creative marketing team in a strategy workshop",
                  label: "Campaign strategy & planning",
                },
                {
                  id: 2,
                  src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
                  alt: "Team collaborating around a table with laptops and notes",
                  label: "Content, media & performance reviews",
                },
                {
                  id: 3,
                  src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
                  alt: "Video production and media equipment in a studio",
                  label: "Video production & creative studio",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg transition hover:shadow-xl"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-medium text-white drop-shadow">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="solutions" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Capabilities</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                What we&apos;re especially good at
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Influencer Marketing Platforms",
                "Performance Growth Campaigns",
                "Creative Advertising Production",
                "Brand Strategy & Positioning",
                "Video & Animation Studio",
                "Data-Driven Marketing Execution",
                "Technology & Product Engineering",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border-2 border-yellow-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflows" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Workflow</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                A clear, collaborative process that delivers results
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.step}
                  className={`rounded-2xl border-2 p-6 shadow-lg transition hover:shadow-xl ${
                    workflow.step === "03"
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-2xl">
                        {workflow.icon}
                      </div>
                      <div>
                        <span
                          className={`text-sm font-bold ${
                            workflow.step === "03" ? "text-yellow-600" : "text-yellow-500"
                          }`}
                        >
                          {workflow.step} · {workflow.title}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">{workflow.description}</p>
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {workflow.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About & Contact Section */}
        <section id="about" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                  About Meru Land Pvt. Ltd.
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Meru Land Pvt. Ltd. is a modern digital marketing and advertising agency
                    delivering end-to-end growth solutions through creative production, influencer
                    collaborations, and performance-driven campaigns.
                  </p>
                  <p>
                    From strategy and storytelling to media, influencers, and analytics, we help
                    brands orchestrate campaigns that feel consistent, measurable, and built for
                    long-term growth.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <span className="text-green-600">✓</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Based in India · working with partners globally
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-600">✓</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Available for select collaborations and long-term retainers
                    </span>
                  </div>
                </div>
              </div>

              <div id="contact" className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Tell us about your project
                </h3>
                <p className="mb-6 text-gray-600">
                  Share a few details and we&apos;ll follow up with next steps and a possible
                  timeline.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name<span className="text-yellow-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email<span className="text-yellow-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      What are you looking to create?
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      defaultValue="Brand & digital experience"
                    >
                      <option>Brand &amp; digital experience</option>
                      <option>Land / spatial storytelling</option>
                      <option>Product / dashboard UI</option>
                      <option>Ongoing creative partnership</option>
                      <option>Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Project details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share context, timelines, and any links you'd like us to see."
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-500"
                  >
                    Send message
                  </button>

                  {submitted && (
                    <p className="text-sm text-green-600">
                      Thank you — your details have been captured locally in this demo. Wire
                      this form up to your email, CRM, or backend when you&apos;re ready to go
                      live.
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    Prefer email? Reach us at{" "}
                    <a
                      href="mailto:info@meruland.com"
                      className="font-medium text-yellow-600 underline"
                    >
                      info@meruland.com
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Meru Land Pvt. Ltd.</h4>
                <p className="text-sm text-gray-600">
                  Radha Rani Palace, 1st Floor, Parikrama Marg,
                  <br /> Vrindavan 281121, Uttar Pradesh, India
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:info@meruland.com"
                    className="text-sm font-medium text-yellow-600 hover:underline"
                    aria-label="Email Meru Land"
                  >
                    info@meruland.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-sm text-gray-500 hover:text-gray-700"
                    aria-label="Copy email to clipboard"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} Meru Land. All rights reserved.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-gray-900">Quick links</h4>
                <nav className="flex flex-wrap gap-2 text-sm">
                  <a href="#services" className="text-gray-600 hover:text-yellow-600">Services</a>
                  <a href="#workflows" className="text-gray-600 hover:text-yellow-600">Workflow</a>
                  <a href="#about" className="text-gray-600 hover:text-yellow-600">About</a>
                  <a href="#contact" className="text-gray-600 hover:text-yellow-600">Contact</a>
                  <a href="https://collabglam.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600">CollabGlam</a>
                </nav>

                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/meru-land-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gray-500 hover:text-yellow-600 hover:bg-gray-50"
                    aria-label="Meru Land on LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1s2.48 1.12 2.48 2.5zM.32 8.16H4.7V24H.32V8.16zM8.34 8.16h4.18v2.15h.06c.58-1.1 2-2.26 4.11-2.26 4.4 0 5.21 2.9 5.21 6.67V24h-4.38v-7.71c0-1.84-.03-4.21-2.57-4.21-2.57 0-2.96 2.01-2.96 4.08V24H8.34V8.16z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/merulandpvt.ltd?igsh=OXAyMzdoZXlmejE="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gray-500 hover:text-yellow-600 hover:bg-gray-50"
                    aria-label="Meru Land on Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4.61.24 1.04.53 1.49.98.45.45.74.88.98 1.49.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.584-.07 4.85c-.05 1.17-.24 1.97-.4 2.43-.24.61-.53 1.04-.98 1.49-.45.45-.88.74-1.49.98-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.584-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4-.61-.24-1.04-.53-1.49-.98-.45-.45-.74-.88-.98-1.49-.16-.46-.35-1.26-.4-2.43C2.21 15.584 2.2 15.2 2.2 12s.01-3.584.07-4.85c.05-1.17.24-1.97.4-2.43.24-.61.53-1.04.98-1.49.45-.45.88-.74 1.49-.98.46-.16 1.26-.35 2.43-.4C8.416 2.21 8.8 2.2 12 2.2m0-2.2C8.735 0 8.332.014 7.052.072 5.773.13 4.78.33 3.96.64 3.11.96 2.39 1.39 1.68 2.1.97 2.81.54 3.53.22 4.38.01 5.2-.13 6.19.07 7.47.13 8.75.14 9.15.14 12s-.01 3.25-.07 4.53c-.2 1.28-.06 2.27.15 3.09.32.85.75 1.57 1.46 2.28.71.71 1.43 1.14 2.28 1.46.82.21 1.81.35 3.09.15C8.75 23.87 9.15 23.86 12 23.86s3.25.01 4.53.07c1.28.2 2.27.06 3.09-.15.85-.32 1.57-.75 2.28-1.46.71-.71 1.14-1.43 1.46-2.28.21-.82.35-1.81.15-3.09C23.87 15.25 23.86 14.85 23.86 12s.01-3.25.07-4.53c.2-1.28.06-2.27-.15-3.09-.32-.85-.75-1.57-1.46-2.28C21.61.97 20.89.54 20.04.22 19.22.01 18.23-.13 16.95.07 15.67.13 15.27.14 12 .14z" />
                      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.17 6.17 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
                      <circle cx="18.4" cy="5.6" r="1.44" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Stay in the loop</h4>
                <p className="text-sm text-gray-600">Subscribe for occasional updates about work and services.</p>

                <form onSubmit={handleNewsletterSubmit} className="mt-2 flex gap-2">
                  <label htmlFor="newsletter" className="sr-only">Email</label>
                  <input
                    id="newsletter"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500"
                  >
                    Subscribe
                  </button>
                </form>

                {newsletterSubmitted && (
                  <p className="mt-2 text-sm text-green-600">Thanks — you're subscribed (demo).</p>
                )}
              </div>
            </div>
          </div>

          {showTop && (
            <button
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="fixed bottom-6 right-6 z-50 rounded-full bg-yellow-400 p-3 shadow-lg transition hover:bg-yellow-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-gray-900">
                <path d="M12 5l-7 7h4v7h6v-7h4z" />
              </svg>
            </button>
          )}
        </footer>
      </main>
    </div>
  );
}
