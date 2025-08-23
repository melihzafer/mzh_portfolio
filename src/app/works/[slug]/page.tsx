import { notFound } from 'next/navigation'

// Sample work data - in production this would come from MDX files
const worksData: Record<string, any> = {
  'ecommerce-redesign': {
    title: "E-commerce Platform Redesign",
    tagline: "Modern shopping experience with performance optimization",
    role: ["Frontend Developer", "UI Designer"],
    context: "Website Redesign",
    period: "2024",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe"],
    summary: "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization. Implemented modern design patterns and performance improvements that increased conversion rates by 35%.",
    results: [
      { metric: "Conversion Rate", value: "+35%", note: "Increased from 2.1% to 2.8%" },
      { metric: "Page Load Time", value: "-60%", note: "Reduced from 4.2s to 1.7s" },
      { metric: "Mobile Sales", value: "+45%", note: "Mobile now accounts for 65% of sales" }
    ]
  },
  'saas-dashboard': {
    title: "SaaS Dashboard Interface",
    tagline: "Data visualization platform for enterprise analytics",
    role: ["Frontend Developer", "UX Designer"],
    context: "Product Development",
    period: "2024",
    tech: ["React", "TypeScript", "D3.js", "Tailwind CSS", "WebSocket"],
    summary: "Designed and developed a comprehensive analytics dashboard for enterprise clients. Features real-time data visualization, customizable widgets, and advanced reporting capabilities.",
    results: [
      { metric: "User Engagement", value: "+120%", note: "Daily active users doubled" },
      { metric: "Report Generation", value: "-75%", note: "Time reduced from 20min to 5min" }
    ]
  },
  'mobile-banking': {
    title: "Mobile Banking App",
    tagline: "Secure and intuitive financial management",
    role: ["Mobile Developer", "UI Designer"],
    context: "Mobile App",
    period: "2023",
    tech: ["React Native", "TypeScript", "Expo", "Zustand"],
    summary: "Built a secure mobile banking application with biometric authentication, real-time transaction monitoring, and intuitive money management features.",
    results: [
      { metric: "User Adoption", value: "+200%", note: "Active users tripled in 6 months" },
      { metric: "Security Score", value: "99.9%", note: "Zero security incidents reported" }
    ]
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const work = worksData[slug]
  
  if (!work) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-muted mb-6">
              <span>{work.context}</span>
              <span>•</span>
              <span>{work.period}</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 text-balance">
              {work.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted mb-8 text-pretty">
              {work.tagline}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {work.role.map((r: string) => (
                <span 
                  key={r}
                  className="px-3 py-1 bg-brand/10 text-brand text-sm rounded-full"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              The Project
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {work.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      {work.results && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-12 text-center">
                Results
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {work.results.map((result: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
                      {result.value}
                    </div>
                    <div className="font-medium mb-2">
                      {result.metric}
                    </div>
                    <div className="text-sm text-muted">
                      {result.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              Technology Stack
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {work.tech.map((t: string) => (
                <span 
                  key={t}
                  className="px-4 py-2 bg-brand/10 text-brand rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
