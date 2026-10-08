import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';

export function useCarousel(itemsLength: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);
  const [peekingIndexes, setPeekingIndexes] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const suppressClickRef = useRef(false);

  const updateControls = useCallback(() => {
    const element = viewportRef.current;

    if (!element) {
      return;
    }

    const hasOverflow = element.scrollWidth > element.clientWidth + 1;

    setCanGoPrev(element.scrollLeft > 1);
    setCanGoNext(hasOverflow && element.scrollLeft + element.clientWidth < element.scrollWidth - 1);

    if (element.scrollLeft > 1) {
      setPeekingIndexes((prev) => (prev.length === 0 ? prev : []));
      return;
    }

    const bounds = element.getBoundingClientRect();
    const track = element.firstElementChild;
    const partial: number[] = [];

    if (track) {
      Array.from(track.children).forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const intersects =
          rect.left < bounds.right &&
          rect.right > bounds.left &&
          rect.top < bounds.bottom &&
          rect.bottom > bounds.top;
        const isFull =
          rect.left >= bounds.left &&
          rect.right <= bounds.right &&
          rect.top >= bounds.top &&
          rect.bottom <= bounds.bottom;

        if (intersects && !isFull) {
          partial.push(index);
        }
      });
    }

    setPeekingIndexes((prev) =>
      prev.length === partial.length && prev.every((value, i) => value === partial[i])
        ? prev
        : partial,
    );
  }, []);

  useEffect(() => {
    updateControls();
  }, [updateControls, itemsLength]);

  useEffect(() => {
    const element = viewportRef.current;

    if (!element) {
      return;
    }

    element.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);

    return () => {
      element.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [updateControls]);

  const getStep = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    const firstItem = track?.firstElementChild;

    if (!track || !(firstItem instanceof HTMLElement)) {
      return 0;
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;

    return firstItem.offsetWidth + gap;
  }, []);

  const handlePrev = useCallback(() => {
    viewportRef.current?.scrollBy({ left: -getStep(), behavior: 'smooth' });
  }, [getStep]);

  const handleNext = useCallback(() => {
    viewportRef.current?.scrollBy({ left: getStep(), behavior: 'smooth' });
  }, [getStep]);

  const handleWindowPointerMove = useCallback((event: PointerEvent) => {
    const drag = dragRef.current;
    const element = viewportRef.current;

    if (!drag.active || !element) {
      return;
    }

    const delta = event.clientX - drag.startX;

    if (Math.abs(delta) > 3) {
      drag.moved = true;
    }

    element.scrollTo({ left: drag.startScroll - delta, behavior: 'instant' });
  }, []);

  const handleWindowPointerUp = useCallback(() => {
    const drag = dragRef.current;
    const element = viewportRef.current;

    if (!drag.active || !element) {
      return;
    }

    drag.active = false;
    setIsDragging(false);
    element.style.scrollSnapType = '';

    if (!drag.moved) {
      return;
    }

    suppressClickRef.current = true;

    const step = getStep();

    if (step <= 0) {
      return;
    }

    const max = element.scrollWidth - element.clientWidth;
    const target = Math.min(Math.max(Math.round(element.scrollLeft / step) * step, 0), max);

    element.scrollTo({ left: target, behavior: 'smooth' });
  }, [getStep]);

  useEffect(() => {
    const onMove = handleWindowPointerMove;
    const onUp = handleWindowPointerUp;

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [handleWindowPointerMove, handleWindowPointerUp]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || event.button !== 0) {
      return;
    }

    const element = viewportRef.current;

    if (!element) {
      return;
    }

    suppressClickRef.current = false;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: element.scrollLeft,
      moved: false,
    };
    element.style.scrollSnapType = 'none';
    setIsDragging(true);
  }, []);

  const handleClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return {
    viewportRef,
    canGoPrev,
    canGoNext,
    peekingIndexes,
    isDragging,
    handlePrev,
    handleNext,
    handlePointerDown,
    handleClickCapture,
  };
}
