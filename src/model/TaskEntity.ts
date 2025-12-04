export interface TaskEntity {
    id: string;
    title: string;
    completed: boolean;
}

export interface CreateTaskDto {
    title: string;
    completed: boolean;
}

export interface UpdateTaskDto {
    id: string;
    title: string;
    completed: boolean;
}
