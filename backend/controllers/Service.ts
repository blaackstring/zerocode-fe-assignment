import { Request, Response } from 'express';
import History from '../models/history.model';
const CreateUserHistory = async (req: Request, res: Response): Promise<void> => {
    const newInput = req.body as { input?: string }

    try {
        if (!newInput) res.send(404).json({ message: 'new input History not provided', status: false })

        await History.create({
            name: newInput
        })

        res.send(200).json({ message: 'Histroy Created Successfully', status: true })
        return
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'History Creation failed' });
    }

    return
}

interface AuthRequest extends Request {
    user?: { _id: string }  //it is type safe for mine understanding form user authticate from middleware
}

const GetUserHistory = async (req: AuthRequest, res: Response): Promise<void> => {
    const userid = req.user?._id

    try {
        if (!userid) res.send(404).json({ message: 'error while fetching user or user not found', status: false })

        const userHistory = await History.find({
            userid
        })

        if (userHistory.length === 0) {
            res.status(404).json({ message: 'No history found', status: false });
            return;
        }
        res.send(200).json({ history: userHistory, status: true })

        return

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'History Fetching failed' });
    }

    return
}