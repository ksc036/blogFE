"use client";
import { useHeaderNavigation } from "@/widgets/header/model/useHeaderNavigation";
import styles from "./LoginModal.module.css";

type Props = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: Props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.title}>환영합니다!</div>
        <div className={styles.subtitle}>소셜 계정으로 로그인</div>

        <div className={styles.socialButtons}>
          <SocialButton platform="github" />
          <SocialButton platform="google" />
          <SocialButton platform="facebook" />
        </div>

        <div className={styles.signupText}>
          아직 회원이 아니신가요?{" "}
          <a href="/signup" className={styles.signupLink}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({
  platform,
}: {
  platform: "github" | "google" | "facebook";
}) => {
  const { goToLoginGoogle } = useHeaderNavigation();

  const icons: Record<string, string> = {
    github:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    google:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    facebook:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
  };
  const Login = (platform: string) => {
    if ("google" === platform) {
      goToLoginGoogle();
    } else {
      alert("해당기능은 준비중입니다. 구글 로그인을 이용해주세요");
    }
  };
  return (
    <button className={styles.socialButton} onClick={() => Login(platform)}>
      <img src={icons[platform]} alt={`${platform} 로그인`} />
    </button>
  );
};

export default LoginModal;
