import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../AppWithRedux'
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                todoListId: "todolistId1",
                title: "HTML&CSS",
                completed: true,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: '1'
            },
            {
                todoListId: "todolistId1",
                title: "JS",
                completed: true,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: "2"
            },
            {
                todoListId: "todolistId1",
                title: "React",
                completed: true,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: "3"
            }
        ],
        "todolistId2": [
            {
                todoListId: "todolistId2",
                title: "Milk",
                completed: true,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: '1'
            },
            {
                todoListId: "todolistId2",
                title: "coffee",
                completed: false,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: '2'
            },
            {
                todoListId: "todolistId2",
                title: "Butter",
                completed: true,
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                id: '3'
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
})

test('correct task should be added to correct array', () => {


    const action = addTaskAC({
            todoListId: "todolistId2",
            title: "juice",
            completed: false,
            status: 0,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: '4'
        })

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].completed).toBe(false);
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].completed).toBe(false);
    expect(endState["todolistId1"][1].completed).toBe(true);
})

test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC("2", "coffee", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("coffee");
    expect(endState["todolistId1"][1].title).toBe("JS");
})


test('new array should be added when new todolist is added', () => {


    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {


    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
})




