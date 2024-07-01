// route.js
import OrderProduct from "../../user/layout/orderProduct/orderProduct";
import orderProduct from "../../user/layout/orderProduct/orderProduct";
import Analytics from "../layout/analytics/Analytics";
import Customer from "../layout/customers/Customer";
import Dashboard from "../layout/dashboard/Dashboard";
import InvoicePage from "../layout/invoice/InvoicePage";
import AdminMessage from "../layout/messages/AdminMessage";
import AddProducts from "../layout/products/AddProducts";
import AddCategory from "../layout/categories/AddCategory";
import ViewCategory from "../layout/categories/ViewCategory";
import AdminProducts from "../layout/products/AdminProducts";
import UpdateProduct from "../layout/products/UpdateProduct";
import ViewProduct from "../layout/products/ViewProduct";
import SalesReport from "../layout/sales-report/SalesReport";
import OrderView from "../layout/view-order/OrderView";
import AdminCategories from "../layout/categories/AdminCategories";
import UpdateCategory from "../layout/categories/UpdateCategory";
import AdminContact from "../layout/contacts/AdminContact";

const routes = [
  { path: '/auth/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/auth/view-products', exact: true, name: 'AdminProducts', component: AdminProducts },
  { path: '/auth/view-categories', exact: true, name: 'AdminCategories', component: AdminCategories },
  { path: '/auth/add-products', exact: true, name: 'AddProducts', component: AddProducts },
  { path: '/auth/add-categories', exact: true, name: 'AddCategory', component: AddCategory },
  { path: '/auth/view-category/:id', exact: true, name: 'ViewCategory', component: ViewCategory },
  { path: '/auth/update-category/:id', exact: true, name: 'UpdateCategory', component: UpdateCategory },
  { path: '/auth/messages', exact: true, name: 'AdminMessage', component: AdminMessage },
  { path: '/auth/analytics', exact: true, name: 'Analytics', component: Analytics },
  { path: '/auth/sales-report', exact: true, name: 'SalesReport', component: SalesReport },
  { path: '/auth/view-product/:id', exact: true, name: 'ViewProduct', component: ViewProduct },
  { path: '/auth/update-product/:id', exact: true, name: 'UpdateProduct', component: UpdateProduct },
  { path: '/auth/order-product', exact: true, name: 'OrderProduct', component: OrderProduct },
  { path: '/auth/create-invoice/:invoiceNumber', exact: true, name: 'InvoicePage', component: InvoicePage },
  { path: '/auth/view-orders', exact: true, name: 'OrderView', component: OrderView },
  { path: '/auth/customer-list', exact: true, name: 'Customer', component: Customer },
  { path: '/auth/contact-list', exact: true, name: 'AdminContact', component: AdminContact },
];

export default routes;
