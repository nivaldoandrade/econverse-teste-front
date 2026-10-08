import styles from './supportBanners.module.scss';

export function SupportBanners() {
  return (
    <section className={styles.section} aria-label="Conteúdo de apoio">
      <div className={styles.grid}>
        {[1, 2].map((index) => (
          <article className={styles.banner} key={index}>
            <img className={styles.photo} src="/images/banner-partners.webp" alt="" />
            <div className={styles.gradient} aria-hidden="true" />
            <div className={styles.content}>
              <p className={styles.kicker}>Parceiros</p>
              <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur</p>
              <button type="button" className={styles.cta}>
                Confira
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
