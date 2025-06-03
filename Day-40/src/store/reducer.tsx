export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
    todoInput: string;
    editId: number | null;
    editText: string;
}

export const initialState: TodoState = {
    todos: [],
    todoInput: "",
    editId: null,
    editText: ""
};

const addTodo = (state: TodoState): TodoState => {
    const newTodo: Todo = {
        id: Date.now(),
        text: state.todoInput,
        completed: false
    };
    return {
        ...state,
        todos: [...state.todos, newTodo],
        todoInput: ""
    };
};

const deleteTodo = (state: TodoState, action: any): TodoState => {
    return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
    };
};

const setTodoInput = (state: TodoState, action: any): TodoState => {
    return {
        ...state,
        todoInput: action.payload
    };
};

const startEdit = (state: TodoState, action: any): TodoState => {
    return {
        ...state,
        editId: action.payload.id,
        editText: action.payload.text
    };
};

const setEditText = (state: TodoState, action: any): TodoState => {
    return {
        ...state,
        editText: action.payload
    };
};

const saveEdit = (state: TodoState): TodoState => {
    const updatedTodos = state.todos.map(todo =>
        todo.id === state.editId ? { ...todo, text: state.editText } : todo
    );
    return {
        ...state,
        todos: updatedTodos,
        editId: null,
        editText: ""
    };
};

const actionHandler: any = {
    addTodo,
    deleteTodo,
    setTodoInput,
    startEdit,
    setEditText,
    saveEdit
};

const reducer = (state: TodoState, action: any): TodoState => {
    const handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
};

export default reducer;
