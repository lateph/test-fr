import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from "./authProvider";
import CssBaseline from '@mui/material/CssBaseline';
import dataProvider from "./dataProvider";
import { UsersList, UsersEdit, UsersCreate } from "./pages/Users";
import { ProductsList, ProductsEdit, ProductsCreate } from "./pages/Products";
import { PostsList, PostsEdit, PostsCreate } from "./pages/Posts";
import { ProductCategoriesList, ProductCategoriesEdit, ProductCategoriesCreate } from "./pages/ProductCategories";

const App = () => (
  <>
    <CssBaseline />
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ UsersList} edit={ UsersEdit} create={ UsersCreate}/>
        <Resource name="products" list={ ProductsList} edit={ ProductsEdit} create={ ProductsCreate}/>
        <Resource name="posts" list={ PostsList} edit={ PostsEdit} create={ PostsCreate}/>
        <Resource name="product-categories" list={ ProductCategoriesList} edit={ ProductCategoriesEdit} create={ ProductCategoriesCreate}/>
    </Admin>
  </>
);

export default App;