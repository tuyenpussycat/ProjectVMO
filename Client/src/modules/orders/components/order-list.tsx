import { Box, Button, ButtonGroup, Flex, Heading, Image, Img, Link } from '@chakra-ui/react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListResponse } from '../../shared/common.types';
import { LayoutDashboard, Pagination } from '../../../components';
import { fetchOrders } from '../orders.queries';
import { Order } from '../orders.types';
import { OrderStatusBadge } from './order-status-badge';
import { AuthContext } from '../../../contexts/auth';
import { useCart } from 'react-use-cart';
import { fetchCategory } from '../category.queries';
import { Category } from '../category.types';

export function OrderList() {
  const [page, setPage] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [limitPage, setLimitPage] = useState(1);
  // const [orders, setOrders] = useState<ListResponse<Order> | undefined | any>();
  const [list, setList] = useState<ListResponse<Order> | undefined | any>();
  const [listCategory, setListCategory] = useState<ListResponse<Category> | undefined | any>();
  const clickPrev = useCallback(() => setPage((p) => p - 1), []);
  const clickNext = useCallback(() => setPage((p) => p + 1), []);
  const { valueSearch } = useContext(AuthContext);
  useEffect(() => {
    async function getOrders() {
      const data = await fetchOrders({ page });
      if (data) {
        localStorage.setItem('list', JSON.stringify(data.posts));
        setList(data.posts);
        setCurrPage(data.page);
        setLimitPage(data.pageLimit);
      }
    }
    getOrders();
  }, [page]);
  useEffect(() => {
    async function getCategory() {
      const data = await fetchCategory();
      if (data) {
        setListCategory(data);
      }
    }
    getCategory();
  }, [page]);

  return (
    <LayoutDashboard>
      <Box marginTop={'20'}>
        <Image
          className="w-[100%] h-[235px]  object-cover rounded-md"
          src="https://quangcaotructuyen24h.vn/wp-content/uploads/2019/12/banner-hammer-xom-an-vat-quan-7-1.gif"
        ></Image>
        <Box mt="4">
          <Box>
            <Box>
              <Box
                padding={'1rem'}
                width={'100%'}
                height="auto"
                fontWeight={'semibold'}
                background={'white'}
              >
                DANH MỤC
              </Box>
              <Flex
                width={'100%'}
                height="auto"
                background={'white'}
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                {listCategory?.map((o: Category) => (
                  <CategoryMap key={o._id} category={o} />
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box mt="4">
          <Box>
            <Box
              marginBottom={'1'}
              padding={'1rem'}
              width={'100%'}
              height="auto"
              background={'white'}
              fontWeight={'semibold'}
            >
              GỢI Ý
            </Box>
            <Box>
              <Flex flexWrap="wrap" justifyContent="start" gap="0.5rem" cursor={'pointer'}>
                {list?.map((o: Order) => (
                  <OrderListRow key={o._id} posts={o} />
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
        <Flex mt="4" justifyContent="center">
          <Pagination
            onPrev={clickPrev}
            onNext={clickNext}
            limit={1}
            page={currPage}
            pageCount={limitPage}
            totalCount={1}
          />
        </Flex>
      </Box>
    </LayoutDashboard>
  );
}

type OrderListRowProps = {
  posts: Order;
};
type OrderListCategoryProps = {
  category: Category;
};
export function CategoryMap({ category }: OrderListCategoryProps) {
  return (
    <Flex>
      <Link as={NavLink} to={`/posts/${category.name}`}>
        <Box
          p={3}
          borderWidth="1px"
          width="9.25rem"
          height="9rem"
          className="bg-white hover:border-red-500 hover:translate-y-[-3px]"
        >
          <Box paddingTop={'3'}>
            <Img
              width="100px"
              height="70px"
              borderRadius={'10'}
              className="mx-[auto]"
              src={category.img}
            ></Img>
          </Box>

          <Flex justifyContent={'center'} fontSize="md">
            <Box
              height="2.5rem"
              textAlign={'center'}
              textColor="blue.800"
              fontWeight={'semibold'}
              marginTop={'3'}
            >
              {category.name}
            </Box>
          </Flex>
        </Box>
      </Link>
    </Flex>
  );
}

export function OrderListRow({ posts }: OrderListRowProps) {
  const { addItem } = useCart();
  return (
    <Flex>
      <Box
        p={2}
        borderWidth="1px"
        width="16.251rem"
        height="21rem"
        className="bg-white border-2 hover:border-red-500 hover:translate-y-[-3px]"
      >
        <Link as={NavLink} to={`/${posts._id}`} textColor="blue.800">
          <Box>
            <Img width="260px" height="205px" className="mx-[auto]" src={posts.img}></Img>
          </Box>
          <Heading className="flex justify-start" fontSize="large" marginTop="3" marginBottom={'1'}>
            {posts.title}
          </Heading>
        </Link>

        <OrderStatusBadge status={posts.status} />

        <Flex justifyContent={'space-between'} marginTop="2">
          <Box fontSize={'md'} fontWeight="bold">
            {Number(posts?.price).toLocaleString('ms')} VNĐ
          </Box>

          <ButtonGroup
            size="md"
            background={'red.500'}
            isAttached
            variant="outline"
            onClick={() => addItem(posts)}
            marginTop={'-2'}
            color="white"
          >
            <Button borderRadius={'0'}>
              Thêm
              <AddShoppingCartIcon className="ml-2"></AddShoppingCartIcon>
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  );
}
