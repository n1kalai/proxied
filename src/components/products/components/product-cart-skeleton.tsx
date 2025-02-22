import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className={'flex flex-col flex-1 justify-between h-[150px]'}>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-10" />
      </CardHeader>

      <CardFooter className="flex justify-end pb-9">
        <Skeleton className="h-8 w-[62px]" />
      </CardFooter>
    </Card>
  );
}
