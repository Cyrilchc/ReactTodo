export class Todo{
    Name: string;
    Completion: boolean;

    constructor(name: string, completion: boolean){
        this.Name = name;
        this.Completion = completion;
    }
}