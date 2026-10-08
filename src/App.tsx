import { Brands } from '@/components/Brands';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Newsletter } from '@/components/Newsletter';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductModal } from '@/components/ProductModal';
import { SupportBanners } from '@/components/SupportBanners';
import { useModal } from '@/hooks/useModal';
import { useProducts } from '@/hooks/useProducts';
import type { ProductProps } from '@/types/product';

import styles from './App.module.scss';

export default function App() {
  const { products, isFirstLoading, isEmpty, error } = useProducts();
  const {
    isVisible: isModalVisible,
    data: selectedProduct,
    handleOpenModal,
    handleCloseModal,
  } = useModal<ProductProps>();

  const hasProducts = !isFirstLoading && !error && products.length > 0;

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <Hero />
        <CategoryGrid />

        {isFirstLoading && (
          <p className={styles.feedback} role="status">
            Carregando produtos...
          </p>
        )}

        {error && (
          <p className={styles.feedbackError} role="alert">
            Não foi possível carregar os produtos. Tente novamente mais tarde.
          </p>
        )}

        {isEmpty && <p className={styles.feedback}>Nenhum produto encontrado.</p>}

        {hasProducts && (
          <>
            <ProductCarousel
              title="Produtos relacionados"
              products={products}
              showTabs
              onOpenProduct={handleOpenModal}
            />
            <SupportBanners />
            <ProductCarousel
              title="Produtos relacionados"
              products={products}
              onOpenProduct={handleOpenModal}
            />
            <SupportBanners />
            <Brands />
            <ProductCarousel
              title="Produtos relacionados"
              products={products}
              onOpenProduct={handleOpenModal}
            />
          </>
        )}
      </main>

      <Newsletter />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
}
