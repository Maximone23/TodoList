import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {AddItemForm, AddItemFormType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: (title: string) => {}
    },
} as Meta;

const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({})
AddItemFormBaseExample.args = {
    addItem: action('Button inside form clicked')
}
export const AddItemFormDisabled = Template.bind({})
AddItemFormDisabled.args = {
    addItem: action('Button inside form clicked'),
    disabled: true
}
