import { Request, Response } from 'express'
import { UserService } from "../services/UserService";
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import dotenv from 'dotenv';
import jwt_decode from 'jwt-decode'
import { Subject } from '../services/models';
import formidable from "formidable";
import fs from "fs";
import { env } from '../env';

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
dotenv.config({ path: '../.env' || '../../.env' });
const form = formidable({
    uploadDir,
    multiples: true,
    keepExtensions: true,
    maxFiles: 10,
    maxFileSize: 1024 * 1080 ** 2, // the default limit is 200KB
    filter: part => part.mimetype?.startsWith('image/') || false,
})
const permit = new Bearer({
    query: "access_token"
})
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
        //set encode payload { id, nickname, is_tutor} into jwt
        const userInfo = await this.userService.createUser({ isTutor, nickname, email, password, phoneNumber });
        const jwt = jwtSimple.encode(userInfo, env.JWT_SECRET)
        console.log('going to end...')
        if (isTutor === false) {
            res.json({ success: true, token: jwt });
            return;
        };

        const tutorId = await this.createTutor(req, res, userInfo[0].id);
        console.log('SUCCESS to create!: ', tutorId)
        res.json({ success: true, token: jwt, tutorId: tutorId });
        return;
    }

    createTutor = async (req: Request, res: Response, userId: number) => {
        console.log('going to create tutor...')

        let { email, school, major, selfIntro, subjects } = req.body;

        // if no transcript, .......
        // if no studentCard, .......

        if (!school) {
            await this.userService.deleteUser(email);
            res.status(400).json({ error: "The major is missed" })
            return;
        };

        if (!major) {
            await this.userService.deleteUser(email);
            res.status(400).json({ error: "The major is missed" })
            return;
        };
        console.log('req.body: ', req.body)
        let preferredSubjects: string[] = []
        subjects.map((subject: Subject) => (subject.isChecked ? preferredSubjects.push(subject.subject) : null))

        if (subjects.length === 0 || preferredSubjects.length === 0) {
            await this.userService.deleteUser(email);
            res.status(400).json({ error: "Subject or score or preferred subject is missed" });
            return;
        };
        console.log('controller line 125')
        const tutorId = await this.userService.createTutor(
            {
                userId,
                email,
                school,
                major,
                selfIntro,
                subjects,
                preferredSubjects
            }
        )
        if (!tutorId) {
            res.json({ error: 'Failed to create account, please try again!' })
        }
        console.log('TUTORIDDDDDDD: DGSDFGDFG: ', tutorId)
        // res.json({ success: true });
        return tutorId
    }

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
        };

        const emailDuplication = await this.userService.checkEmailDuplication(email);
        if (emailDuplication === false) {
            res.status(400).json({ error: "This email address has not been registered" })
            return;
        };

        if (!password) {
            res.status(400).json({ error: "Missing password" })
            return;
        };

        const isLoggedIn: any = await this.userService.loginWithPassword({ email, password });
        console.log('isLoggedIn: ', isLoggedIn)
        // console.log('JWT: ', jwt)
        // console.log('decoded: ', jwt_decode(jwt))

        if (isLoggedIn.success === false) {
            res.status(400).json({ error: "Incorrect password" });
            return;
        };

        if (isLoggedIn.success === true) {
            const jwt = jwtSimple.encode(isLoggedIn.userInfo, env.JWT_SECRET);
            if (!isLoggedIn.tutorInfo) {
                res.json({ success: true, token: jwt, userInfo: isLoggedIn.userInfo });
                return
            }
            console.log('TUTOR!!: ', isLoggedIn.tutorInfo?.[3])
            res.json({ success: true, token: jwt, userInfo: isLoggedIn.userInfo, tutorInfo: isLoggedIn.tutorInfo });
            return
        }
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
                const jwt = jwtSimple.encode(userInfo, env.JWT_SECRET)
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
            const jwt = jwtSimple.encode(userInfo, env.JWT_SECRET)
            console.log('going to end...')
            if (isTutor === false) {
                res.json({ success: true, token: jwt });
                return;
            };

            this.createTutor;
            res.json({ success: true, token: jwt });
            // res.json({ success: true })
            return;
        } catch (e) {
            res.status(500).json({ msg: String(e) })
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
                const jwt = jwtSimple.encode(userInfo, env.JWT_SECRET)
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
            const jwt = jwtSimple.encode(userInfo, env.JWT_SECRET)
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
        const payload = jwtSimple.decode(token, env.JWT_SECRET);
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

    uploadTutorFile = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                console.log(files)
                console.log('FIELDS??? ', fields)
                const tutorId: number = +fields.tutorId
                if (err) {
                    res.json({ error: err })
                    return
                }
                if (files) {
                    const result = await this.userService.uploadTutorFile(tutorId, files)
                    res.json(result)
                    return
                }
            })
        } catch (err) {
            console.log(err)
            res.json(err)
            return
        }
    }

    editProfile = async (req: Request, res: Response) => {
        try {
            const editInfo = req.body
            console.log('EDIT INFO: ', editInfo)
            const result = await this.userService.editProfile(editInfo)
            if (result.success) {
                res.json({ success: true })
                return
            }
            return
        } catch (error) {
            console.log(error)
            res.json(error)
            return
        }
    }
    loginWithToken = async (req: Request, res: Response) => {
        console.log('going to login with token... : ')
        const token: string = permit.check(req);
        console.log('cAN GET tokEN?!!: ?? ', token)
        try {
            console.log('token in user controller: ', token)
            if (!token) {
                res.json({ error: 'Please login!' })
                return
            }
            const userInfo: any = jwt_decode(token)
            if (!userInfo) {
                res.json({ error: 'Please login!' })
                return
            }
            if (!userInfo.is_tutor) {
                res.json({ success: true, token, userInfo })
                return
            } else {
                console.log('userinfo.id?? in usercontroller: ', userInfo.id)
                const tutorInfo = await this.userService.getTutorInfo(userInfo.id)
                console.log('tutorinfo in usercontroller: ', tutorInfo)
                res.json({ success: true, token, userInfo, tutorInfo })
                return
            }
        } catch (error) {
            res.json({ error })
            return
        }
    }
    getUserImage = async (req: Request, res: Response) => {
        try {
            const token: string = permit.check(req)
            if (!token) {
                res.json({ error: 'Please login!' })
                return
            }
            const userInfo: any = jwt_decode(token)
            if (userInfo.is_tutor) {
                const result = await this.userService.getUserImage(userInfo.id)
                console.log(result)
                if (!result.error) {
                    res.json(result)
                    return
                }
                res.json(result.error)
                return
            }
            res.json({ error: 'user is not a tutor' })
            return
        } catch (error) {
            res.json(error)
            return
        }
    }
    getTutorInfo = async (req: Request, res: Response) => {
        try {
            
        }
        catch (error) {
            res.json({error: String(error)})
        }
    }
}