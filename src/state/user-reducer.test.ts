import {userReducer} from "./user-reducer";


test('user reducer should increment only age', () => {

    const startState = {age: 24, childrenCount: 0, name: 'Maxim'}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(25)
    expect(endState.childrenCount).toBe(0)
})

test('user reducer should increment only childrenCount', () => {

    const startState = {age: 24, childrenCount: 0, name: 'Maxim'}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(24)
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should chenge user name', () => {

    const startState = {age: 24, childrenCount: 0, name: 'Maxim'}
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: 'Alex'})

    expect(endState.age).toBe(24)
    expect(endState.childrenCount).toBe(0)
    expect(endState.name).toBe('Alex')
})