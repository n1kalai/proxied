import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Card
      className={'flex flex-col flex-1 justify-between h-[150px] ' + className}
    >
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardFooter className="flex justify-end">
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  );
}
