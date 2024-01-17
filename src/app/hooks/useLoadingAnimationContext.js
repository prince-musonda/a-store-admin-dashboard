import { useContext } from "react";
import { LoadingAnimationContext } from "../context/loadingAnimationContext";

export function useLoadingAnimationContext() {
  const { showLoadingAnimation, setShowLoadingAnimation } = useContext(
    LoadingAnimationContext
  );
  return [showLoadingAnimation, setShowLoadingAnimation];
}
