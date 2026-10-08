import styles from './footer.module.scss';

interface FooterColumn {
  title: string;
  links: string[];
}

const columns: FooterColumn[] = [
  {
    title: 'Institucional',
    links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'],
  },
  {
    title: 'Ajuda',
    links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
  },
  {
    title: 'Termos',
    links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
  },
];

const socials = [
  { name: 'Instagram', icon: '/images/social-instagram.svg' },
  { name: 'Facebook', icon: '/images/social-facebook.svg' },
  { name: 'LinkedIn', icon: '/images/social-linkedin.svg' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <img
            className={styles.logo}
            src="/images/logo-footer.svg"
            alt="Econverse"
            width={164}
            height={48}
          />
          <p className={styles.aboutText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.name}>
                <a href="#" aria-label={social.name}>
                  <img src={social.icon} alt="" width={24} height={24} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.columns}>
          {columns.map((column) => (
            <nav key={column.title} className={styles.column} aria-label={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
