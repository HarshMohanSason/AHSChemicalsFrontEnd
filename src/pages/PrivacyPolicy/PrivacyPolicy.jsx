import { useState } from "react";
import PolicyExpandedSection from "../../components/PrivacyPolicy/PolicyExpandedSection";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
	const [expandedIndex, setExpandedIndex] = useState(null);

	const toggleExpanded = (index) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	const sections = [
		{
			title: "1. Information We Collect",
			subSections: [
				{
					title: "A. Personal Information:",
					items: [
						"Full name, email address, phone number",
						"Company name, job title, and business contact info",
						"Billing and shipping addresses",
						"Tax Identification Number (TIN) or EIN (if required)",
						"Account login details (if registered with us)",
					],
				},
				{
					title: "B. Transactional and Regulatory Information:",
					items: [
						"Orders, invoices, and purchase history",
						"Delivery instructions and chain-of-custody details",
						"Safety documentation acknowledgments (e.g., SDS receipts)",
						"Certifications and permits (e.g., hazardous materials handling)",
					],
				},
				{
					title: "C. Website and Technical Data:",
					items: [
						"IP address, browser type, and device ID",
						"Website behavior via cookies and analytics tools",
						"Time zone, geographic location, and referring URLs",
					],
				},
			],
		},
		{
			title: "2. How We Use Your Information",
			items: [
				"Order Processing: Managing quotes, orders, shipments, and invoicing",
				"Compliance: Fulfilling regulatory and legal obligations (e.g., OSHA, TSCA)",
				"Customer Support: Responding to inquiries and offering technical support",
				"Safety Communications: Sending updates about chemical safety and compliance",
				"Marketing (if opted in): Informing you of new products, promotions, or industry news",
				"Website Functionality: Monitoring site performance and improving user experience",
			],
		},
		{
			title: "3. Legal Bases for Processing",
			items: [
				"Performance of a contract",
				"Compliance with legal obligations",
				"Legitimate business interests",
				"Consent (for marketing, non-essential cookies, etc.)",
			],
		},
		{
			title: "4. Sharing of Information",
			items: [
				"We do not sell your personal information.",
				"Third-party service providers (e.g., logistics, IT, cloud storage)",
				"Government or regulatory bodies (as legally required)",
				"Compliance partners (e.g., environmental safety auditors, permitting authorities)",
				"Credit and collections partners (for payment disputes)",
				"All third-party partners are contractually obligated to safeguard your data.",
			],
		},
		{
			title: "5. California Residents: CCPA Disclosures",
			items: [
				"Know what personal information we collect and why",
				"Request access to or deletion of your information",
				"Opt-out of the sale of personal information (note: we do not sell your data)",
				"Appoint an authorized agent to make requests on your behalf",
				"To exercise these rights, email privacy@ahs-chemicals.com with the subject “CCPA Request.”",
			],
		},
		{
			title: "6. Data Security",
			items: [
				"Encrypted storage and secure access control",
				"Firewalls, intrusion detection systems, and malware scanning",
				"Employee training on confidentiality and chemical compliance",
				"Role-based access to sensitive data",
			],
		},
		{
			title: "7. Data Retention",
			items: [
				"Fulfill business and contractual obligations",
				"Comply with chemical industry regulations (e.g., recordkeeping under EPA, DOT, or OSHA)",
				"Defend against legal claims and audits",
			],
		},
		{
			title: "8. Cookies and Website Tracking",
			items: [
				"Our website uses cookies for performance, analytics, and functionality.",
				"You may manage cookie preferences through your browser settings.",
				"Note: disabling cookies may impact some website features.",
			],
		},
		{
			title: "9. Children’s Privacy",
			items: [
				"Our services are not directed to individuals under 18.",
				"We do not knowingly collect personal data from minors.",
				"If we become aware that a minor has provided us information, we will delete it promptly.",
			],
		},
		{
			title: "10. Changes to This Policy",
			items: [
				"AHS Chemicals may revise this Privacy Policy as business or legal needs evolve.",
				"Updates will be posted on this page with an updated “Effective Date.”",
				"Continued use of our services constitutes your acceptance of any changes.",
			],
		},
		{
			title: "11. Contact Us",
			items: [
				"AHS Chemicals",
				"Email: inbox@azurehospitalitysupply.com",
				"Mailing Address: 1400 Easton Ste. 139-A Bakersfield CA 93309",
			],
		},
	];

	return (
		<section className={styles.privacyPolicySection}>
			<h1 className={styles.heading}>Privacy Policy</h1>

			<section className={styles.TabsSection}>
				{sections.map((section, index) => (
					<section className={styles.policyDisplay} key={index} >
						<div className={styles.policyDisplayTile} onClick={() => toggleExpanded(index)}>
							<p>{section.title}</p>
							<button>
								{expandedIndex === index ? "−" : "+"}
							</button>
						</div>
						{expandedIndex === index && (
							<section className={styles.policyExpandedSection}>
								{section.subSections ? (
									section.subSections.map((sub, subIndex) => (
										<PolicyExpandedSection
											key={subIndex}
											title={sub.title}
											items={sub.items}
										/>
									))
								) : (
									<PolicyExpandedSection
										title=""
										items={section.items}
									/>
								)}
							</section>
						)}
					</section>
				))}
			</section>
		</section>
	);
};

export default PrivacyPolicy;
