
interface Guideline {
    guideline: string
}

interface Note {
    note: string
}
export interface OrderItem {
    id: number;
    students_id: number;
    tutors_id?: number;
    is_matched: Boolean;
    title: string;
    description: string;
    guideline: Guideline[] // base64
    note: Note[]; // base64
    budget: number;
    completed?: Date | null;
    paid?: Date | null;
    student_submission_deadline: Date;
    tutor_submission_deadline: Date;
}

