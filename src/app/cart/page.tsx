'use client';

import AuthenticatePage from '@/components/authenticate-page';
import { Cart } from '@/components/cart';
import { Wrapper } from '@/components/wrapper';

export default function Page() {
  return (
    <Wrapper className="flex-col gap-2 xl:gap-4">
      <AuthenticatePage>
        <h2 className="font-bold text-xl">My cart items</h2>
        <Cart />
      </AuthenticatePage>
    </Wrapper>
  );
}
