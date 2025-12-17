/**
 * CUSTOMIZE: Replace this placeholder terms of service with your own
 *
 * This is a template with common sections. You should:
 * - Update the content to match your actual service terms
 * - Add your company/product name
 * - Update the contact email
 * - Consider consulting a lawyer for compliance
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
  return (
    <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <article className="prose prose-slate mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: December 2024
        </p>

        <section className="mt-8">
          <h2>1. Introduction</h2>
          <p>
            These Terms of Service govern your access to and use of our service.
            By using our service, you agree to these terms.
          </p>
        </section>

        <section className="mt-8">
          <h2>2. Eligibility</h2>
          <p>To use our service, you must:</p>
          <ul>
            <li>Be at least 16 years of age</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Use the service in accordance with applicable laws</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>3. Account Registration</h2>
          <p>
            To access the service, you must create a user account via Google
            OAuth. You are responsible for all activities under your account.
          </p>
        </section>

        <section className="mt-8">
          <h2>4. User Obligations</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the service lawfully</li>
            <li>Not attempt unauthorized access</li>
            <li>Not interfere with normal operation</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>5. Intellectual Property</h2>
          <p>
            The service, including software and design, is our property and
            protected by intellectual property laws. You retain rights to your
            own data.
          </p>
        </section>

        <section className="mt-8">
          <h2>6. Disclaimer</h2>
          <p>
            The service is provided "as is" without warranties of any kind. We
            are not liable for indirect or consequential damages.
          </p>
        </section>

        <section className="mt-8">
          <h2>7. Termination</h2>
          <p>
            You may stop using the service at any time. We may terminate access
            for violation of these terms.
          </p>
        </section>

        <section className="mt-8">
          <h2>8. Contact</h2>
          <p>
            For questions about these Terms, contact us at support@example.com.
          </p>
        </section>
      </article>
    </main>
  );
};

export const Route = createFileRoute('/_public/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service' },
      { name: 'description', content: 'Terms of service for our application' },
    ],
  }),
});
