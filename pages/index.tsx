import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import AboutPage from './about';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <p>lol</p>
        <ul>
          <li>
            <Link href={'/portfolio'}>PortfolioPage</Link>
          </li>
          <li>
            <Link href={'/clients'}>CLients</Link>
          </li>
          <li>
            <Link href={'/portfolio'}>PortfolioPage</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
