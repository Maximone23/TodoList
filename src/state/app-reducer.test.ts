import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {

    startState = {
        status: "idle",
        error: null
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC('Some Error'))

    expect(endState.error).toBe('Some Error');
})
test('correct status should be set', () => {

    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading');
})

