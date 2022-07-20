export interface UserInfo {
    user_id: number,
    nickname: string,
    email: string,
    phone_number: string,
    is_admin: boolean,
    is_tutor: boolean,
    created_at: Date,
    updated_at: Date
}
export interface TutorInfo {
    tutor_id: number,
    is_verified: boolean,
    student_card_base64: string,
    rating: string,
    self_intro: string,
    ongoing_order_amount: number,
    completed_order_amount: number,
    created_at: Date,
    updated_at: Date
}
export interface SchoolInfo {
    id: number,
    school: string,
    created_at: Date,
    updated_at: Date
}
export interface TranscriptInfo {
    id: number,
    transcript_base64: string
}
export interface AuthState {
    user?: UserInfo
    tutor?: Array<TutorInfo & SchoolInfo & TranscriptInfo[]>
    error?: string
}
export type JWTStudentPayload = {
    id: number,
    nickname: string,
    email: string,
    phone_number: string,
    is_admin: boolean,
    is_tutor: boolean,
    created_at: Date,
    updated_at: Date,
}