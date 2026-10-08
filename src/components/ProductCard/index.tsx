import type { ProductProps } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';

import styles from './productCard.module.scss';

interface ProductCardProps {
  product: ProductProps;
  onOpenProduct: (product: ProductProps) => void;
  hideShadow?: boolean;
}

export function ProductCard({ product, onOpenProduct, hideShadow = false }: ProductCardProps) {
  function handleOpenProduct() {
    onOpenProduct(product);
  }

  return (
    <article className={styles.card} style={hideShadow ? { boxShadow: 'none' } : undefined}>
      <button type="button" className={styles.details} onClick={handleOpenProduct}>
        <span className="sr-only">Ver detalhes de {product.productName}.</span>
        <span className={styles.imageWrapper}>
          <img
            src={product.photo}
            alt={product.productName}
            width={270}
            height={240}
            loading="lazy"
            draggable={false}
          />
        </span>

        <span className={styles.description}>{product.descriptionShort}</span>

        <span className={styles.prices}>
          <span className={styles.oldPrice}>{formatPrice(getOldPrice(product.price))}</span>
          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
        </span>

        <span className={styles.installments}>{getInstallments(product.price)}</span>

        <span className={styles.shipping}>Frete grátis</span>
      </button>

      <button type="button" className={styles.buyButton} onClick={handleOpenProduct}>
        Comprar
      </button>
    </article>
  );
}

function getOldPrice(cents: number): number {
  return Math.round(cents * 1.1);
}

function getInstallments(cents: number, quantity = 2): string {
  const value = formatPrice(Math.round(cents / quantity));

  return `ou ${quantity}x de ${value} sem juros`;
}
