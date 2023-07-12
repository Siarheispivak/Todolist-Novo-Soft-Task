import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    console.log('APP');

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])


    return (
        <div className="App" >
            <AppBar position="static">
                <Toolbar className={"toolbar"} >
                    <Typography variant="h6" className={"typography"}>
                        TODOLIST
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed maxWidth="xl" sx={{minHeight: "100vh"}}>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={9}>
                    {
                        todolists.map(tl => {


                            return (
                                    <Grid item key={tl.id}>
                                        <Paper style={{padding: "10px"}} elevation={11} sx={{bgcolor: 'rgba(0,119,255,0.37)'}}>
                                            <Todolist
                                                id={tl.id}
                                                title={tl.title}
                                                tasks={tasks[tl.id]}
                                                filter={tl.filter}
                                                changeFilter={changeFilter}

                                                addTask={addTask}
                                                removeTodolist={removeTodolist}
                                                changeTodolistTitle={changeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
