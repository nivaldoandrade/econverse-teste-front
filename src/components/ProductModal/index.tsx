import { useEffect, useState, type MouseEvent } from 'react';

import { ReactPortal } from '@/components/ReactPortal';
import { useAnimatedUnmount } from '@/hooks/useAnimatedUnmount';
import type { ProductProps } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';

import styles from './productModal.module.scss';

interface ProductModalProps {
  product: ProductProps | null;
  isVisible: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  product: ProductProps;
  onClose: () => void;
}

function ModalContent({ product, onClose }: ModalContentProps) {
  const [quantity, setQuantity] = useState(1);

  function handleDecrease() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleIncrease() {
    setQuantity((current) => current + 1);
  }

  return (
    <>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar modal" />

      <div className={styles.imageWrapper}>
        <img src={product.photo} alt={product.productName} width={247} height={192} />
      </div>

      <div className={styles.info}>
        <h2 id="product-modal-title" className={styles.title}>
          {product.productName}
        </h2>

        <p className={styles.price}>{formatPrice(product.price)}</p>

        <p className={styles.description}>{product.descriptionShort}</p>

        <a href="#" className={styles.detailsLink}>
          Veja mais detalhes do produto &gt;
        </a>

        <div className={styles.actions}>
          <div className={styles.stepper}>
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span aria-live="polite">{String(quantity).padStart(2, '0')}</span>
            <button type="button" onClick={handleIncrease} aria-label="Aumentar quantidade">
              +
            </button>
          </div>

          <button type="button" className={styles.buyButton}>
            Comprar
          </button>
        </div>
      </div>
    </>
  );
}

export function ProductModal({ product, isVisible, onClose }: ProductModalProps) {
  const { shouldRender, animationRef } = useAnimatedUnmount(isVisible);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  if (!shouldRender || !product) {
    return null;
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <ReactPortal>
      <div
        className={isVisible ? styles.overlay : styles.overlayClosing}
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          ref={animationRef}
        >
          <ModalContent product={product} onClose={onClose} />
        </div>
      </div>
    </ReactPortal>
  );
}
