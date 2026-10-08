import { useId } from 'react';

import styles from './newsletter.module.scss';

export function Newsletter() {
  const headingId = useId();

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 id={headingId} className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.description}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <div className={styles.row}>
            <label className="sr-only" htmlFor="newsletter-name">
              Nome
            </label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
            />

            <label className="sr-only" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
            />

            <button type="submit" className={styles.submit}>
              Inscrever
            </button>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" name="terms" />
            <span>Aceito os termos e condições</span>
          </label>
        </form>
      </div>
    </section>
  );
}
