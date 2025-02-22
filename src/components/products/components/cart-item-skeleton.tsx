import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CartItemSkeleton() {
  return (
    <Card className={'flex flex-col flex-1 justify-between h-[154px]'}>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-8" />
      </CardHeader>

      <CardFooter className="flex justify-between pb-6 ">
        <Skeleton className="h-9 w-[131px]" />
        <Skeleton className="h-9 w-[62px]" />
      </CardFooter>
    </Card>
  );
}
