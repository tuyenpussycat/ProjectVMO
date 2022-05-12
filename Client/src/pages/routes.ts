import { OrderManagePage } from './orders/order-manage';
import { LoginPage } from './login';
import { NotFoundPage } from './not-found';
import { OrderCreationPage } from './orders/order-creation';
import { OrderDetailsPage } from './orders/order-details';
import { OrderListPage } from './orders/order-list';
import { RegisterPage } from './register';
import { ShoppingCartPage } from './orders/shopping-cart';
import { HomeAminPage } from './orders/home-admin';
import { OrderEditPage } from './orders/order-edit';
import { AdminCategoryPage } from './orders/Admin-category';
import { AdminCategoryEditPage } from './orders/admin-category-edit';
import { AdminCategoryCreatePage } from './orders/Admin-category-create';
import { OrderPaymentPage } from './orders/order-payment';

export const routesConfig = [
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/',
    component: OrderListPage,
  },
  {
    path: '/admin/posts/create',
    component: OrderCreationPage,
  },
  {
    path: '/:id',
    component: OrderDetailsPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: '/admin/posts',
    component: OrderManagePage,
  },
  {
    path: '/cart',
    component: ShoppingCartPage,
  },
  {
    path: '/admin',
    component: HomeAminPage,
  },
  {
    path: '/admin/edit/:id',
    component: OrderEditPage,
  },
  {
    path: 'admin/category',
    component: AdminCategoryPage,
  },
  {
    path: '/admin/category/edit/:id',
    component: AdminCategoryEditPage,
  },
  {
    path: '/admin/category/create',
    component: AdminCategoryCreatePage,
  },
  {
    path: '/payment',
    component: OrderPaymentPage,
  },
];
