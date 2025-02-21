'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { REGISTER_MUTATION } from '@/graphql/mutations/register-mutations';
import { useMutation } from '@apollo/client';

export const NotLoggedInScreen = () => {
  const [register] = useMutation(REGISTER_MUTATION);

  const { setUser } = useUser();

  const handleRegister = async () => {
    try {
      const response = await register();
      const token = response.data.register.token;

      // Store token in localStorage
      localStorage.setItem('visitorToken', token);
      setUser({ isLoading: false, data: token });
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <Card className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Not logged in</CardTitle>
        <CardDescription>Please login to continue</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button onClick={handleRegister}>Log in</Button>
      </CardFooter>
    </Card>
  );
};
