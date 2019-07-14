
import ListExpenses from './containers/expenses/ListExpenses';
import ListRevenue from './containers/recipe/ListRecipe';


const routes = [
  { path: '/despesas', exact: true, name: 'ListExpenses', component: ListExpenses },
  { path: '/receitas', name:'ListRevenue', component: ListRevenue },
  // { path:'/create-category', name:'CreateCategory', component: CreateCategory },
  // { path:'/establishments/:id', name:'EstablishmentDetails', component: EstablishmentDetails },
  // { path:'/product/:id', name: 'createOrder', component: ProductDetails },
  // { path:'/create-establishment', name:'CreateEstablishment', component: CreateEstablishment },
  // { path:'/create-product', name: 'CreateProduct', component: CreateProduct },
  // { path:'/create-order', name: 'createOrder', component: createOrder  },
  // { path:'/cart', name:'cart', component: cart },
];

export default routes;
