import AuthenticatePage from '@/components/authenticate-page';
import { Products } from '@/components/products';
import { Wrapper } from '@/components/wrapper';

export default async function Home() {
  return (
    <Wrapper>
      <AuthenticatePage>
        <Products />
      </AuthenticatePage>
    </Wrapper>
  );
}
