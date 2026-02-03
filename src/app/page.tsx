"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "#collabglam", label: "collabGlam.com" },
  { href: "#services", label: "Services" },
  { href: "#workflows", label: "Workflows" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const appCards = [
  {
    id: "collabglam",
    name: "collabGlam",
    tagline: "Collaboration OS",
    description: "Workspace for glam & creative teams",
    status: "Live",
    featured: true,
    url: "https://collabglam.com",
  },
  {
    id: "brand-design",
    name: "Brand Design",
    tagline: "Visual Identity",
    description: "Cohesive brand systems & experiences",
    status: "Available",
    featured: false,
  },
  {
    id: "land-experience",
    name: "Land Experience",
    tagline: "Spatial Storytelling",
    description: "Site narratives & concept mapping",
    status: "Available",
    featured: false,
  },
  {
    id: "digital-products",
    name: "Digital Products",
    tagline: "Interface Design",
    description: "Websites, dashboards & apps",
    status: "Available",
    featured: false,
  },
  {
    id: "creative-tech",
    name: "Creative Technology",
    tagline: "Interactive Experiences",
    description: "Prototypes & immersive builds",
    status: "Available",
    featured: false,
  },
  {
    id: "strategy",
    name: "Strategy & Consulting",
    tagline: "Roadmap Design",
    description: "Goals, metrics & creative outcomes",
    status: "Available",
    featured: false,
  },
];

const workflows = [
  {
    step: "01",
    title: "Discover",
    duration: "1–2 weeks",
    description: "Map land, brand, and digital landscape—goals, constraints, audiences, and existing assets.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Design",
    duration: "2–3 weeks",
    description: "Explore creative directions, design key experiences, and share interactive previews for feedback.",
    icon: "🎨",
  },
  {
    step: "03",
    title: "Build & Launch",
    duration: "Go-live",
    description: "Bring everything to life in production-ready assets, digital experiences, and launch collateral.",
    icon: "🚀",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg overflow-hidden">
              <Image
                src="/logo 2.jpg"
                alt="Meru Land logo"
                width={50}
                height={50}
                className="h-14 w-14 object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">Meru Land</span>
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
                  Creative cloud–inspired studio & SaaS
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Designing{" "}
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                    land, brand & digital
                  </span>{" "}
                  experiences that stand out.
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                  Meru Land Private Limited blends strategy, design, and technology to craft
                  immersive experiences—across land development, digital products, and visual
                  identity—so your brand feels as seamless as a creative cloud workspace.
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
                  {/* Placeholder for hero image - replace with actual image */}
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-yellow-200/50 to-amber-200/50">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">🏢</div>
                      <p className="text-sm font-medium text-gray-600">
                        Professional workspace image
                      </p>
                    </div>
                  </div>
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
                Featured SaaS Product
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                <span className="text-yellow-500">collab</span>
                <span className="text-gray-900">Glam.com</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Our flagship SaaS platform that keeps photographers, stylists, makeup artists,
                and brand teams in one synchronized workspace.
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
                        Real-time collaboration
                      </h3>
                      <p className="text-gray-600">
                        Across shoots, campaigns, and launches in one synchronized workspace.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Centralized briefs & references
                      </h3>
                      <p className="text-gray-600">
                        All glam guidelines, moodboards, and assets in one place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Streamlined approvals
                      </h3>
                      <p className="text-gray-600">
                        Comments, status updates, and approvals all in one timeline.
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
                    Visit collabGlam.com
                    <span>→</span>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl">
                  {/* Placeholder for collabGlam dashboard image */}
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-yellow-100/50 to-amber-100/50">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">💼</div>
                      <p className="text-sm font-medium text-gray-600">
                        collabGlam dashboard preview
                      </p>
                    </div>
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
                        Open app
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
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg transition hover:shadow-xl"
                >
                  {/* Placeholder for portfolio images */}
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-yellow-200/50 to-amber-200/50">
                    <div className="text-center">
                      <div className="mb-2 text-5xl">📸</div>
                      <p className="text-sm font-medium text-gray-600">
                        Portfolio image {item}
                      </p>
                    </div>
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
                "Creative cloud-style dashboards",
                "Spatial & land experience mapping",
                "Data-driven storytelling",
                "Brand ecosystems",
                "Design systems",
                "Interactive presentations",
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
                  About Meru Land Private Limited
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We are a design-forward studio with roots in land development, branding,
                    and digital product design. Our work sits at the intersection of strategy
                    and aesthetics—where a strong story is supported by equally strong
                    interfaces, visuals, and experiences.
                  </p>
                  <p>
                    Whether you&apos;re shaping a new site, evolving a brand, or building
                    creative tools for teams, we design systems that feel as intuitive as a
                    well-organized creative cloud library.
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
                      href="mailto:hello@meruland.studio"
                      className="font-medium text-yellow-600 underline"
                    >
                      hello@meruland.studio
                    </a>{" "}
                    (placeholder).
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Meru Land Private Limited. All rights reserved.
              </p>
              <span className="text-sm text-gray-500">
                Crafted with a creative cloud–inspired workflow.
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
