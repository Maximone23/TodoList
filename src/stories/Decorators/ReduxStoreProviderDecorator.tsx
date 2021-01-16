import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {AppRootStateType} from '../../state/store'
import {v1} from 'uuid'
import {appReducer} from "../../state/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", order: 0, addedDate: '', items: []},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", order: 0, addedDate: '', items: []}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                todoListId: "todolistId1",
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
                todoListId: "todolistId1",
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
                todoListId: "todolistId2",
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
                todoListId: "todolistId2",
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

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
