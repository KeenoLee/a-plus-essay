import { UserService } from "../services/UserService";

export class UserController {
    //TODO:
    constructor(private userService: UserService) { }



    createStudent = async () => { }
    createTutor = async () => { }
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