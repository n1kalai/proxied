'use client';

import Link from 'next/link';

import { useUser } from '@/hooks/use-user';

import { useQuery } from '@apollo/client';
import { CartResponseType } from '@/types/cart/cart-type';
import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/icons/cart-svg';
import { Badge } from '@/components/badge';

export const CartBtn = () => {
  const { user } = useUser();
  const { data } = useQuery<CartResponseType>(GET_CART_QUERY);

  return (
    user.data && (
      <div className="relative">
        <Button variant="outline" size="icon" asChild>
          <Link href="/cart">
            <CartIcon />
          </Link>
        </Button>

        {Boolean(data?.getCart?.items?.length) && (
          <Badge content={data?.getCart.items.length || 0} />
        )}
      </div>
    )
  );
};
