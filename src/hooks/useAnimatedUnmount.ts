import { useEffect, useRef, useState } from 'react';

export function useAnimatedUnmount(isVisible: boolean) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animationRef = useRef<HTMLDivElement>(null);

  if (isVisible && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const element = animationRef.current;

    if (!element) {
      return;
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isVisible, shouldRender]);

  return {
    shouldRender,
    animationRef,
  };
}
