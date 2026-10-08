import { useId } from 'react';

import styles from './brands.module.scss';

const brands = [
  { name: 'Marca 1', logo: '/images/brand-logo.svg' },
  { name: 'Marca 2', logo: '/images/brand-logo.svg' },
  { name: 'Marca 3', logo: '/images/brand-logo.svg' },
  { name: 'Marca 4', logo: '/images/brand-logo.svg' },
  { name: 'Marca 5', logo: '/images/brand-logo.svg' },
];

export function Brands() {
  const headingId = useId();

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        Navegue por marcas
      </h2>

      <ul className={styles.list}>
        {brands.map((brand) => (
          <li key={brand.name}>
            <a href="#" className={styles.brand} aria-label={brand.name}>
              <img src={brand.logo} alt="" width={117} height={35} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
