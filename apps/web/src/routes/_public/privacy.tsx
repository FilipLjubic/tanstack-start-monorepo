import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
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
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: December 2024
        </p>

        <section className="mt-8">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, process, and
            protect your personal data when you use our service.
          </p>
        </section>

        <section className="mt-8">
          <h2>2. Data We Collect</h2>
          <p>When you register via Google OAuth, we collect:</p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Profile picture (if available)</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>3. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and maintain the service</li>
            <li>Manage your account</li>
            <li>Communicate with you about the service</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data, including encryption in transit and at rest.
          </p>
        </section>

        <section className="mt-8">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>6. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at
            support@example.com.
          </p>
        </section>
      </article>
    </main>
  );
};

export const Route = createFileRoute('/_public/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy' },
      { name: 'description', content: 'Privacy policy for our service' },
    ],
  }),
});
