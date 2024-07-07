import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../interfaces/task/Task";


const initialState: Task[] = [
];


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            return action.payload;
        }
    }
})


export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;