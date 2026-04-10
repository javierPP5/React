import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Icon } from "@iconify/react";
import styles from "./socialLinks.module.css";
import { Twitter } from "lucide-react";

function SocialLinks() {
  return (
    <div className={styles["social-links"]}>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.github}`}
      >
        <FaGithub />
      </a>

      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.twitter}`}
      >
        <Twitter size="24" />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.linkedin}`}
      >
        <Icon icon="fa6-brands:linkedin" />
      </a>
    </div>
  );
}

export default SocialLinks;
