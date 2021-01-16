import {FilterValuesType} from "../app/App"
import {v1} from "uuid"
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppStatusType, setAppStatusAC, SetStatusActionType} from "./app-reducer";


type ActionsType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTitleActionType
    | ChangeFilterActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodoListEntityStatusAC>

type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType>

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
    entityStatus: AppStatusType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
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
                items: [],
                entityStatus: "idle"
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
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle"
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
export const changeTodoListEntityStatusAC = (todoListID: string, status: AppStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id: todoListID,
    status
} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then(() => {
                dispatch(addTodoListAC(title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
export const updateTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                console.log(e)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
