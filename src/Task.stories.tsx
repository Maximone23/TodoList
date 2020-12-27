import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {v1} from "uuid";

export default {
    title: 'Todolist/Task',
    component: Task
} as Meta;

const removeCallBack = action('Remove callback was clicked')
const changeStatusCallBack = action('Change status callback was clicked')
const changeTitleCallBack = action('Change title callback was clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>
const baseArg = {
    changeStatus: changeStatusCallBack,
    changeTaskTitle: changeTitleCallBack,
    removeTask: removeCallBack,
}

export const IsNotCompletedTask = Template.bind({})
IsNotCompletedTask.args = {
    todolistId: 'todolistId1',
    ...baseArg,
    task: {
        todoListId: v1(),
        title: "HTML&CSS",
        status: 0,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: v1()
    }
}
export const CompletedTask = Template.bind({})
CompletedTask.args = {
    todolistId: 'todolistId1',
    ...baseArg,
    task: {
        todoListId: v1(),
        title: "HTML&CSS",
        status: 2,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: v1()
    }
}
