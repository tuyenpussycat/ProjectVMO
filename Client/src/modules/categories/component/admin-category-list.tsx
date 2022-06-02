import {
  Box,
  Button,
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
      <Box className="ml-40">
        <Button colorScheme="green" size="md" onClick={() => navigate('/admin/category/create')}>
          Thêm danh mục
        </Button>
      </Box>

      <Box mt="4">
        <Table
          borderX={'1px'}
          borderBottom={'2px'}
          width={'80%'}
          marginLeft="10%"
          variant="simple"
          size={'lg'}
        >
          <Thead className=" h-3 bg-gray-600">
            <Tr>
              <Th textAlign="center" color={'white'}>
                Ảnh
              </Th>
              <Th color={'white'} textAlign="center">
                Tên loại hàng
              </Th>
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
          <img className="mx-[auto]" width={'120rem'} src={category.img}></img>
        </Link>
      </Td>
      <Td textAlign="center">{category.name}</Td>
      <Td padding={'0'} textAlign="center">
        <Button mt={'3.5'} background={'green.500'}>
          <Link
            _hover={{ textDecoration: 'none' }}
            as={NavLink}
            to={`/admin/category/edit/${category._id}`}
            textColor="white"
            className="hover:text-black"
          >
            Chi tiết
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
          Xóa
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
