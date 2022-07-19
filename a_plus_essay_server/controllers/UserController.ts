import { Request, Response } from 'express'
import { UserService } from "../services/UserService";
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import dotenv from 'dotenv';
import jwt_decode from 'jwt-decode'

dotenv.config({ path: '../.env' });

export class UserController {
    //TODO:
    constructor(private userService: UserService) {
        this.userService = userService;
    }
    // verifying the info of registering account
    createUser = async (req: Request, res: Response) => {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let { isTutor, nickname, email, password, rePassword, phoneNumber } = req.body;

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

        if (!password) {
            res.status(400).json({ error: "Password is missed" });
            return;
        };

        if (!rePassword) {
            res.status(400).json({ error: "Password is not entered in the field of repeat password" });
            return;
        };

        if (password !== rePassword) {
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

        const userInfo = await this.userService.createUser({ isTutor, nickname, email, password, phoneNumber });
        const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)
        console.log('going to end...')
        if (isTutor === false) {
            res.json({ success: true, token: jwt });
            return;
        };

        this.createTutor;
        res.json({ success: true, token: jwt });
        // res.json({ success: true })
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
        console.log('isLoggedIn: ', isLoggedIn)
        const jwt = jwtSimple.encode(isLoggedIn.userInfo, process.env.jwtSecret!);
        console.log('JWT: ', jwt)
        console.log('decoded: ', jwt_decode(jwt))
        if (isLoggedIn.success === true) {
            res.json({ success: true, token: jwt });
        } else res.status(400).json({ error: "Incorrect password" });
        return;
    }

    loginWithFacebook = async (req: Request, res: Response) => {
        let { isTutor, nickname, email, phoneNumber, accessToken } = req.body;
        try {
            if (!accessToken) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ error: "Wrong Access Token!" });
                return;
            };

            if (!result.email) {
                res.status(400).json({ error: "Email is not available from facebook oauth." })
                return;
            };

            let user = (await this.userService.checkEmailDuplication(email));

            // login with facebook
            if (user) {
                const userInfo = await this.userService.loginByOAuth(email)
                const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)
                console.log('going to end...');
                res.json({ success: true, token: jwt });
                return;
            }

            // if no user, continue the registration process
            if (isTutor === undefined) {
                res.status(400).json({ error: "Please state your role, student or tutor" });
                return;
            };

            if (!nickname) {
                res.status(400).json({ error: "Nickname is missed" });
                return;
            };

            // register with facebook
            const userInfo = await this.userService.registerByOAuth({ isTutor, nickname, email });
            const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)
            console.log('going to end...')
            if (isTutor === false) {
                res.json({ success: true, token: jwt });
                return;
            };

            this.createTutor;
            res.json({ success: true, token: jwt });
            // res.json({ success: true })
            return;
        } catch (e: any) {
            res.status(500).json({ msg: e.toString() })
            return;
        }
    }

    loginWithGoogle = async (req: Request, res: Response) => {
        let { isTutor, nickname, email, phoneNumber, accessToken } = req.body;

        try {
            if (!accessToken) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }

            const fetchResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ error: "Wrong Access Token!" });
                return;
            };

            if (!result.email) {
                res.status(400).json({ error: "Email is not available from google oauth." })
                return;
            };

            let user = (await this.userService.checkEmailDuplication(email));

            // login with google
            if (user) {
                const userInfo = await this.userService.loginByOAuth(email)
                const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)
                console.log('going to end...');
                res.json({ success: true, token: jwt });
                return;
            }

            // if no user, continue the registration process
            if (isTutor === undefined) {
                res.status(400).json({ error: "Please state your role, student or tutor" });
                return;
            };

            if (!nickname) {
                res.status(400).json({ error: "Nickname is missed" });
                return;
            };

            // register with google
            const userInfo = await this.userService.registerByOAuth({ isTutor, nickname, email });
            const jwt = jwtSimple.encode(userInfo, process.env.jwtSecret!)
            console.log('going to end...')
            if (isTutor === false) {
                res.json({ success: true, token: jwt });
                return;
            };

            this.createTutor;
            res.json({ success: true, token: jwt });
            // res.json({ success: true })
            return;
        } catch (e: any) {
            res.status(500).json({ msg: e.toString() })
            return;
        }
    }

    // logout = async () => { }
    resetPassword = async (req: Request, res: Response) => {
        let { email, newPassword, reNewPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const permit = new Bearer({
            query: "access_token"
        });
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ error: "permission denied" });
        }

        const payload = jwtSimple.decode(token, process.env.jwtSecret!);
        if (!payload) {
            return res.status(401).json({ error: "Invalid JWT" });;
        }

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

    checkEmailAndPhoneDuplication = async (req: Request, res: Response) => {
        const { email, phoneNumber } = req.body
        const emailDuplication = await this.userService.checkEmailDuplication(email);
        console.log('hv email? ', emailDuplication)
        if (emailDuplication) {
            res.status(400).json({ error: "This email address has been registered. Please register with another email address." })
            return;
        };
        const phoneNumberDuplication = await this.userService.checkPhoneNumberDuplication(phoneNumber);
        console.log('hv phone? ', phoneNumberDuplication)
        if (phoneNumberDuplication) {
            res.status(400).json({ error: "This phone number has been registered. Please register with another phone number." })
            return;
        };
        res.json({ success: true })
        return
    }
}