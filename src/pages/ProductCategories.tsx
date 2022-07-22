// in src/users.js
import { List, Datagrid, TextField, ReferenceField, NumberField, NumberInput, EmailField, ImageField, UrlField, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, ImageInput, Create, EditButton, DeleteButton } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const ProductCategoriesEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />

        </SimpleForm>
    </Edit>
);

export const ProductCategoriesCreate = (props: any) => (
    <Create  {...props}>
        <SimpleForm>
            <TextInput source="name" />

        </SimpleForm>
    </Create>
);

export const ProductCategoriesList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);