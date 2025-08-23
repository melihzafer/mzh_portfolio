import { siteConfig } from "@/lib/data"

export const metadata = {
  title: "Terms of Service | Melih Zafer Hyusein",
  description: "Terms of Service for the portfolio website of Melih Zafer Hyusein."
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg text-text py-16 md:py-24">
      <div className="container max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">1. Acceptance of Terms</h2>
          <p className="text-muted">By accessing this website, you agree to be bound by these Terms and all applicable laws and regulations.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">2. Use License</h2>
          <p className="text-muted">Content is provided for personal and non-commercial use. You may not copy, modify, or redistribute without permission.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">3. Liability</h2>
          <p className="text-muted">The content is provided "as is" without warranties of any kind. In no event shall the owner be liable for any damages arising from the use of the site.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-xl">4. Contact</h2>
          <p className="text-muted">For questions regarding these terms, contact: {siteConfig.contactEmail}</p>
        </section>
      </div>
    </main>
  )
}
