export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: [DATE]</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <p className="text-gray-300">
              <strong>Doogoo Habits</strong> respects your privacy. This Privacy
              Policy explains how we handle user data.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-300 mb-3">
              Our app does not collect personal information such as name, email
              address, phone number, or location.
            </p>
            <p className="text-gray-300">
              If analytics or crash reports are used (e.g. Google Firebase),
              they are collected anonymously to improve app stability and
              performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              2. Children&apos;s Information
            </h2>
            <p className="text-gray-300 mb-3">
              This app may be used by children under the age of 13. We do not
              knowingly collect personal information from children.
            </p>
            <p className="text-gray-300">
              If you believe that your child has provided personal information,
              please contact us and we will remove it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              3. Use of Information
            </h2>
            <p className="text-gray-300 mb-3">
              Any non-personal data collected is used solely to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Improve app functionality</li>
              <li>Fix bugs and crashes</li>
              <li>Enhance user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              4. Data Sharing
            </h2>
            <p className="text-gray-300">
              We do not sell, trade, or share user data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-gray-300 mb-3">
              The app may use trusted third-party services such as:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Google Play Services</li>
              <li>Firebase Analytics (if enabled)</li>
            </ul>
            <p className="text-gray-300 mt-3">
              These services may collect information according to their own
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              6. Security
            </h2>
            <p className="text-gray-300">
              We take reasonable steps to protect user data, but no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-300">
              We may update this policy from time to time. Changes will be
              posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              8. Contact Us
            </h2>
            <p className="text-gray-300 mb-2">
              If you have any questions about this Privacy Policy, you may
              contact us at:
            </p>
            <p className="text-gray-300">
              Email:{" "}
              <a
                href="mailto:eelin@doogoohabits.com"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                eelin@doogoohabits.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
