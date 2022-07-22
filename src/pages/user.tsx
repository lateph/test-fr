// in src/users.js
import { List, Datagrid, TextField, EmailField, UrlField, Edit, SimpleForm, TextInput, PasswordInput, Create, EditButton, DeleteButton } from 'react-admin';

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export const UsersCreate = (props: any) => (
    <Create  {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);

export const UsersList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);