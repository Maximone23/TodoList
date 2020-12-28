import React, {ChangeEvent, useState} from 'react'
import {TextField} from "@material-ui/core"

export type EditableSpanType = {
    value: string
    changeValue: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
            ? <TextField value={title} onBlur={deActivatedEditMode} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={activatedEditMode}>{props.value}</span>
})