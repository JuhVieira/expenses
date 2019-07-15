
import ListExpenses from './containers/expenses/ListExpenses';
import ListRevenue from './containers/recipe/ListRecipe';


const routes = [
  { path: '/despesas', exact: true, name: 'ListExpenses', component: ListExpenses },
  { path: '/receitas', name:'ListRevenue', component: ListRevenue },
]

export default routes;
