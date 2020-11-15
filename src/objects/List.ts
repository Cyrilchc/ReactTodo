import {Todo} from './Todo'
export interface List{
    id?: string;
    Name: string;
    Todos: Todo[];
    Color?: string;
}