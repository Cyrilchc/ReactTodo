import {Todo} from './Todo'
export class List{
    Name: string;
    Todos: Array<Todo>;

    constructor(name: string, todos: Array<Todo>){
        this.Name = name;
        this.Todos = todos;
    }
}