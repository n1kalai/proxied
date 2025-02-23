import { act, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PRODUCTS_QUERY } from '@/graphql/queries/get-products-query';
import { GET_CART_QUERY } from '@/graphql/queries/get-cart-query';
import { Products } from '@/components/products';
import Page from '@/app/page';

import { REGISTER_MUTATION } from '@/graphql/mutations/register-mutations';

const token =
  '6240a53c30f22f22f04058459775e585e95529011ce73779133a0537cea2658fb697ce1cc4f8ce8a85588d08575dc52218f2d8f2fc4699f2410edc85f533a645';

jest.mock('@/hooks/use-user', () => {
  return {
    useUser: () => {
      return {
        user: {
          isLoading: false,
          data: null,
        },
        setUser: jest.fn(),
      };
    },
  };
});

const mocks = [
  {
    request: { query: GET_PRODUCTS_QUERY },
    result: {},
  },
  {
    request: { query: GET_CART_QUERY },
    result: {},
  },
];

const mutationMocks = [
  {
    request: {
      query: REGISTER_MUTATION,
      variables: {},
    },
    result: {
      data: {
        register: {
          token,
        },
      }, // Mock mutation response
    },
  },
];

describe('Products Component', () => {
  it('renders login screen if not authorized', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mutationMocks} addTypename={false}>
          <Page />
        </MockedProvider>,
      );
    });
    expect(screen.getByTestId('not-logged-in')).toBeInTheDocument();
  });

  it('should render login button', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mutationMocks} addTypename={false}>
          <Page />
        </MockedProvider>,
      );
    });

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders skeleton if authorized and loading data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Products />
      </MockedProvider>,
    );
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});
