import { useEffect, useRef } from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useStore } from "./store";
import type {Todo} from "./store/reducer.tsx"

export default function App() {
    const { state, dispatch } = useStore();
    const { todos, todoInput, editId, editText } = state;

    const editInputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        if (todoInput.trim()) {
            dispatch({ type: "addTodo" });
        }
    };

    const handleDelete = (id: number) => {
        dispatch({ type: "deleteTodo", payload: { id } });
    };

    const handleEdit = (todo: Todo) => {
        dispatch({ type: "startEdit", payload: { id: todo.id, text: todo.text } });
    };

    const handleSaveEdit = () => {
        if (editText.trim()) {
            dispatch({ type: "saveEdit" });
        }
    };

    useEffect(() => {
        if (editId !== null && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editId]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom textAlign="center" mt={4}>
                Todo List
            </Typography>
            <Box display="flex" gap={2} mb={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter todo..."
                    value={todoInput}
                    onChange={(e) =>
                        dispatch({ type: "setTodoInput", payload: e.target.value })
                    }
                />
                <Button variant="contained" onClick={handleAdd}>
                    Add
                </Button>
            </Box>
            <List>
                {todos.map((todo: Todo) => (
                    <ListItem
                        key={todo.id}
                        secondaryAction={
                            editId === todo.id ? null : (
                                <>
                                    <IconButton edge="end" onClick={() => handleEdit(todo)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            )
                        }
                    >
                        {editId === todo.id ? (
                            <Box display="flex" width="100%" gap={2}>
                                <TextField
                                    fullWidth
                                    inputRef={editInputRef}
                                    value={editText}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "setEditText",
                                            payload: e.target.value
                                        })
                                    }
                                />
                                <Button onClick={handleSaveEdit}>Save</Button>
                            </Box>
                        ) : (
                            <ListItemText primary={todo.text} />
                        )}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
