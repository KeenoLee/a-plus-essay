interface Guideline {
    filename: string;
    base64Data: string;
}
export type SubjectFromDB = {
    id: number;
    subject_name: string;
};
export type Subject = {
    key: string;
    subject: string;
    score: string;
    isChecked: boolean;
};
interface Note {
    filename: string;
    base64Data: string;
}
export interface OrderItem {
    studentId: number;
    tutorId?: number;
    isMatched?: Boolean;
    title: string;
    subject: string;
    grade: string;
    description: string;
    guidelines: Guideline[]; // base64
    notes: Note[]; // base64
    budget: number;
    completed?: Date | null;
    paid?: Date | null;
    studentDeadline: Date;
    tutorDeadline: Date;
}

export interface ChatMessage {
    orderId: number;
    sentByTutor: boolean;
    message: string;
}

export interface NewMessageNotice {
    orderId: number;
    senderId: number;
    message: string;
    sent_time: string;
}

export interface ChatroomList {
    id: number;
    title: string;
    last_message: string;
    last_message_time: string;
    // unread_count: number; //TODO
}

export interface MessageInput {
    order_id: number;
    sent_by_tutor: Boolean;
    message: string;
}

export interface NewMessage {
    order_id: number;
}
