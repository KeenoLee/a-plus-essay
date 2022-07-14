import { Request, Response } from 'express'
import { UserService } from "../services/UserService";

export class UserController {
    //TODO:
    constructor(private userService: UserService) {
        this.userService = userService;
    }
    // verifying the info of registering account
    createUser = async (req: Request, res: Response) => {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // let oAuth:boolean = false;
        let { isTutor, nickname, email, password, rePassword, oAuth } = req.body;
        if (oAuth !== true) { oAuth = false };

        if (isTutor === undefined) {
            res.status(400).json({ error: "Please state your role, student or tutor" });
            return;
        };

        if (!nickname) {
            res.status(400).json({ error: "Nickname is missed" });
            return;
        };

        if (!email) {
            res.status(400).json({ error: "Email address is missed" });
            return;
        };

        if (reg.test(email) === false) {
            res.status(400).json({ error: "Invalid email address" });
            return;
        }

        const emailDuplication = await this.userService.checkEmailDuplication(email);
        if (emailDuplication) {
            res.status(400).json({ error: "This email address has been registered. Please register with another email address." })
            return;
        };

        if ((oAuth === false) && !password) {
            res.status(400).json({ error: "Password is missed" });
            return;
        };

        if ((oAuth === false) && !rePassword) {
            res.status(400).json({ error: "Password is not entered in the field of repeat password" });
            return;
        };

        if ((oAuth === false) && (password !== rePassword)) {
            res.status(400).json({ error: "Password does not match. Please enter the same password in the fields of password and repeat password" });
            return;
        };

        if (oAuth === true) { password = null };

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
        if (phoneNumberDuplication) {
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

    //TODO:
    loginWithPassword = async (req: Request, res: Response) => {
        let { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            res.status(400).json({ error: "Missing email" })
            return;
        };

        if (reg.test(email) === false) {
            res.status(400).json({ error: "Invalid email address" });
            return;
        }

        if (!password) {
            res.status(400).json({ error: "Missing password" })
            return;
        };

        const correctPassword = await this.userService.loginVerification({ email, password });
        if (correctPassword) {
            res.json({ success: true });
        } else res.status(400).json({ error: "Incorrect password" });
        return;
    }

    loginWithFacebook = async (req: Request, res: Response) => {
        try {
            if (!req.body.accessToken) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            const { accessToken } = req.body;
            const fetchResponse =??????????? await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            let user = (await this.userService.checkEmailDuplication(result.email));

            // Redirect the user to registration
            if (!user) {
                res.json({ email: result.email, oAuth: true });
                return;
            }

            const payload = { id: user };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token
            });
            return;
        } catch (e: any) {
            res.status(500).json({ msg: e.toString() })
            return;
        }
    }

    // loginGoogle = async () => { }
    // logout = async () => { }
    resetPassword = async (req: Request, res: Response) => {
        let { email, newPassword, reNewPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            res.status(400).json({ error: "Missing email" })
            return;
        };

        if (reg.test(email) === false) {
            res.status(400).json({ error: "Invalid email address" });
            return;
        };

        const emailRegistration = await this.userService.checkEmailDuplication(email);
        if (!emailRegistration) {
            res.status(400).json({ error: "This email address has not been registered in the system" })
            return;
        };

        if (!newPassword) {
            res.status(400).json({ error: "Missing new password" })
            return;
        };

        if (!reNewPassword) {
            res.status(400).json({ error: "New password is not entered in the field of repeat password" });
            return;
        };

        if (newPassword !== reNewPassword) {
            res.status(400).json({ error: "New password does not match. Please enter the same new password in the fields of password and repeat password" });
            return;
        };

        const userId = await this.userService.resetPassword({ email, newPassword });
        res.json({ success: true });
        return;
    }

}