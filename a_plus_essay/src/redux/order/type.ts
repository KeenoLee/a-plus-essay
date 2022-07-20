
export interface ChatMessage {
    id: number,
    sent_by_tutor: boolean,
    message: boolean
}

export interface OrderInfo {
    id: number,
    student_id: number,
    tutor_id?: number,
    title: string,
    grade: string,
    description: string,
    budget: number,
    matched_time?: Date,
    completed_time?: Date,
    paid_by_student_time?: Date,
    paid_by_tutor_time?: Date,
    tutor_submission_deadline: Date,
    student_submission_deadline: Date
}
export interface FileInfo{
    id: number,
    // order_id: number,
    filename: string
}
export interface Guideline {
    id: number,
    // order_id: number,
    guideline_base64: string
}
export interface Note {
    id: number,
    // order_id: number,
    note_base64: string
}

export interface OrderState {
    orderInfo?: OrderInfo
    chatMessage?: Array<ChatMessage>
    file?: Array<FileInfo>
    guideline?: Array<Guideline>
    note?: Array<Note>
}
