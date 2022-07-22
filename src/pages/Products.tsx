// in src/users.js
import { List, Datagrid, TextField, ReferenceField, NumberField, NumberInput, EmailField, ImageField, UrlField, Edit, SimpleForm, TextInput, PasswordInput, ReferenceInput, SelectInput, ImageInput, Create, EditButton, DeleteButton } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const ProductsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
<NumberInput source="price" />
<RichTextInput source="description" />
<TextInput source="tags" />
<ReferenceInput source="categoriesId" reference="product-categories">

                        <SelectInput optionText="name" />

                    </ReferenceInput>
<ImageInput source="image" label="Related pictures" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>

        </SimpleForm>
    </Edit>
);

export const ProductsCreate = (props: any) => (
    <Create  {...props}>
        <SimpleForm>
            <TextInput source="name" />
<NumberInput source="price" />
<RichTextInput source="description" />
<TextInput source="tags" />
<ReferenceInput source="categoriesId" reference="product-categories">

                        <SelectInput optionText="name" />

                    </ReferenceInput>
<ImageInput source="image" label="Related pictures" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>

        </SimpleForm>
    </Create>
);

export const ProductsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
<NumberField source="price" />
<TextField source="tags" />
<ReferenceField source="categoriesId" reference="product-categories">

                        <TextField source="name" />

                    </ReferenceField>

<ImageField source="image" title="title" />


            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);