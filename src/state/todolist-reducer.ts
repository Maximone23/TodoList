import {FilterValuesType, TodoListType} from "../App"
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


export const todolistReducer = (state: Array<TodoListType>, action: ActionType) => {
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
            const nextState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
            return nextState
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })

        default:
            throw new Error("I don`t understand this type of action")
    }
}

export const RemoveTodoListAC = (todolistID: string) :RemoveTodoListActionType  => ({type: 'REMOVE-TODOLIST', id: todolistID})
export const AddTodoListAC = (title: string) :AddTodoListActionType  => ({type: 'ADD-TODOLIST', title, todolistID: v1()})
export const ChangeTodoListTitleAC = (todoListID: string, title: string) :ChangeTitleActionType  => ({type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title})
export const ChangeTodoListFilterAC = (todoListID: string, filter: FilterValuesType) :ChangeFilterActionType  => ({type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter})