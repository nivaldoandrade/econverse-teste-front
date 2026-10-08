import styles from './hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.background}
        src="/images/hero-banner.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <button type="button" className={styles.cta}>
          Ver produto
        </button>
      </div>
    </section>
  );
}
