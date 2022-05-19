import { LoginPage } from './login';
import { FilterPage } from './filter-page';
import { OrderDetailsPage } from './products/product-detail';
import { HomePage } from './home';
import { ShoppingCartPage } from './shopping-cart';
import { HomeAminPage } from './admin-pages/admin-home';
import { OrderEditPage } from './admin-pages/admin-products/admin-product-edit';
import { OrderPaymentPage } from './payments/products-payment';
import { PaymentListAdminPage } from './admin-pages/admin-payment/admin-payment-list';
import { AdminCategoryCreatePage } from './admin-pages/admin-categories/admin-category-create';
import { OrderCreationPage } from './admin-pages/admin-products/admin-product-creation';
import { OrderManagePage } from './admin-pages/admin-products/admin-product-list';
import { AdminCategoryPage } from './admin-pages/admin-categories/admin-category-list';
import { AdminCategoryEditPage } from './admin-pages/admin-categories/admin-category-edit';

export const routesConfig = [
  {
    path: '/admin/login',
    component: LoginPage,
  },
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/admin/posts/create',
    component: OrderCreationPage,
  },
  {
    path: '/product/:id',
    component: OrderDetailsPage,
  },
  {
    path: '*',
    component: FilterPage,
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
  {
    path: '/admin/payment',
    component: PaymentListAdminPage,
  },
  // {
  //   path: '/Đồ%20uống',
  //   component: PaymentListAdminPage,
  // },
];
