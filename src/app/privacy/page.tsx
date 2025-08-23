import { siteConfig } from "@/lib/data"

export const metadata = {
  title: "Privacy Policy | Melih Zafer Hyusein",
  description: "Privacy Policy for the portfolio website of Melih Zafer Hyusein."
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg text-text py-16 md:py-24">
      <div className="container max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">1. Information Collection</h2>
          <p className="text-muted">This website may collect personal information that you voluntarily provide through the contact form, such as name and email.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">2. Use of Information</h2>
          <p className="text-muted">Collected information is used strictly to respond to inquiries and improve the website experience. Data is not sold or shared with third parties.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">3. Cookies</h2>
          <p className="text-muted">Basic analytics may use cookies to understand usage patterns. You can disable cookies in your browser settings.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-semibold text-xl">4. Data Security</h2>
          <p className="text-muted">Reasonable measures are in place to protect your data, but no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-xl">5. Contact</h2>
          <p className="text-muted">For questions regarding this policy, contact: {siteConfig.contactEmail}</p>
        </section>
      </div>
    </main>
  )
}
