import React, {ChangeEvent, memo, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo(({
                                        task,
                                        todolistId
                                    }: TaskPropsType) => {

    const dispatch = useDispatch();

    const removeTaskHandler = useCallback(()=>{
        dispatch(removeTaskAC(task.id,todolistId))
    },[]);

    const changeTaskTitleHandler = useCallback((newTitle:string)=>{
        dispatch(changeTaskTitleAC(task.id,newTitle,todolistId))
    },[]);

    const changeTaskStatusHandler = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(changeTaskStatusAC(task.id,e.currentTarget.checked,todolistId))
    },[])


    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeTaskStatusHandler}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

