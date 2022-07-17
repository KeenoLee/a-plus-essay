
interface Guideline {
    filename: string
    base64: string
}

interface Note {
    filename: string
    base64: string
}
export interface OrderItem {

    studentId: number;
    tutorId?: number;
    isMatched?: Boolean;
    title: string;
    subject: string;
    grade: string;
    description: string;
    guidelines: Guideline[] // base64
    notes: Note[]; // base64
    budget: number;
    completed?: Date | null;
    paid?: Date | null;
    studentDeadline: Date;
    tutorDeadline: Date;
}

