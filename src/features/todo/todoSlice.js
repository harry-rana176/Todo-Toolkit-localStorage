import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    todoList: [],
    editTodo: {}
};

export const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        initTodo: (state, { payload }) => {
            state.todoList = payload
        },
        addTodo: (state, { payload }) => {
            const addId = { ...payload, id: state.todoList.length + 1 }
            const finalTodoList = [...state.todoList, addId]
            state.todoList = finalTodoList
            localStorage.setItem('todolist', JSON.stringify(finalTodoList))
        },
        editTodo: (state, { payload }) => {
            const updateTodo = state.todoList.filter(_x => _x.id !== payload.id)
            const final = [...updateTodo, payload]
            state.todoList = final
            localStorage.setItem('todolist', JSON.stringify(final))
        },
        deleteTodo: (state, { payload }) => {
            const updateTodo = state.todoList.filter(_x => _x.id !== payload.id)
            updateTodo.forEach((item, index) => {
                item.id = index + 1
            })
            state.todoList = updateTodo
            localStorage.setItem('todolist', JSON.stringify(updateTodo))
        }
    }
})

export const { initTodo, addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
