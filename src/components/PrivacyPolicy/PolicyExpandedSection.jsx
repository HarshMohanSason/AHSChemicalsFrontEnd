import styles from "./PolicyExpandedSection.module.css"

const PolicyExpandedSection = ({ title, items }) => (
  <section className={styles.policyExpandedSection}>
    <p><strong>{title}</strong></p>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </section>
);

export default PolicyExpandedSection;