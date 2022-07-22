// in src/users.js
import { List, Datagrid, TextField, ReferenceField, NumberField, NumberInput, EmailField, ImageField, UrlField, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, ImageInput, Create, EditButton, DeleteButton } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput type="email"  source="email" />
<PasswordInput source="password" />
<TextInput source="name" />

        </SimpleForm>
    </Edit>
);

export const UsersCreate = (props: any) => (
    <Create  {...props}>
        <SimpleForm>
            <TextInput type="email"  source="email" />
<PasswordInput source="password" />
<TextInput source="name" />

        </SimpleForm>
    </Create>
);

export const UsersList = () => (
    <List>
        <Datagrid rowClick="edit">
            <EmailField source="email" />
<TextField source="name" />

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);