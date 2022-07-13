import { Request, Response } from 'express'
import { UserService } from "../services/UserService";

export class UserController {
    //TODO:
    constructor(private userService: UserService) {
        this.userService = userService;
    }
    // verifying the info of registering account
    createUser = async (req: Request, res: Response) => {
        const isTutor: boolean = req.body.isTutor;
        const nickname: string = req.body.nickname;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const rePassword: string = req.body.rePassword;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (isTutor === undefined) {
            res.status(400).json({ error: "Please state your role, student or tutor" });
            return;
        };

        if (!nickname) {
            res.status(400).json({ error: "nickname is missed" });
            return;
        };

        if (!email) {
            res.status(400).json({ error: "email address is missed" });
            return;
        };

        if (reg.test(email) === false) {
            res.status(400).json({ error: "Invalid email address" });
            return;
        }

        const emailDuplication = await this.userService.checkEmailDuplication(email);
        if (emailDuplication.length > 0) {
            res.status(400).json({ error: "This email address has been registered. Please register with another email address." })
            return;
        };

        if (!password) {
            res.status(400).json({ error: "password is missed" });
            return;
        };

        if (password !== rePassword) {
            res.status(400).json({ error: "Password does not match. Please enter the same password in the fields of password and repeat password" });
            return;
        };

        const id = await this.userService.createUser({ isTutor, nickname, email, password });
        if (isTutor === false) {
            res.json({ success: true });
            return;
        };

        this.createTutor;
        return;
    }

    createTutor = async (req: Request, res: Response) => {

        let { transcript, studentCard, phoneNumber, isWhatsapp, isSignal, school, major, selfIntro, subjects, grades, preferredSubjects } = req.body;


        // if no transcript, .......
        // if no studentCard, .......

        if (phoneNumber === undefined || phoneNumber.length !== 8) {
            res.status(400).json({ error: "Invalid phone number" })
            return;
        };

        const phoneNumberDuplication = await this.userService.checkPhoneNumberDuplication(phoneNumber);
        if (phoneNumberDuplication.length > 0) {
            res.status(400).json({ error: "This phone number has been registered. Please register with another phone number." })
            return;
        };

        if (isWhatsapp === undefined && isSignal === undefined) {
            res.status(400).json({ error: "Instant messenger selection is missed" })
            return;
        };

        if (!school) {
            res.status(400).json({ error: "The major is missed" })
            return;
        };

        if (!major) {
            res.status(400).json({ error: "The major is missed" })
            return;
        };

        if (!subjects || !grades || !preferredSubjects) {
            res.status(400).json({ error: "Subject or grade or preferred subject is missed" });
            return;
        };

        const id = await this.userService.createTutor(
            {
                transcript,
                studentCard,
                phoneNumber,
                isWhatsapp,
                isSignal,
                school,
                major,
                selfIntro,
                subjects,
                grades,
                preferredSubjects
            }
        );
        res.json({ success: true });
        return;
    }

    // createTutor = async () => { }
    //TODO:
    loginPassword = async (req: Request, res: Response) => {
        let email: string = req.body;
        let password: string = req.body;

        if (!email) {
            res.status(400).json({ error: "missing email" })
            return;
        }

        if (!password) {
            res.status(400).json({ error: "missing password" })
            return;
        }

        const result = await this.userService.identityVerification({ email, password });
        if (result) {
            res.json({ success: true });
        } else res.status(400).json({ error: "incorrect password" });
        return;
    }


    loginGoogle = async () => { }
    loginFacebook = async () => { }
    logout = async () => { }
    resetPassword = async () => { }

}