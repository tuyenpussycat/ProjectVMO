import { Box, Button, Flex, Input, ButtonGroup, Avatar, Select } from '@chakra-ui/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useCart } from 'react-use-cart';
import { AuthContext } from '../../../contexts/auth';
import { LayoutDashboard } from '../../../components';
import { fetchOrderDetails } from '../products.queries';
import { Order } from '../products.types';
import { HookUsage } from '../../payments/component/input-payment';
import { OrderStatusBadge } from './product-status-badge';
import { commentOder, editOrder } from '../products.mutation';

export function OrderDetailsUser() {
  const { getNumber } = useContext(AuthContext);
  const params = useParams();
  const [order, setOrder] = useState<Order | any>();
  const { addItem } = useCart();
  const [checkCmt, setCheckCmt] = useState(false);
  const [valueVote, setValueVote] = useState('NO_RATE');
  const [valueCmt, setValueCmt] = useState('');
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getOrderDetails() {
      const res = await fetchOrderDetails(params.id as string);
      if (res) {
        setOrder(res);
      }
    }
    getOrderDetails();
  }, [load]);

  const handleCmtOrder = useCallback(
    async (event: FormEvent<HTMLButtonElement>) => {
      try {
        event.preventDefault();

        const comments = {
          text: valueCmt,
          vote: valueVote,
        };
        const res = await commentOder(params.id as string, comments);
        if (res) {
          setLoad(!load);
          setValueCmt('');
          console.log(res);
        } else {
        }
      } catch (error) {}
    },
    [valueVote, valueCmt],
  );

  return (
    <LayoutDashboard>
      <Flex marginTop={'7rem'} className="p-10 bg-white shadow">
        <img src={order?.img} className="w-[25rem] mr-10"></img>

        <Box mt="4">
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              T??n s???n ph???m:{' '}
            </Box>
            <Box fontWeight="bold" className="text-xl">
              {order?.title}
            </Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Chi ti???t s???n ph???m:{' '}
            </Box>
            <Box>{order?.description}</Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Lo???i h??ng:{' '}
            </Box>
            <Box>{order?.classify}</Box>
          </Flex>

          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Gi?? s???n ph???m:{' '}
            </Box>
            <Box className="text-lg">{Number(order?.price).toLocaleString('ms')} VN??</Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              Ch???t l?????ng:{' '}
            </Box>
            <Box>
              <OrderStatusBadge status={order?.status} />
            </Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              S??? l?????ng c??n:{' '}
            </Box>
            <Box>{order?.quantity}</Box>
          </Flex>
          <Flex className="mt-[1rem]">
            <Box mr="4" fontWeight="medium" minW="32">
              S??? l?????ng:{' '}
            </Box>
            <Box>
              <HookUsage maxQuantity={order?.quantity}></HookUsage>
            </Box>
          </Flex>
          <Flex className="mt-[3rem]">
            <ButtonGroup
              size="lg"
              background={'#c75067'}
              isAttached
              variant="outline"
              marginTop={'-2'}
              color="white"
              onClick={() => addItem(order, Number(getNumber))}
              className="hover:text-black"
            >
              <Button borderRadius={'0'}>
                Th??m v??o gi??? h??ng
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
        <Box className="text-[1.3rem] font-semibold mb-4">????nh Gi?? S???n Ph???m</Box>
        {checkCmt === true ? (
          <Box>
            <Button marginBottom={'1rem'} onClick={() => setCheckCmt(false)} colorScheme="red">
              ????ng
            </Button>

            <Flex>
              <Box>Ch???n ????nh gi?? c???a b???n </Box>
              <Select
                marginTop={'-2'}
                marginLeft={'10'}
                width={'10%'}
                placeholder="????nh gi??"
                onChange={(e) => setValueVote(e.target.value)}
              >
                <option value="ONE_STAR">1 Sao</option>
                <option value="TWO_STAR">2 Sao</option>
                <option value="THREE_STAR">3 Sao</option>
                <option value="FOUR_STAR">4 Sao</option>
                <option value="FIVE_STAR">5 Sao</option>
              </Select>
            </Flex>
            <Input
              onChange={(e) => {
                setValueCmt(e.target.value);
              }}
              value={valueCmt}
              placeholder="Vi???t b??nh lu???n"
              size="lg"
              className="mt-3"
            />

            <Button
              onClick={handleCmtOrder}
              colorScheme={'blue'}
              marginTop={'1rem'}
              marginLeft="85%"
            >
              G???i ????nh gi??
            </Button>
          </Box>
        ) : (
          <Button onClick={() => setCheckCmt(true)} colorScheme={'blue'}>
            G???i ????nh gi?? c???a b???n
          </Button>
        )}

        <Box>
          {order?.comments.map((i: any) => (
            <Box key={i._id} paddingY={'2rem'} className="border-b-2">
              <Flex>
                <Avatar
                  size="sm"
                  background={'orange.200'}
                  name="Kh??ch h??ng"
                  src="https://bit.ly/broken-link"
                />
                <Box>
                  <Box marginTop={'-0.6rem'} marginLeft={'0.5rem'}>
                    (Kh??ch)
                  </Box>
                  <Box marginLeft={'0.5rem'}>
                    <OrderStatusBadge status={i?.vote} />
                  </Box>
                </Box>
              </Flex>

              <Box marginTop={'0.5rem'} marginLeft={'2.6rem'}>
                {i.text}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutDashboard>
  );
}
