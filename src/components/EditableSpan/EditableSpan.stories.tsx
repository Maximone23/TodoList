import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanType} from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan
} as Meta;

const changeValueCallBack = action('Value was changed')

const Template: Story<EditableSpanType> = (args) => <EditableSpan {...args}/>


export const Primary = Template.bind({})
Primary.args = {
    value: 'StartValue',
    changeValue: changeValueCallBack
}

