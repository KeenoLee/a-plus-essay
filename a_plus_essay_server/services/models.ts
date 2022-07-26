interface Guideline {
    filename: string;
    uri: string;
    type: string;
    // base64Data: string;
}
interface Note {
    filename: string;
    uri: string;
    type: string;
    // base64Data: string;
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
export interface OrderItem {
    studentId: number;
    tutorId?: number;
    isMatched?: Boolean;
    title: string;
    subject: string;
    grade: string;
    description: string;
    // guidelines: Guideline[]; // base64
    // notes: Note[]; // base64
    budget: number;
    completed?: Date | null;
    paid?: Date | null;
    studentDeadline: Date;
    tutorDeadline: Date;
}
export interface OrderFile {
    guidelines: Guideline[]; // base64
    notes: Note[]; // base64
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
    message: string;
    order_id: number;
    sender_id: number;
    // newMessage: string;
}

export interface NewMessage {
    order_id: number;
}



