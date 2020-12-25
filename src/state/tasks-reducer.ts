import {TasksStateType} from "../AppWithRedux"
import {TaskType, todolistAPI} from '../api/todolist-api'
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";


type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType
    | SetTasksActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskID: string
    completed: boolean
    todoListID: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskID: string
    title: string
    todoListID: string
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case 'CHANGE-STATUS-TASK': {
            let todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, completed: action.completed}
                    : t)
            return {...state}
        }
        case 'CHANGE-TITLE-TASK': {
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, title: action.title}
                    : t)
            return {...state}
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    taskID,
    todolistID
})
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskID: string, completed: boolean, todoListID: string): ChangeTaskStatusActionType => ({
    type: 'CHANGE-STATUS-TASK',
    taskID,
    completed,
    todoListID
})
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => ({
    type: 'CHANGE-TITLE-TASK',
    taskID,
    title,
    todoListID
})
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            description: '',
            completed: false,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        })
            .then(() => {
                dispatch(changeTaskTitleAC(taskId, taskTitle, todolistId))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
