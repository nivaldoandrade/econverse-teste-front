import { useState } from 'react';

import CrownIcon from '@/assets/icons/icon-crown.svg?react';

import styles from './header.module.scss';

interface BenefitProps {
  icon: string;
  before?: string;
  highlight: string;
  after?: string;
}

const benefits: BenefitProps[] = [
  {
    icon: '/images/icon-shield.svg',
    before: 'Compra ',
    highlight: '100% segura',
  },
  {
    icon: '/images/icon-truck.svg',
    highlight: 'Frete grátis',
    after: ' acima de R$ 200',
  },
  {
    icon: '/images/icon-credit-card.svg',
    highlight: 'Parcele',
    after: ' suas compras',
  },
];

const categories = [
  'Todas Categorias',
  'Supermercado',
  'Livros',
  'Moda',
  'Lançamentos',
  'Ofertas do dia',
  'Assinatura',
];

export function Header() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.benefitsBar}>
          <ul className={styles.benefits}>
            {benefits.map((benefit) => (
              <li key={benefit.highlight} className={styles.benefit}>
                <img src={benefit.icon} alt="" width={20} height={20} />
                <span>
                  {benefit.before}
                  <strong>{benefit.highlight}</strong>
                  {benefit.after}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mainBar}>
          <a href="/" className={styles.logo} aria-label="Econverse - ir para a home">
            <img src="/images/logo.svg" alt="Econverse" width={139} height={41} />
          </a>

          <form
            className={styles.search}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              name="q"
              placeholder="O que você está buscando?"
              aria-label="Buscar produtos"
            />
            <button type="submit" aria-label="Buscar">
              <img src="/images/icon-search.svg" alt="" width={28} height={28} />
            </button>
          </form>

          <div className={styles.actions}>
            <button type="button" aria-label="Meus pedidos">
              <img src="/images/icon-orders.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" aria-label="Favoritos">
              <img src="/images/icon-heart.svg" alt="" width={32} height={32} />
            </button>
            <button type="button" aria-label="Minha conta">
              <img src="/images/icon-user.svg" alt="" width={32} height={32} />
            </button>
            <button type="button" aria-label="Carrinho de compras">
              <img src="/images/icon-cart.svg" alt="" width={32} height={32} />
            </button>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {categories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <li key={category}>
                  <a
                    href="#"
                    className={isActive ? styles.navLinkActive : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSelectCategory(category);
                    }}
                  >
                    {category === 'Assinatura' && (
                      <CrownIcon width={20} height={20} aria-hidden="true" />
                    )}
                    <span>{category}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
