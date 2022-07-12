import { Request, Response } from 'express'
import { UserService } from "../services/UserService";

export class UserController {
    //TODO:
    constructor(private userService: UserService) {
        this.userService = userService;
    }
    // verifying the info of registering student account
    createStudent = async (req: Request, res: Response) => {
        const nickname: string = req.body.nickname;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const rePassword: string = req.body.rePassword;

        if (!nickname) {
            res.status(400).json({ error: "nickname is missed" });
            return;
        };

        if (!email) {
            res.status(400).json({ error: "email address is missed" });
            return;
        };

        const emailRegistration = await this.userService.checkEmailRegistration(email);
        if (emailRegistration.length > 0) {
            res.status(400).json({ error: "This email address has been registered. Please register with another email address" })
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

        this.userService.createStudent(nickname, email, password);
        res.json({ success: true });
        return;
    }
    // createTutor = async () => { }
    //TODO:
    loginPassword = async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            res.json({ message: 'testing' })
        } catch (err) {
            console.error('userControllerError', err)
            //@ts-ignore
            res.status(500).json({ message: "internal server error" })
        }
    }
    loginGoogle = async () => { }
    loginFacebook = async () => { }
    logout = async () => { }
    resetPassword = async () => { }

}