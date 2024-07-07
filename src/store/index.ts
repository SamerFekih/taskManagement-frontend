import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./TaskSlice"


const store = configureStore({
    reducer: {
        
        task: taskReducer,
        
    }
})

export default store