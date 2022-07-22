// in src/users.js
import { List, Datagrid, TextField, ReferenceField, NumberField, NumberInput, EmailField, ImageField, UrlField, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, ImageInput, Create, EditButton, DeleteButton } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const PostsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
<ReferenceInput source="userId" reference="users">

                        <SelectInput optionText="name" />

                    </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const PostsCreate = (props: any) => (
    <Create  {...props}>
        <SimpleForm>
            <TextInput source="title" />
<ReferenceInput source="userId" reference="users">

                        <SelectInput optionText="name" />

                    </ReferenceInput>

        </SimpleForm>
    </Create>
);

export const PostsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" />
<ReferenceField source="userId" reference="users">

                        <TextField source="name" />

                    </ReferenceField>


            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);