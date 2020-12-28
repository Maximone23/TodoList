import {FilterValuesType} from "../app/AppWithRedux"
import {v1} from "uuid"
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTitleActionType
    | ChangeFilterActionType
    | SetTodolistsActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0,
                items: []
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}


export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const removeTodoListAC = (todolistID: string): RemoveTodoListActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todolistID
})
export const addTodoListAC = (title: string): AddTodoListActionType => ({type: 'ADD-TODOLIST', title, todolistID: v1()})
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todoListID,
    title
})
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todoListID,
    filter
})

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodoListAC(todolistId))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(() => {
                dispatch(addTodoListAC(title))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
export const updateTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(todolistId, title))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
