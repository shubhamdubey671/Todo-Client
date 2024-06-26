import React, { useState } from 'react';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../App.css"

function TodoUi({ darkMode, setTodos }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTodo = (title, description) => {
        fetch("https://todo-server-xi.vercel.app/todos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            }),
        }).then((resp) => {
            // Fetch the updated list of todos after adding a new todo
            fetch("https://todo-server-xi.vercel.app/todos", {
                method: "GET",
            }).then((resp) => {
                resp.json().then((data) => {
                    console.log(data)
                    setTodos(data)
                });
            });
        })
    }
    const clearField = () => {
        setTitle("")
        setDescription("")
    }
    const handleFunction = () => {
        handleTodo(title, description);
        clearField()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
            <Card className='main-card' >
                <div style={{ padding: 16 }}>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: '#942fad'
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: '#942fad'
                            }
                        }}
                    />
                    <div style={{ paddingTop: 16 }} />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: '#942fad'
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: '#942fad'
                            }
                        }}
                    />
                </div>
                <div style={{ textAlign: 'center', paddingBottom: 16 }}>
                    <Button variant="contained" onClick={() => handleFunction()} sx={{
                        backgroundColor: '#942fad',
                        color: darkMode ? 'white' : 'white',
                        ":hover": {
                            backgroundColor: '#ada32f',
                            color: "black"
                        }
                    }}>Add Todo</Button>
                </div>
            </Card>
        </div>
    )
}

export default TodoUi;
