// import { StarIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { OrderStatus } from '../products.types';
import StarIcon from '@mui/icons-material/Star';
type OrderStatusBadgeProps = {
  status?: OrderStatus | Element[];
};
export function OrderStatusBadge({ status }: OrderStatusBadgeProps): any {
  const statusColorScheme = useMemo(() => {
    if (!status) return '';

    switch (status) {
      case OrderStatus.ONE_STAR:
        return 1;
      case OrderStatus.TWO_STAR:
        return 2;
      case OrderStatus.THREE_STAR:
        return 3;
      case OrderStatus.FOUR_STAR:
        return 4;
      case OrderStatus.FIVE_STAR:
        return 5;
      case OrderStatus.NO_RATE:
      default:
        return undefined;
    }
  }, [status]);

  return Array(statusColorScheme)
    .fill('')
    .map((_, i) => <StarIcon className="text-red-600" key={i}></StarIcon>);
}
