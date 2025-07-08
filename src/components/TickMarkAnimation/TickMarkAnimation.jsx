import styles from "./TickMarkAnimation.module.css";

const TickMarkAnimation = () => {
  return (
    <svg className={styles.tick} viewBox="0 0 52 52">
      <circle className={styles.tickCircle} cx="26" cy="26" r="25" fill="none" />
      <path className={styles.tickCheck} fill="none" d="M14 27l7 7 16-16" />
    </svg>
  );
};

export default TickMarkAnimation;