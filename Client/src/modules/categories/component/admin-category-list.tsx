import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState, useCallback, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { ListResponse } from 'src/modules/shared/common.types';
import { LayoutAdmin } from '../../../components/layouts/layout-admin';
import { deleteCategory } from '../category.mutation';
import { fetchCategory } from '../category.queries';
import { Category } from '../category.types';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
export function AdminCategory() {
  const navigate = useNavigate();
  const { changeData } = useContext(AuthContext);
  const [category, setCategory] = useState<ListResponse<Category> | undefined>();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getCategory() {
      const data = await fetchCategory();
      if (data) {
        setLoad(true);
        setCategory(data);
      }
    }
    getCategory();
  }, [changeData]);

  return (
    <LayoutAdmin>
      <Box className="ml-60 my-10">
        <Button colorScheme="blue" size="md" onClick={() => navigate('/admin/category/create')}>
          Thêm danh mục
        </Button>
      </Box>

      <Box mt="4" pb="10">
        <Table
          borderX={'1px'}
          borderBottom={'2px'}
          width={'70%'}
          mx="auto"
          variant="simple"
          size={'lg'}
        >
          <Thead className=" h-3 bg-gray-600">
            <Tr>
              <Th color={'white'}>Ảnh</Th>
              <Th color={'white'}>Tên loại hàng</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {load === false ? (
              <Box className="mx-[auto]">
                <Image
                  width={'10'}
                  className="object-cover rounded-md"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                ></Image>
              </Box>
            ) : (
              category?.map((o) => <CategoryListRowManage key={o._id} category={o} />)
            )}
          </Tbody>
        </Table>
      </Box>
    </LayoutAdmin>
  );
}

type CategoryListRowProps = {
  category: Category;
};
export function CategoryListRowManage({ category }: CategoryListRowProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setChangeData } = useContext(AuthContext);
  const { changeData } = useContext(AuthContext);
  const deleteItem = useCallback(async () => {
    {
      const data = await deleteCategory(category._id as string);
      if (data) {
        setChangeData(!changeData);
      }
    }
  }, [category]);

  return (
    <Tr>
      <Td>
        <Link
          _hover={{ textDecoration: 'none' }}
          as={NavLink}
          to={`/admin/category/edit/${category._id}`}
          textColor="blue.800"
        >
          <img width={'120rem'} src={category.img}></img>
        </Link>
      </Td>
      <Td>{category.name}</Td>
      <Td padding={'0'}>
        <Button mt={'3.5'} background={'blue.500'}>
          <Link
            _hover={{ textDecoration: 'none' }}
            as={NavLink}
            to={`/admin/category/edit/${category._id}`}
            textColor="white"
            className="hover:text-black"
          >
            <Flex>
              <InfoIcon></InfoIcon>{' '}
              <Box mt={'2px'} ml="1">
                Chi tiết
              </Box>
            </Flex>
          </Link>
        </Button>

        <Button
          mt={'3.5'}
          className="hover:text-black"
          onClick={onOpen}
          marginLeft={'5'}
          background={'red.500'}
          color="white"
        >
          <DeleteIcon></DeleteIcon>
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginTop={'32'}>
            <ModalHeader>Bạn chắc chắn muốn xóa sản phẩm này?</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Hủy
              </Button>
              <Button
                className="hover:text-black"
                background={'red.500'}
                color="white"
                onClick={deleteItem}
                variant="ghost"
              >
                Xóa
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}
