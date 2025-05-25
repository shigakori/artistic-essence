import { useRouter } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition/PageTransition";

export function useAnimatedNavigate(setIsMenuOpen) {
  const router = useRouter();
  const { startClosing } = usePageTransition();

  return (path, afterNavigate) => {
    startClosing(path, () => {
      router.push(path);
      if (setIsMenuOpen) setIsMenuOpen(false);
      if (afterNavigate) afterNavigate();
    });
  };
} 