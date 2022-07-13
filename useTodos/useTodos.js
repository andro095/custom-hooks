import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodos = () => {
    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    
      
    }, [todos])

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo => !todo.done).length;
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch( action );

    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    }

    const handleToogleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toogle Todo',
            payload: id,
        });
    }

    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToogleTodo,
    }
}
