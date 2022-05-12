import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  Input,
  FormLabel,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useCart } from 'react-use-cart';
import { LayoutDashboard } from '../../../components';
import { cancelOrder } from '../orders.mutation';
import { fetchOrderDetails } from '../orders.queries';
import { Item, Order, OrderStatus } from '../orders.types';
import { OrderStatusBadge } from './order-status-badge';

export function OrderDetailsUser() {
  const params = useParams();
  const toast = useToast();
  const [order, setOrder] = useState<Order | any>();
  const [file, setFile] = useState<undefined | any>();
  const { addItem } = useCart();
  useEffect(() => {
    async function getOrderDetails() {
      const res = await fetchOrderDetails(params.id as string);
      if (res) {
        setOrder(res);
      }
    }
    getOrderDetails();
  }, [params]);

  return (
    <LayoutDashboard>
      <Flex marginTop={'8rem'} className="p-10 bg-white shadow">
        <img src={order?.img} className="w-[25rem] mr-10"></img>

        <Box mt="4">
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Tên sản phẩm:{' '}
            </Box>
            <Box fontWeight="bold" className="text-xl">
              {order?.title}
            </Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Chi tiết sản phẩm:{' '}
            </Box>
            <Box>{order?.description}</Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Loại hàng:{' '}
            </Box>
            <Box>{order?.classify}</Box>
          </Flex>

          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Giá sản phẩm:{' '}
            </Box>
            <Box className="text-lg">{Number(order?.price).toLocaleString('ms')} VNĐ</Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Chất lượng:{' '}
            </Box>
            <Box>
              <OrderStatusBadge status={order?.status} />
            </Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Số lượng còn:{' '}
            </Box>
            <Box>{order?.quantity}</Box>
          </Flex>
          <Flex className="mt-[3rem]">
            <ButtonGroup
              size="lg"
              background={'#c75067'}
              isAttached
              variant="outline"
              marginTop={'-2'}
              color="white"
              onClick={() => addItem(order)}
              className="hover:text-black"
            >
              <Button borderRadius={'0'}>
                Thêm vào giỏ hàng
                <AddShoppingCartIcon className="ml-2 "></AddShoppingCartIcon>
              </Button>
            </ButtonGroup>
            <ButtonGroup
              size="lg"
              className="hover:text-black"
              background={'red.500'}
              isAttached
              variant="outline"
              marginTop={'-2'}
              color="white"
              marginLeft={'6rem'}
            >
              <Button borderRadius={'0'}>Mua Ngay</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </Flex>
      <Box className="shadow mt-4 h-[auto] bg-white p-5">
        <Box className="text-[1.3rem] font-semibold">Đánh Giá Sản Phẩm</Box>
        <Flex>
          <Button className="m-3">1 Sao</Button>
          <Button className="m-3">2 Sao</Button>
          <Button className="m-3">3 Sao</Button>
          <Button className="m-3">4 Sao</Button>
          <Button className="m-3">5 Sao</Button>
        </Flex>
        <Input placeholder="Viết bình luận" size="lg" className="mt-3" />
      </Box>
    </LayoutDashboard>
  );
}
