import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Img,
  Link,
  Select,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListResponse } from './shared/common.types';
import { LayoutDashboard, Pagination } from '../components';
import { fetchOrders } from './orders/products.queries';
import { Order } from './orders/products.types';
import { OrderStatusBadge } from './orders/components/product-status-badge';
import { AuthContext } from '../contexts/auth';
import { useCart } from 'react-use-cart';
import { fetchCategory } from './categories/category.queries';
import { Category } from './categories/category.types';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
export function Home() {
  const [page, setPage] = useState(1);
  const [sortPrice, setSortPrice] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [limitPage, setLimitPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [list, setList] = useState<ListResponse<Order> | undefined | any>();
  const [listCategory, setListCategory] = useState<ListResponse<Category> | undefined | any>();
  const clickPrev = useCallback(() => setPage((p) => p - 1), []);
  const clickNext = useCallback(() => setPage((p) => p + 1), []);
  const { valueSearch } = useContext(AuthContext);
  const { getClassify } = useContext(AuthContext);
  const [loadClassify, setLoadClassify] = useState(false);
  const [load, setLoading] = useState(false);
  useEffect(() => {
    async function getOrders() {
      const data = await fetchOrders({ page });
      if (data) {
        setLoading(true);
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
        setLoadClassify(true);
        setListCategory(data);
      }
    }
    getCategory();
  }, [page]);

  return (
    <LayoutDashboard>
      <Box marginTop={'20'}>
        <Image
          className="w-[100%] h-[235px] object-cover rounded-md"
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
                DANH M???C
              </Box>
              <Flex
                width={'100%'}
                height="auto"
                background={'white'}
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                {loadClassify === false ? (
                  <Box className="mx-[auto]">
                    <Image
                      width={'10'}
                      className="object-cover rounded-md"
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                    ></Image>
                  </Box>
                ) : (
                  listCategory?.map((o: Category) => <CategoryMap key={o._id} category={o} />)
                )}
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
              <Flex justifyContent={'space-between'}>
                <Box marginTop={2}>S???N PH???M</Box>
              </Flex>
            </Box>
            <Box>
              <Flex flexWrap="wrap" justifyContent="start" gap="0.5rem" cursor={'pointer'}>
                {load === false ? (
                  <Box className="mx-[auto]">
                    <Image
                      width={'10'}
                      className="object-cover rounded-md"
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                    ></Image>
                  </Box>
                ) : (
                  list?.map((o: Order) => <OrderListRow key={o._id} posts={o} />)
                )}
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
  const { setGetClassify } = useContext(AuthContext);
  const handleClassify = () => {
    scroll.scrollTo(610);
    setGetClassify(category.name);
  };
  return (
    <Flex cursor={'pointer'}>
      <Box
        onClick={handleClassify}
        p={3}
        borderWidth="1px"
        width="9.25rem"
        height="9rem"
        className="bg-white hover:border-red-500 hover:translate-y-[-3px]"
      >
        <Link _hover={{ textDecoration: 'none' }} as={NavLink} to={`/${category.name}`}>
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
        </Link>
      </Box>
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
        <Link _hover={{ textDecoration: 'none' }} as={NavLink} to={`/product/${posts._id}`} textColor="blue.800">
          <Box>
            <LazyLoadImage
              className="mx-[auto] w-[260px] h-[205px]"
              src={posts.img}
            ></LazyLoadImage>
          </Box>
          <Heading className="flex justify-start" fontSize="large" marginTop="3" marginBottom={'1'}>
            {posts.title}
          </Heading>
        </Link>
        <OrderStatusBadge status={posts.status} />
        <Flex justifyContent={'space-between'} marginTop="2">
          <Box fontSize={'md'} fontWeight="bold">
            {Number(posts?.price).toLocaleString('ms')} VN??
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
              Th??m
              <AddShoppingCartIcon className="ml-2"></AddShoppingCartIcon>
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </Flex>
  );
}
