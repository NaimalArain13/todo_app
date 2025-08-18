import { createSlice , PayloadAction} from "@reduxjs/toolkit";
interface Todo {
    id:number,
    text:string,
    completed:boolean
}

const initialState:Todo[] = []
const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state:any,action:PayloadAction<string>)=>{
            state.push({ id: Date.now(), text: action.payload, completed: false })
        },
        removeTodo:(state,action:PayloadAction<number>)=>{
            state.filter((todo:{id:number})=>todo.id !== action.payload)
        },
        completedTodos:(state,action:PayloadAction<number>)=>{
            const todo = state.find((todo)=>todo.id === action.payload)
            if(todo) 
                todo.completed = !todo.completed
        }
    }
})

export const {addTodo, removeTodo, completedTodos} = todoSlice.actions;
export default todoSlice.reducer;
