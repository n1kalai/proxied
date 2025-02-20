'use client';

import AuthenticatePage from '@/components/authenticate-page';
import { Cart } from '@/components/cart';

export default function Page() {
  return (
    <AuthenticatePage>
      <Cart />
    </AuthenticatePage>
  );
}
