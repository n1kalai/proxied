import AuthenticatePage from '@/components/authenticate-page';
import { Products } from '@/components/products';

export default async function Home() {
  return (
    <div className="flex items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AuthenticatePage>
        <Products />
      </AuthenticatePage>
    </div>
  );
}
