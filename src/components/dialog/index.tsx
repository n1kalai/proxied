'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Payload } from '@/hooks/use-subscription';
import { Button } from '../ui/button';

interface ConditionalDialogProps {
  data: Payload[];
  onClose: () => void;
}

export function ConditionalDialog({ data, onClose }: ConditionalDialogProps) {
  return (
    <Dialog open={data.length > 0} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Acknowledge</DialogTitle>
          <DialogDescription>
            Some of items are out of stock or decreased quantity.
          </DialogDescription>
        </DialogHeader>
        {data.map((item) => (
          <div key={item._id} className="pb-1 border-b border-stone-700">
            <p>
              Product: <u>{item.product.title}</u>
            </p>
            {item.isOut ? (
              <p className="text-red-600">Is out of stock</p>
            ) : (
              <p>Quantity changed to: {item.quantity}</p>
            )}
          </div>
        ))}

        <DialogFooter>
          <Button onClick={onClose}>Acknowledge</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
