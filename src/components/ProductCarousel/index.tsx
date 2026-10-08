import { useId, useState } from 'react';

import { ProductCard } from '@/components/ProductCard';
import type { ProductProps } from '@/types/product';

import { CarouselArrow } from './components/CarouselArrow';
import styles from './productCarousel.module.scss';
import { useCarousel } from './useCarousel';

interface ProductCarouselProps {
  title: string;
  products: ProductProps[];
  showTabs?: boolean;
  onOpenProduct: (product: ProductProps) => void;
}

const tabs = ['celular', 'acessórios', 'tablets', 'notebooks', 'tvs', 'ver todos'];

export function ProductCarousel({
  title,
  products,
  showTabs = false,
  onOpenProduct,
}: ProductCarouselProps) {
  const headingId = useId();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const {
    viewportRef,
    canGoPrev,
    canGoNext,
    peekingIndexes,
    isDragging,
    handlePrev,
    handleNext,
    handlePointerDown,
    handleClickCapture,
  } = useCarousel(products.length);

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.heading}>
        <span className={styles.line} aria-hidden="true" />
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <span className={styles.line} aria-hidden="true" />
      </div>

      {showTabs ? (
        <div className={styles.tabs} role="tablist" aria-label="Filtrar por categoria">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      ) : (
        <a href="#" className={styles.seeAll}>
          Ver todos
        </a>
      )}

      <div className={showTabs ? styles.carouselTabs : styles.carouselSeeAll}>
        <CarouselArrow direction="prev" disabled={!canGoPrev} onClick={handlePrev} />

        <div
          className={isDragging ? `${styles.viewport} ${styles.dragging}` : styles.viewport}
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onClickCapture={handleClickCapture}
        >
          <ul className={styles.track}>
            {products.map((product, index) => (
              <li key={product.productName} className={styles.item}>
                <ProductCard
                  product={product}
                  onOpenProduct={onOpenProduct}
                  hideShadow={peekingIndexes.includes(index)}
                />
              </li>
            ))}
          </ul>
        </div>

        <CarouselArrow direction="next" disabled={!canGoNext} onClick={handleNext} />
      </div>
    </section>
  );
}
