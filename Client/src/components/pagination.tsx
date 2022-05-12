import { Box, Button, Flex, VisuallyHidden } from '@chakra-ui/react';
import { useMemo } from 'react';
import { PaginationInfo } from '../modules/shared/common.types';

type PaginationProps = PaginationInfo & {
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ onPrev, onNext, page, pageCount }: PaginationProps) {
  const shouldShowPrevious = useMemo(() => pageCount > 1 && page > 1, [pageCount, page]);
  const shouldShowNext = useMemo(() => pageCount > 1 && page < pageCount, [pageCount, page]);

  return (
    <Flex>
      <Box w="10">
        {shouldShowPrevious && (
          <Button onClick={onPrev} background={'white'}>
            {'<'}
            <VisuallyHidden>Previous page</VisuallyHidden>
          </Button>
        )}
      </Box>
      <Flex w="10" justifyContent="center" alignItems="center" fontWeight="bold">
        {page}
      </Flex>
      <Box w="10">
        {shouldShowNext && (
          <Button onClick={onNext} background={'white'}>
            <VisuallyHidden>Next page</VisuallyHidden>
            {'>'}
          </Button>
        )}
      </Box>
    </Flex>
  );
}
