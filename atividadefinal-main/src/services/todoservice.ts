import axios, { AxiosResponse } from "axios";


interface Todo {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

    const baseUrl = 'http://localhost:8080/api/v1';

    export const getAllTodos = async () => {
        try {
            const response : any = await axios.get(`${baseUrl}/buscar`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving todos:', error);
            throw error;
        }
    }

    export const getTodoById = async (id: number) => {
        try {
            const response: AxiosResponse<Todo> = await axios.get(`${baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error updating produto with ID ${id}:`, error);
            throw error;
        }
    }

    export const createTodo = async (todo: Todo): Promise<Todo> =>{
        try {
            const response: AxiosResponse<Todo> = await axios.post(`${baseUrl}/salvar`, todo);
            return response.data;
        } catch (error) {
            console.error('Error creating todo:', error);
            throw error;
        }
    }

    export const updateTodo = async (todo: Todo, id: number): Promise<Todo>  =>{
        try {
            const response: AxiosResponse<Todo> = await axios.put(`${baseUrl}/atualiza/${id}`, todo);
            return response.data;
        } catch (error) {
            console.error(`Error updating todo with ID ${todo.id}:`, error);
            throw error;
        }
    }

    export const deleteTodoById = async (id: number): Promise<void>  => {
        try {
            await axios.delete(`${baseUrl}/excluir/${id}`);
        } catch (error) {
            console.error(`Error deleting todo with ID ${id}:`, error);
            throw error;
        }
    }