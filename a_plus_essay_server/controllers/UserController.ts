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
        return id;
    }

    createTutor = async (req: Request, res: Response) => {
        const isTutor: boolean = req.body.isTutor;
        const regID = this.createUser;
        let { ................} = req.body;

        if (isTutor === false && regID.length > 0) {
            res.json({ success: true });
            return;
        };

        if no transcript ......

        if no studentCard ......

        if (phoneNumber === undefined) {
            res.status(400).json({ error: "Phone number is missed" })
            return;
        };

        const phoneNumberDuplication = await this.userService.checkPhoneNumberDuplication(phoneNumber);
        if (phoneNumberDuplication.length > 0) {
            res.status(400).json({ error: "This phone number has been registered. Please register with another phone number." })
            return;
        };

        if (isWhatsapp === undefined && isSignal === undefined) {
            res.status(400).json({ error: "Please choose one instant messenger" })
            return;
        };

        if (!major) {
            res.status(400).json({ error: "The major is missed" })
            return;
        }

        const id = await this.userService.createTutor(
            {
                isVerified,
                transcript,
                studentCard,
                phoneNumber,
                isWhatsapp,
                isSignal,
                school,
                major_id,
                rating,
                selfIntro,
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