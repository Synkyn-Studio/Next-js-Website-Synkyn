import Link from "next/link";

export default function TermsDocument() {
  return (
    <section className="tc-doc">
      <div className="tc-doc__wrap main-container">
        {/* Table of contents */}
        <details className="tc-toc tc-reveal" aria-label="Table of contents" open>
          <summary className="tc-toc__title">
            <span className="tc-toc__title-wrap">
              <svg className="tc-toc__title-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="13" y2="18" />
              </svg>
              <span>On this page</span>
              <span className="tc-toc__count">19 sections</span>
            </span>
            <span className="tc-toc__chevron-pill">
              <svg className="tc-toc__chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <ul className="tc-toc__list">
            <li>
              <a href="#definitions">Definitions</a>
            </li>
            <li>
              <a href="#engagement">Engagement of Services</a>
            </li>
            <li>
              <a href="#fees">Fees and Payment</a>
            </li>
            <li>
              <a href="#client">Client Responsibilities and Materials</a>
            </li>
            <li>
              <a href="#ai">Use of Artificial Intelligence</a>
            </li>
            <li>
              <a href="#ip">Intellectual Property and Ownership</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio and Promotional Use</a>
            </li>
            <li>
              <a href="#revisions">Revisions and Approvals</a>
            </li>
            <li>
              <a href="#confidentiality">Confidentiality</a>
            </li>
            <li>
              <a href="#warranties">Warranties and Disclaimers</a>
            </li>
            <li>
              <a href="#liability">Limitation of Liability</a>
            </li>
            <li>
              <a href="#indemnification">Indemnification</a>
            </li>
            <li>
              <a href="#termination">Term and Termination</a>
            </li>
            <li>
              <a href="#website">Website Use</a>
            </li>
            <li>
              <a href="#force-majeure">Force Majeure</a>
            </li>
            <li>
              <a href="#changes">Changes to These Terms</a>
            </li>
            <li>
              <a href="#law">Governing Law and Jurisdiction</a>
            </li>
            <li>
              <a href="#general">General</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </details>
        {/* Document body */}
        <div className="tc-body">
          <p className="tc-intro tc-reveal">
            {"These Terms & Conditions (\"Terms\") govern your use of the Synkyn Studios website (the \"Website\") and the services we provide (\"Services\"). \"Synkyn Studios\", \"we\", \"us\", and \"our\" refer to Synkyn Studios, an AI-native creative production studio based in Bengaluru, Karnataka, India; \"you\" and \"your\" refer to the client or website visitor. By accessing our Website or engaging our Services, you agree to these Terms."}
          </p>
          <section className="tc-section tc-reveal" id="definitions">
            <h2>Definitions</h2>
            <p>In these Terms, the following words have the meanings set out below.</p>
            <ul>
              <li>
                <strong>{"\"Deliverables\""}</strong>
                {" means the final creative outputs we produce for you under an engagement, including films, images, campaigns, key art, and related assets."}
              </li>
              <li>
                <strong>{"\"Project\""}</strong>
                {" means a specific engagement for Services agreed between you and us."}
              </li>
              <li>
                <strong>{"\"Proposal\""}</strong>
                {" means the written scope, timeline, and fee document we provide for a Project."}
              </li>
              <li>
                <strong>{"\"AI Tools\""}</strong>
                {" means the generative artificial intelligence models, software, and third-party platforms we use to produce Deliverables."}
              </li>
              <li>
                <strong>{"\"Client Materials\""}</strong>
                {" means any content, brand assets, briefs, or information you provide to us for use in a Project."}
              </li>
            </ul>
          </section>
          <section className="tc-section tc-reveal" id="engagement">
            <h2>Engagement of Services</h2>
            <p>
              Each Project begins with a written Proposal describing the scope of work, deliverables, timeline, and fees. A Project is confirmed once you accept the Proposal in writing (including by email) and, where required, pay the agreed advance. These Terms apply to every Project unless a separate signed agreement between you and us states otherwise, in which case that agreement prevails to the extent of any conflict.
            </p>
            <p>
              Any work beyond the agreed scope, including additional revisions, added deliverables, or changes to creative direction after approval, will be treated as new work and may be subject to additional fees and timelines, agreed in writing before we proceed.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="fees">
            <h2>Fees and Payment</h2>
            <p>
              Fees for each Project are set out in the applicable Proposal. Unless stated otherwise, an advance is payable before work begins, with the balance due on the schedule specified in the Proposal. All fees are exclusive of applicable taxes, including GST, which will be added where required by law.
            </p>
            <p>
              Invoices are payable within the period stated on the invoice. We reserve the right to pause or suspend work on any Project where payment is overdue. Late payments may attract interest at the rate permitted under applicable law. Except where required by law or expressly stated in a Proposal, fees and advance payments are non-refundable once work has commenced, as our costs, including AI compute and creative time, are incurred from the outset.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="client">
            <h2>Client Responsibilities and Materials</h2>
            <p>
              You agree to provide, in a timely manner, all Client Materials, briefs, approvals, and feedback reasonably required for us to deliver the Services. Delays in providing these may affect the Project timeline, for which we are not responsible.
            </p>
            <p>
              You represent and warrant that you own or have the necessary rights, licenses, and permissions to all Client Materials you provide, and that our use of them for the Project will not infringe the intellectual property, privacy, publicity, or other rights of any third party. You agree to indemnify us against any claim arising from Client Materials you supply.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="ai">
            <h2>Use of Artificial Intelligence</h2>
            <p>
              Our Services are AI-native. We use generative AI Tools, including third-party models and platforms, to create and assist in producing Deliverables. By engaging us, you acknowledge and agree to the following.
            </p>
            <p>
              Deliverables may be generated, in whole or in part, using AI Tools, and our creative process combines these tools with human direction, art direction, and post-production. The nature of generative AI means that outputs can be unpredictable, may vary between iterations, and may in rare cases resemble other works; while we take reasonable care to produce original, brand-safe results, we do not warrant that outputs are wholly unique or free of coincidental similarity. Some third-party AI Tools carry their own terms of use that may affect ownership, licensing, or permitted commercial use of outputs, and where relevant we will work within those terms. You are responsible for satisfying yourself that the final Deliverables are suitable for your intended use, including any regulatory, advertising-standards, or platform-specific requirements applicable to your industry.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="ip">
            <h2>Intellectual Property and Ownership</h2>
            <p>
              Ownership of the final Deliverables transfers to you only upon full and final payment of all fees for the relevant Project. Until then, all rights in the Deliverables and any work in progress remain with us.
            </p>
            <p>
              Upon full payment, you receive the rights to the final Deliverables as specified in the applicable Proposal, for the agreed usage, territory, and duration. Unless expressly granted in writing, this does not include ownership of underlying working files, project files, unused concepts, prompts, models, look-development recipes, or the tools, techniques, and know-how we use to create the Deliverables, all of which remain our property.
            </p>
            <p>
              We retain ownership of our pre-existing materials, methodologies, pipelines, and any general skills or knowledge developed during a Project. Third-party assets, including licensed stock, fonts, music, or plugins incorporated into a Deliverable, remain subject to their respective licenses, and you are responsible for maintaining any ongoing licenses required for continued use.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="portfolio">
            <h2>Portfolio and Promotional Use</h2>
            <p>
              Unless you tell us otherwise in writing, you grant us the right to display, reproduce, and share the Deliverables and a description of the work we produced for you in our portfolio, showreel, Website, social media, award submissions, and other promotional materials. If a Project is confidential or subject to an embargo, please notify us in writing so we can agree appropriate restrictions.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="revisions">
            <h2>Revisions and Approvals</h2>
            <p>
              Each Proposal specifies the number of revision rounds included. Additional revisions beyond the included rounds may incur further fees. Once you approve a Deliverable or stage of work in writing, that approval is final, and subsequent changes will be treated as new work.
            </p>
            <p>
              You are responsible for reviewing and approving all Deliverables, including checking for accuracy in copy, names, figures, claims, and legal or regulatory compliance, before publication or distribution. We are not liable for errors in final Deliverables that were approved by you.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="confidentiality">
            <h2>Confidentiality</h2>
            <p>
              Each party agrees to keep confidential any non-public information disclosed by the other in connection with a Project, and to use it only for the purposes of the Project. This obligation does not apply to information that is or becomes public through no fault of the receiving party, was already known to the receiving party, or is required to be disclosed by law. This clause survives the completion or termination of any Project.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="warranties">
            <h2>Warranties and Disclaimers</h2>
            <p>
              {"We will perform the Services with reasonable skill and care, in a professional manner consistent with industry standards. Except as expressly stated in these Terms, the Website, Services, and Deliverables are provided \"as is\" and \"as available,\" and we disclaim all other warranties, whether express or implied, to the fullest extent permitted by law, including any implied warranties of merchantability, fitness for a particular purpose, and non-infringement."}
            </p>
            <p>
              We do not warrant that the Website will be uninterrupted or error-free, that the Services will meet every expectation not expressly agreed, or that Deliverables produced using AI Tools will achieve any specific commercial, marketing, or performance result.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="liability">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event will we be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, goodwill, or business opportunity, arising out of or in connection with the Services, Deliverables, or these Terms, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability arising out of or in connection with any Project, whether in contract, tort (including negligence), or otherwise, will not exceed the total fees actually paid by you to us for that specific Project.
            </p>
            <p>Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.</p>
          </section>
          <section className="tc-section tc-reveal" id="indemnification">
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Synkyn Studios, its founders, employees, and contractors from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of or related to your use of the Deliverables after delivery, your Client Materials, your breach of these Terms, or your violation of any law or third-party right.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="termination">
            <h2>Term and Termination</h2>
            <p>
              Either party may terminate a Project by written notice if the other party materially breaches these Terms and fails to remedy the breach within a reasonable period after being notified.
            </p>
            <p>
              If a Project is terminated, you agree to pay for all Services performed and costs incurred up to the date of termination, including any non-cancellable third-party or AI compute costs committed for the Project. Upon termination, any rights granted in Deliverables not fully paid for revert to us. Clauses relating to payment, intellectual property, confidentiality, warranties, liability, and indemnification survive termination.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="website">
            <h2>Website Use</h2>
            <p>
              You agree to use the Website only for lawful purposes and not to attempt to gain unauthorized access to, interfere with, or disrupt the Website or its underlying systems. All content on the Website, including text, graphics, logos, showreels, and design, is owned by or licensed to us and is protected by intellectual property laws. You may not copy, reproduce, or distribute Website content without our prior written consent.
            </p>
            <p>The Website may contain links to third-party sites. We are not responsible for the content, policies, or practices of any third-party sites.</p>
          </section>
          <section className="tc-section tc-reveal" id="force-majeure">
            <h2>Force Majeure</h2>
            <p>
              We will not be liable for any delay or failure to perform caused by events beyond our reasonable control, including but not limited to acts of God, natural disasters, epidemics or pandemics, war, civil unrest, government action, power or internet failures, or the unavailability, failure, or material change of third-party AI Tools or platforms.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="changes">
            <h2>Changes to These Terms</h2>
            <p>
              {"We may update these Terms from time to time. The updated version will be posted on the Website with a revised \"Last updated\" date, and will apply to Projects confirmed after that date. For ongoing Projects, the Terms in effect when the Project was confirmed will continue to apply unless we agree otherwise in writing. Your continued use of the Website or Services after changes are posted constitutes acceptance of the updated Terms."}
            </p>
          </section>
          <section className="tc-section tc-reveal" id="law">
            <h2>Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms or any Project will be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India. The parties agree to attempt in good faith to resolve any dispute amicably before commencing legal proceedings.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="general">
            <h2>General</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force. Our failure to enforce any right or provision will not be a waiver of that right or provision. These Terms, together with any accepted Proposal, constitute the entire agreement between you and us regarding the Services and supersede any prior understandings.
            </p>
          </section>
          <section className="tc-section tc-reveal" id="contact">
            <h2>Contact Us</h2>
            <p>For any questions about these Terms, please contact us:</p>
            <div className="tc-contact">
              <div>
                <h3>Questions about these Terms?</h3>
                <p>
                  <a className="tc-inline" href="mailto:contact@synkynstudios.com">contact@synkynstudios.com</a>
                </p>
              </div>
              <Link className="btn btn-md btn-primary" href="/contact">
                <span>Contact Synkyn Studios</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
