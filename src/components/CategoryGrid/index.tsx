import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';

import BebidasIcon from '@/assets/icons/cat-bebidas.svg?react';
import EsportesIcon from '@/assets/icons/cat-esportes.svg?react';
import FerramentasIcon from '@/assets/icons/cat-ferramentas.svg?react';
import ModaIcon from '@/assets/icons/cat-moda.svg?react';
import SaudeIcon from '@/assets/icons/cat-saude.svg?react';
import SupermercadoIcon from '@/assets/icons/cat-supermercado.svg?react';
import TecnologiaIcon from '@/assets/icons/cat-tecnologia.svg?react';

import styles from './categoryGrid.module.scss';

interface CategoryProps {
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const categories: CategoryProps[] = [
  { name: 'Tecnologia', Icon: TecnologiaIcon },
  { name: 'Supermercado', Icon: SupermercadoIcon },
  { name: 'Bebidas', Icon: BebidasIcon },
  { name: 'Ferramentas', Icon: FerramentasIcon },
  { name: 'Saúde', Icon: SaudeIcon },
  { name: 'Esportes e Fitness', Icon: EsportesIcon },
  { name: 'Moda', Icon: ModaIcon },
];

export function CategoryGrid() {
  const [activeCategory, setActiveCategory] = useState('Tecnologia');

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <h2 id="categories-title" className="sr-only">
        Compre por categoria
      </h2>

      <ul className={styles.list}>
        {categories.map((category) => {
          const isActive = category.name === activeCategory;
          const { Icon } = category;

          return (
            <li key={category.name}>
              <button
                type="button"
                className={isActive ? styles.itemActive : styles.item}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.name)}
              >
                <span className={styles.iconWrapper}>
                  <Icon className={styles.icon} aria-hidden="true" />
                </span>
                <span className={styles.label}>{category.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
