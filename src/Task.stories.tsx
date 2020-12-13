import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Components/Task',
    component: Task
} as Meta;

const removeCallBack = action('Remove callback was clicked')
const changeStatusCallBack = action('Change status callback was clicked')
const changeTitleCallBack = action('Change title callback was clicked')

const Template: Story<TaskPropsType> = (args) => <div>
    <Task todolistId={'1'}
    changeTaskTitle={changeTitleCallBack}
    changeStatus={changeStatusCallBack}
    removeTask={removeCallBack}
    task={{id: '1', isDone: true, title: 'CSS'}}/>
    <Task todolistId={'1'}
    changeTaskTitle={changeTitleCallBack}
    changeStatus={changeStatusCallBack}
    removeTask={removeCallBack}
    task={{id: '2', isDone: true, title: 'JS'}}/>
</div> ;

export const Primary = Template.bind({})
Primary.args = {
}
