import Link from "next/link";
import { CONTACT_EMAIL, ROUTES } from "@/lib/site";

/*
  Privacy notice, written only from what this website actually does (see the
  analytics, hosting, embed and email code). Retention periods, legal bases and
  any regulator-specific wording are for the owner to add (CONTENT_REQUIRED.md).
*/

const SECTIONS = [
  ["who", "Who we are"],
  ["collect", "What this website collects"],
  ["analytics", "Analytics"],
  ["hosting", "Hosting and images"],
  ["embeds", "Embedded video and social media"],
  ["email", "When you email us"],
  ["choices", "Your choices"],
  ["changes", "Changes to this notice"],
  ["contact", "Contact us"],
] as const;

export function PrivacyHero() {
  return (
    <section className="tc-hero" id="tc-top" data-hero-reveal="">
      <div className="tc-hero__inner" data-hero-parallax="">
        <span className="inline-block badge badge-gradient-helix tc-reveal" data-delay="0.1">Legal</span>
        <div className="md:space-y-4 space-y-2 mx-auto mt-5">
          <h1 className="text-accent w-fit max-w-full mx-auto max-md:text-[38px] max-md:leading-[1.1] tc-reveal" data-delay="0.2">
            {"Privacy "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-helix-blue">Policy</span>
          </h1>
          <p className="text-accent/60 w-fit text-base md:w-[640px] max-w-full mx-auto md:text-lg tc-reveal" data-delay="0.3">
            What happens to your information when you visit the Synkyn Studios website or get in touch with us.
          </p>
        </div>
        <div className="tc-reveal" data-delay="0.4">
          <p className="tc-updated">
            <span className="dot" aria-hidden="true" />
            Last updated: 13 October 2026
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyDocument() {
  return (
    <section className="tc-doc">
      <div className="tc-doc__wrap main-container">
        <details className="tc-toc tc-reveal" aria-label="Table of contents" open>
          <summary className="tc-toc__title">
            <span className="tc-toc__title-wrap">
              <svg className="tc-toc__title-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="13" y2="18" />
              </svg>
              <span>On this page</span>
              <span className="tc-toc__count">{SECTIONS.length} sections</span>
            </span>
            <span className="tc-toc__chevron-pill">
              <svg className="tc-toc__chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <ul className="tc-toc__list">
            {SECTIONS.map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>
        </details>

        <div className="tc-body">
          <p className="tc-intro tc-reveal">
            {"This notice explains what information the Synkyn Studios website (synkynstudios.com) collects, why, and who else is involved in providing it. The website has no accounts, no sign-up forms and no payments."}
          </p>

          <section className="tc-section tc-reveal" id="who">
            <h2>Who we are</h2>
            <p>
              {"Synkyn Studios is an AI film and creative production studio based in Bengaluru, Karnataka, India. In this notice, \"we\" and \"us\" mean Synkyn Studios."}
            </p>
          </section>

          <section className="tc-section tc-reveal" id="collect">
            <h2>What this website collects</h2>
            <p>Browsing the website involves four kinds of information:</p>
            <ul>
              <li><strong>Usage analytics</strong>{": which pages are visited and how, through Google Analytics."}</li>
              <li><strong>Technical request data</strong>{" (such as IP address, browser and device type) received by the services that deliver the website and its images."}</li>
              <li><strong>Data collected by embedded players</strong>{" (Vimeo, YouTube, Instagram) when their content loads or plays."}</li>
              <li><strong>What you send us by email</strong>{", if you choose to contact us."}</li>
            </ul>
            <p>
              {"Buttons that copy our email address to your clipboard do this entirely in your browser; nothing is sent to us."}
            </p>
          </section>

          <section className="tc-section tc-reveal" id="analytics">
            <h2>Analytics</h2>
            <p>
              {"We use Google Analytics 4 (the Google tag) to understand how the website is used: pages viewed, time on page, referring websites, approximate location derived from your IP address, and device and browser type. Google Analytics uses cookies or similar identifiers to recognise returning browsers. The website also loads Google Tag Manager, which we use to manage these measurement tags."}
            </p>
            <p>
              {"We also record when someone clicks one of our contact links (email, Instagram or LinkedIn) so we can see how people reach us. These records do not include your name, email address or the content of any message."}
            </p>
            <p>
              {"Google processes this information under its own terms. You can read "}
              <a className="tc-inline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from sites that use its services</a>.
            </p>
          </section>

          <section className="tc-section tc-reveal" id="hosting">
            <h2>Hosting and images</h2>
            <p>
              {"The website is hosted by Vercel, and most images are delivered by ImageKit. Like any web server, these services receive technical request data (such as your IP address, browser type and the page or file requested) in order to deliver the website and keep it secure."}
            </p>
          </section>

          <section className="tc-section tc-reveal" id="embeds">
            <h2>Embedded video and social media</h2>
            <p>
              {"Our films are played through embedded players from Vimeo and YouTube, and some work is shown through Instagram embeds. When these load or play, the provider receives data about your visit and may set its own cookies, under its own privacy policy. On the Library page, YouTube videos use YouTube's privacy-enhanced mode."}
            </p>
            <ul>
              <li><a className="tc-inline" href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer">Vimeo privacy policy</a></li>
              <li><a className="tc-inline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google (YouTube) privacy policy</a></li>
              <li><a className="tc-inline" href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer">Instagram privacy policy</a></li>
            </ul>
          </section>

          <section className="tc-section tc-reveal" id="email">
            <h2>When you email us</h2>
            <p>
              {"If you email us, we receive your email address and whatever you choose to include in your message, and we use it to reply to you and to discuss any project you raise. Please do not send sensitive personal information by email."}
            </p>
          </section>

          <section className="tc-section tc-reveal" id="choices">
            <h2>Your choices</h2>
            <ul>
              <li>{"You can block or delete cookies in your browser settings; the website works without them."}</li>
              <li>
                {"You can opt out of Google Analytics with "}
                <a className="tc-inline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">{"Google's opt-out browser add-on"}</a>.
              </li>
              <li>{"To ask about information we hold about you from your emails, contact us at the address below."}</li>
            </ul>
          </section>

          <section className="tc-section tc-reveal" id="changes">
            <h2>Changes to this notice</h2>
            <p>
              {"If what the website collects changes, we will update this page and the date at the top."}
            </p>
          </section>

          <section className="tc-section tc-reveal" id="contact">
            <h2>Contact us</h2>
            <p>
              {"Questions about this notice: "}
              <a className="tc-inline js-email-cta" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              {". See also our "}
              <Link className="tc-inline" href={ROUTES.terms}>{"Terms & Conditions"}</Link>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
