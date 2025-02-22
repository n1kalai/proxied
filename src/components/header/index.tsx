import Link from 'next/link';
import { CartBtn } from './components/cart-btn';

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-2 xl:px-4 py-2 xl:py-4 border border-b-stone-100 h-16">
      <Link href="/">
        <h1 className="hover:underline">Proxied</h1>
      </Link>

      <CartBtn />
    </header>
  );
};
