import { Wrapper } from '@/components/wrapper';
import { Cart } from '@/components/cart';
import AuthenticatePage from '@/components/authenticate-page';

export default function Page() {
  return (
    <Wrapper className="flex-col gap-2 xl:gap-4">
      <AuthenticatePage>
        <Cart />
      </AuthenticatePage>
    </Wrapper>
  );
}
