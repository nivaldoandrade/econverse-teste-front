import styles from './carouselArrow.module.scss';

interface CarouselArrowProps {
  direction: 'prev' | 'next';
  disabled?: boolean;
  onClick: () => void;
}

const arrowPaths = {
  prev: 'M22.1334 10.7442L21.0009 9.59998L14.6667 16L21.0009 22.4L22.1334 21.2557L16.9317 16L22.1334 10.7442Z',
  next: 'M17.8667 21.2558L18.9992 22.4L25.3334 16L18.9992 9.60002L17.8667 10.7443L23.0684 16L17.8667 21.2558Z',
};

export function CarouselArrow({ direction, disabled = false, onClick }: CarouselArrowProps) {
  return (
    <button
      type="button"
      className={styles.arrow}
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Produtos anteriores' : 'Próximos produtos'}
    >
      <svg
        width={32}
        height={32}
        viewBox="4 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="16" r="16" fill="white" />
        <path d={arrowPaths[direction]} fill="#3F3F40" />
      </svg>
    </button>
  );
}
