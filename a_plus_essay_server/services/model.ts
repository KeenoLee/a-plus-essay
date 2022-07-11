export interface OrderItem {
    id: number;
    is_matched: Boolean;
    title: string;
    description: string;
    required_note?: any;
    budget: number;
    completed?: Date | null;
    paid?: Date | null;
    student_submission_deadline: Date;
    tutor_submission_deadline: Date;
}

