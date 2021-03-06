import { Box, Link, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { LayoutDashboard } from '../../../components';

export function ShoppingCart() {
  const {
    items,
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty)
    return (
      <LayoutDashboard>
        <Flex marginTop={'7rem'} justifyContent={'center'} className="font-semibold text-2xl">
          Giỏ hàng của bạn trống. Hãy sắm thêm đồ cho mình nha! :3
        </Flex>
      </LayoutDashboard>
    );
  const [quantity, setQuantity] = useState(1);
  const handleSetQuantity = (e: any) => {
    setQuantity(e.target.value);
  };
  return (
    <LayoutDashboard>
      <Flex marginTop={'7rem'}>
        <Table variant="simple" size={'lg'}>
          <Thead className="bg-red-500 text-white h-10">
            <Tr>
              <Th></Th>
              <Th color={'white'}>Tên sản phẩm</Th>
              <Th color={'white'}> Giá sản phẩm</Th>
              <Th textAlign="center" color={'white'}>
                Số lượng
              </Th>
              <Th textAlign="center" color={'white'}></Th>
            </Tr>
          </Thead>
          <Tbody className="bg-white h-10">
            {items.map((item) => (
              <Tr>
                <Td width={'20%'}>
                  <Link
                    as={NavLink}
                    _hover={{ textDecoration: 'none' }}
                    to={`/product/${item._id}`}
                  >
                    <img src={item.img}></img>
                  </Link>
                </Td>
                <Td className="font-semibold">
                  <Link
                    as={NavLink}
                    _hover={{ textDecoration: 'none' }}
                    to={`/product/${item._id}`}
                  >
                    {item.title}
                  </Link>
                </Td>
                <Td className="font-bold">{Number(item.price).toLocaleString('ms')}</Td>
                <Td textAlign="center">
                  <Button
                    className="hover:text-black"
                    marginRight={'3'}
                    onClick={() => {
                      updateItemQuantity(item.id, item.quantity - 1);
                      setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </Button>
                  <input
                    className="w-6"
                    type={'text'}
                    value={item.quantity}
                    defaultValue={item.quantity}
                    onChange={(e) => updateItemQuantity(item.id, Number(e.target.value) || 1)}
                    onBlur={(e) => {
                      updateItemQuantity(item.id, Number(e.target.value));
                    }}
                  ></input>
                  <Button
                    marginRight={'3'}
                    onClick={() => {
                      updateItemQuantity(item.id, item.quantity + 1);
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </Td>
                <Td>
                  <Button
                    onClick={() => removeItem(item.id)}
                    backgroundColor={'red.500'}
                    color="white"
                    className="hover:text-black"
                  >
                    Xóa
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Box width={'100%'} height="14rem" className="shadow-sm  bg-white p-8">
        <Box className="flex text-2xl font-semibold" mb={'5'}>
          Giỏ hàng của bạn:
        </Box>
        <Box className="mb-5 font-medium">Tổng sản phẩm : ({totalItems})</Box>
        <Box className=" text-2xl font-semibold">
          Thành tiền : {Number(cartTotal).toLocaleString('ms')} VNĐ
        </Box>
        <Flex justifyContent={'end'}>
          <Button
            className="hover:text-black"
            backgroundColor={'red.500'}
            color="white"
            onClick={emptyCart}
            marginRight="5"
          >
            Xóa hết
          </Button>
          <Link as={NavLink} _hover={{ textDecoration: 'none' }} to={`/payment`}>
            <Button
              backgroundColor={'blue.500'}
              marginRight="5"
              color="white"
              className="hover:text-black"
            >
              Thanh toán
            </Button>
          </Link>
        </Flex>
      </Box>
    </LayoutDashboard>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

function setOrder(res: any) {
  throw new Error('Function not implemented.');
}
