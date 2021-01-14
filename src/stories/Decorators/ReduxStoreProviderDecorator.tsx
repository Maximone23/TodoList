import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {AppRootStateType} from '../../state/store'
import {v1} from 'uuid'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', items: []},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', items: []}
    ],
    tasks: {
        ["todolistId1"]: [
            {
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
            },
            {
                todoListId: v1(),
                title: "JS",
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: v1()
            }
        ],
        ["todolistId2"]: [
            {
                todoListId: v1(),
                title: "Milk",
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: v1()
            },
            {
                todoListId: v1(),
                title: "ReactBook",
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: v1()
            }
        ]
    },
    app: {
        status: "idle",
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
