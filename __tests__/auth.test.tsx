import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@/app/page';
import { REGISTER_MUTATION } from '@/graphql/mutations/register-mutations';
import { GET_PRODUCTS_QUERY } from '@/graphql/queries/get-products-query';
import { UserContext } from '@/context/user-context';
import { useState } from 'react';
import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';

const token =
  '6240a53c30f22f22f04058459775e585e95529011ce73779133a0537cea2658fb697ce1cc4f8ce8a85588d08575dc52218f2d8f2fc4699f2410edc85f533a645';

type UserType = {
  isLoading: boolean;
  data: string | null;
};

const registerMock = {
  request: {
    query: REGISTER_MUTATION,
  },
  result: {
    data: {
      register: {
        _id: '1',
        cartId: 1,
        token,
      },
    },
  },
};

const productsMock = {
  request: {
    query: GET_PRODUCTS_QUERY,
  },
  result: {
    data: {
      getProducts: {
        products: [
          {
            _id: '1',
            title: 'Product 1',
            cost: 100,
            availableQuantity: 10,
            __typename: 'Product',
          },
          {
            _id: '2',
            title: 'Product 2',
            cost: 200,
            availableQuantity: 5,
            __typename: 'Product',
          },
        ],
        total: 2,
        __typename: 'GetProducts',
      },
    },
  },
};

const cartMock = {
  request: {
    query: GET_CART_QUERY,
  },
  result: {
    data: {
      getCart: {
        _id: 'cart-1',
        hash: 'hash-1',
        items: [
          {
            _id: 'item-1',
            quantity: 1,
            product: {
              _id: '1',
              title: 'Product 1',
              cost: 100,
              availableQuantity: 10,
              __typename: 'Product',
            },
            __typename: 'CartItem',
          },
        ],
        __typename: 'Cart',
      },
    },
  },
};

describe('Auth', () => {
  it('logs in and populates products', async () => {
    const user = userEvent.setup();

    const MockUserProvider = ({ children }: { children: React.ReactNode }) => {
      const [user, setUser] = useState<UserType>({
        isLoading: false,
        data: null,
      });
      return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
    };

    render(
      <MockedProvider
        mocks={[cartMock, registerMock, productsMock]}
        addTypename={false}
      >
        <MockUserProvider>
          <Home />
        </MockUserProvider>
      </MockedProvider>,
    );

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    user.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('visitorToken')).toBe(token);
    });

    // Wait for products to appear
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });
});
