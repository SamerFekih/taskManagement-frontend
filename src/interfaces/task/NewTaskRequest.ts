
export interface NewTaskRequest {
    title: string,
    description: string,
    dueDate: Date | null,
    priority: string,
    category: string
}