import {FilterValuesType, TodoListType} from "../AppWithRedux"
import {v1} from "uuid"


type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTitleActionType |
    ChangeFilterActionType

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

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todolistID,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
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

        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistID: string) :RemoveTodoListActionType  => ({type: 'REMOVE-TODOLIST', id: todolistID})
export const AddTodoListAC = (title: string) :AddTodoListActionType  => ({type: 'ADD-TODOLIST', title, todolistID: v1()})
export const ChangeTodoListTitleAC = (todoListID: string, title: string) :ChangeTitleActionType  => ({type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title})
export const ChangeTodoListFilterAC = (todoListID: string, filter: FilterValuesType) :ChangeFilterActionType  => ({type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter})