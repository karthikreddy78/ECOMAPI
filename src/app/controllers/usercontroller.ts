import { Request, Response, NextFunction, Errback } from "express"
import { User } from '../models/User'
import { compareSync } from "bcrypt"
import {sign} from 'jsonwebtoken'

export class UserController {
    static login(req: Request, res: Response, next: NextFunction) {
        const private_key:string=process.env.PRIVATEKEY ||''

        User.findOne({ email: req.body.email }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err
                })
            }
            else {
                if (result != undefined) {
                    if (compareSync(req.body.password, result.password)) {
                        const token=sign({id:result._id},private_key,{expiresIn: '1h'})
                        res.json({ status: 'success', message: 'Login successful',data:token })

                    }
                    else {
                        res.json({ status: 'failed', message: 'Email or password is invalid' })

                    }
                }
                else {
                    res.json({ status: 'failed', message: 'No email id exists' })
                }


            }
        })

    }
    static registration(req: Request, res: Response, next: NextFunction) {
        const user = new User(req.body)
        User.create(user, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err
                })
            }
            else {
                res.json({ status: 'success', message: 'Registration successful', data: result })
            }
        })

    }
    static updateProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.body.userId
        
        User.findByIdAndUpdate(userId,{
            $set:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                addressInfo:req.body.addressInfo,
                mobile:req.body.mobile
            }
        }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err
                })
            }
            else {
                res.json({ status: 'success', message: 'UserProfile Updated', data:null })
            }
        })
    }

    static getProfile(req: Request, res: Response, next: NextFunction){
        const userId = req.body.userId
        console.log(userId)
        User.findById(userId,(err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err
                })
            }
            else {
                res.json({ status: 'success', message: 'UserProfile Updated', data:result })
            }
        })
    }
}