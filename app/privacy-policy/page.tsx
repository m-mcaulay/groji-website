import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  // ---- Quick edits: set your details here ----
  const COMPANY = "Groji";
  const CITY_COUNTRY = "London, UK";
  const CONTACT_EMAIL = "info@groji.co.uk";
  const PROVIDERS = ["MailerLite"]; // list your processors
  const UPDATED = "29 August 2025"; // e.g., "29 August 2025"

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="hover:underline hover:text-blue-600 flex items-center"
        >
          <span className="inline-block">
            <ArrowLeft size={18} />
          </span>{" "}
          <span className="text-md">Back</span>
        </Link>
        <header className="mb-10 mt-6">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Notice</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: {UPDATED}</p>
        </header>

        <article className="prose prose-gray prose-headings:font-semibold prose-headings:text-gray-900 leading-relaxed max-w-none">
          <p>
            {COMPANY} ("we", "us") respects your privacy. This Privacy Notice
            explains how we collect, use and protect your information when you
            join our waitlist or free tier on our pre-launch website.
          </p>

          <h2>1. Who we are</h2>
          <p>
            We are {COMPANY}, based in {CITY_COUNTRY}. If you have questions,
            contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>2. What data we collect</h2>
          <ul className="list-disc list-inside">
            <li>Email address (when you sign up)</li>
            <li>
              Your consent choice (if you tick the box to receive marketing
              updates)
            </li>
            <li>
              Technical logs (e.g., basic server logs and form submission
              metadata) where necessary for security and abuse prevention
            </li>
          </ul>

          <h2>3. How we use your data</h2>
          <ul className="list-disc list-inside">
            <li>
              Send you a confirmation (‘thank-you’) email when you join the
              waitlist
            </li>
            <li>Notify you when our product launches (legitimate interest)</li>
            <li>
              Provide early access or free-tier updates (legitimate interest)
            </li>
            <li>
              Send occasional news or offers (only if you consent to marketing)
            </li>
          </ul>

          <h2>4. Our legal bases</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Legitimate interests</strong> to contact you once about
              launch/early access when you join the waitlist
            </li>
            <li>
              <strong>Consent</strong> for ongoing marketing communications. You
              can withdraw consent at any time
            </li>
          </ul>

          <h2>5. Who we share data with</h2>
          <p>
            We store emails and send messages using our email provider{" "}
            {PROVIDERS.join(", ")}. They process your data securely on our
            behalf. We do not sell your data.
          </p>

          <h2>6. International transfers</h2>
          <p>
            If our providers process data outside the UK, we rely on appropriate
            safeguards (e.g., Standard Contractual Clauses) or adequacy
            decisions. Details are available on request.
          </p>

          <h2>7. How long we keep your data</h2>
          <ul className="list-disc list-inside">
            <li>
              Waitlist emails: kept until launch and any immediate follow-up
              messages, then deleted unless you also opted into marketing
              updates
            </li>
            <li>
              Marketing emails: kept until you unsubscribe or we no longer need
              them
            </li>
            <li>
              Security logs: kept for a short period for fraud and abuse
              prevention
            </li>
          </ul>

          <h2>8. Your rights (UK GDPR)</h2>
          <p>
            You have the right to access, correct, delete, restrict or object to
            processing of your personal data, and to data portability. Where we
            rely on consent, you can withdraw it at any time.
          </p>

          <h2>9. How to unsubscribe or make a request</h2>
          <p>
            Every marketing email includes an unsubscribe link provided by{" "}
            {PROVIDERS.join(", ")}. You can also email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to
            unsubscribe or make a data rights request.
          </p>

          <h2>10. Children</h2>
          <p>
            Our waitlist is not intended for children under 16. We do not
            knowingly collect data from children.
          </p>

          <h2>11. Changes to this notice</h2>
          <p>
            We may update this notice from time to time. We will post the new
            version here and update the date above.
          </p>
        </article>
      </section>
    </main>
  );
}
