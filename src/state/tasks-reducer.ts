import {TasksStateType} from "../app/App"
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api'
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, SetErrorActionType, setAppStatusAC, SetStatusActionType} from "./app-reducer";

//Types
type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type ThunkDispatch = Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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

//Actions
export const removeTaskAC = (taskID: string, todolistID: string) => ({
    type: 'REMOVE-TASK',
    taskID,
    todolistID
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)

//Thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTask(todolistId, taskTitle)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                } else {
                    if(res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(() => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
