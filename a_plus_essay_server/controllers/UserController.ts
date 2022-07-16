import { Request, Response } from 'express'
import { UserService } from "../services/UserService";
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export class UserController {
    //TODO:
    constructor(private userService: UserService) {
        this.userService = userService;
    }
    // verifying the info of registering account
    createUser = async (req: Request, res: Response) => {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let { isTutor, nickname, email, password, rePassword, phoneNumber, oAuth } = req.body;

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

        if (oAuth === false && !password) {
            res.status(400).json({ error: "Password is missed" });
            return;
        };

        if (oAuth === false && !rePassword) {
            res.status(400).json({ error: "Password is not entered in the field of repeat password" });
            return;
        };

        if (oAuth === false && (password !== rePassword)) {
            res.status(400).json({ error: "Password does not match. Please enter the same password in the fields of password and repeat password" });
            return;
        };

        if (phoneNumber === undefined || phoneNumber.length !== 8) {
            res.status(400).json({ error: "Invalid phone number" })
            return;
        };

        const phoneNumberDuplication = await this.userService.checkPhoneNumberDuplication(phoneNumber);
        if (phoneNumberDuplication) {
            res.status(400).json({ error: "This phone number has been registered. Please register with another phone number." })
            return;
        };

        if (oAuth === true) { password === null };
        
        const userInfo = await this.userService.createUser({ isTutor, nickname, email, password, phoneNumber });
        const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)

        if (isTutor === false) {
            res.json({ success: true, token: jwt });
            return;
        };

        this.createTutor;
        res.json({ success: true, token: jwt });
        return;
    }

    createTutor = async (req: Request, res: Response) => {
        console.log('going to create tutor...')
        let { email, transcript, studentCard, school, major, selfIntro, subjects, score, preferredSubjects } = req.body;

        // if no transcript, .......
        // if no studentCard, .......

        if (!school) {
            res.status(400).json({ error: "The major is missed" })
            return;
        };

        if (!major) {
            res.status(400).json({ error: "The major is missed" })
            return;
        };

        if (!subjects || !score || !preferredSubjects) {
            res.status(400).json({ error: "Subject or grade or preferred subject is missed" });
            return;
        };

        await this.userService.createTutor(
            {
                email,
                transcript,
                studentCard,
                school,
                major,
                selfIntro,
                subjects,
                score,
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

        const isLoggedIn = await this.userService.loginWithPassword({ email, password });
        const jwt = jwtSimple.encode(isLoggedIn.userInfo, process.env.jwtSecret!);

        if (isLoggedIn.success === true) {
            res.json({ success: true, token: jwt });
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
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            let user = (await this.userService.checkEmailDuplication(result.email));

            // Create a new user if the user does not exist
            if (!user) {
                this.createUser;
            }
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
        const permit = new Bearer({
            query: "access_token"
        });
        const token = permit.check(req);
        const payload = jwtSimple.decode(token, process.env.jwtSecret!);

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

        const id = payload.id;
        const userId = await this.userService.resetPassword({ id, newPassword });
        res.json({ success: true });
        return;
    }
}