import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TermsOfService.module.css";

const TermsOfService = () => {
	return (
		<section className={styles.termsOfServiceSection}>
			<section className={styles.heading}>
				<FontAwesomeIcon icon={faClipboard} style={{ fontSize: "75px" }} />
				<h1>Terms of Service</h1>
			</section>

			<section className={styles.termsContent}>
				<ol>
					<li>
						<strong>Acceptance of the Terms</strong><br />
						By accessing or using the website, purchasing products, or engaging in services provided by AHS Chemicals, Inc. ("AHS Chemicals," "Company," "we," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our services.
					</li>

					<li>
						<strong>Eligibility</strong><br />
						You represent and warrant that you are at least 18 years of age and have the legal authority to enter into these Terms. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization.
					</li>

					<li>
						<strong>Regulatory Compliance</strong><br />
						All products offered by AHS Chemicals are intended for industrial, laboratory, or research use only, unless explicitly stated otherwise. You agree to comply with all applicable federal, state, and local laws and regulations, including but not limited to OSHA, REACH, TSCA, and GHS regulations, in connection with your use, handling, storage, transportation, and disposal of our products.
					</li>

					<li>
						<strong>Product Use Disclaimer</strong><br />
						Our products are not intended for human consumption, drug formulation, food processing, or cosmetic use. It is your responsibility to understand the risks associated with chemical handling and to utilize appropriate safety measures, including review of the Safety Data Sheets (SDS) provided upon request or availability on our website.
					</li>

					<li>
						<strong>Order Acceptance and Cancellation</strong><br />
						All purchase orders are subject to acceptance by AHS Chemicals. We reserve the right to cancel or reject orders for any reason, including but not limited to availability, compliance concerns, or pricing errors. Once accepted, orders are non-cancellable except at our sole discretion.
					</li>

					<li>
						<strong>Pricing and Payment Terms</strong><br />
						Prices are subject to change without notice and do not include taxes, duties, shipping, or handling charges unless otherwise specified. Payment terms are net 30 days from the invoice date unless otherwise agreed in writing. Late payments may incur interest at the lesser of 1.5% per month or the maximum permitted by law.
					</li>

					<li>
						<strong>Shipping, Risk of Loss, and Delivery</strong><br />
						All products are shipped FOB Origin. Risk of loss passes to you upon our delivery to the carrier. Shipping dates are estimates only and we are not liable for any delays in shipment or delivery.
					</li>

					<li>
						<strong>Returns and Refunds</strong><br />
						Returns are not accepted without prior written authorization from AHS Chemicals. Claims for defective or non-conforming products must be made in writing within seven (7) days of receipt. If approved, we may replace the item or provide a refund at our sole discretion.
					</li>

					<li>
						<strong>Intellectual Property Rights</strong><br />
						All website content, trademarks, logos, product data, and documentation are the property of AHS Chemicals or its licensors. No license or right is granted to you except as expressly authorized by these Terms.
					</li>

					<li>
						<strong>Limitation of Liability</strong><br />
						TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AHS CHEMICALS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, ARISING FROM OR RELATED TO THESE TERMS, THE PRODUCTS, OR YOUR USE OF THE SERVICES.
					</li>

					<li>
						<strong>Indemnification</strong><br />
						You agree to indemnify, defend, and hold harmless AHS Chemicals and its officers, directors, employees, and affiliates from any claims, liabilities, damages, and expenses (including reasonable attorneys’ fees) arising from your use or misuse of the products or violation of these Terms.
					</li>

					<li>
						<strong>Termination</strong><br />
						We may suspend or terminate your access to our website or services at any time, with or without cause or notice. Upon termination, your right to use our services will immediately cease.
					</li>

					<li>
						<strong>Governing Law and Jurisdiction</strong><br />
						These Terms shall be governed by and construed in accordance with the laws of the State of [Insert State], without regard to conflict of law principles. You consent to the exclusive jurisdiction and venue of the state and federal courts located in [Insert County, State] for the resolution of any disputes.
					</li>

					<li>
						<strong>Changes to These Terms</strong><br />
						We reserve the right to modify these Terms at any time. We will notify users of changes by posting the updated Terms on our website. Continued use of the services constitutes acceptance of the updated Terms.
					</li>
				</ol>
			</section>
		</section>
	);
};

export default TermsOfService;