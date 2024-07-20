import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import chalk from 'chalk'
import bcrypt from 'bcrypt'
import { ExpressValidator } from "express-validator";
import { validationResult } from "express-validator";
import { inputValidator } from "../middleware/validator.middleware";



const prisma = new PrismaClient()

// implementation controlleurs
const controlleurs = {
    getallUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany()
            res.json(users).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red("erreur serveur"))
        }
    },
    createUsers: async (req: Request, res: Response) => {
        try {
            const  errorvalidation = (req:Request,res:Response)=>{
                const errors = validationResult(req)
                if (errors.isEmpty()){
                    return res.json(HttpCode.OK).json(errors.array())
                }
            }
            const { name, email, password } = req.body
            const passwordHash = await bcrypt.hash(password,10)
            errorvalidation(req,res)
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password:passwordHash
                }
            })
            // condition de verifcation
            if (user)
                res.json(user).status(HttpCode.OK)
            else
                res.json({ msg: "utilisateur pas creer" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    modifyUser : async (req:Request,res:Response)=>{
        const {id} = req.params //Recuperation de l'identifiant
        const {name,email,password} = req.body
        const passHash = await bcrypt.hash(password,10) //Hashage du password modifier

        const updateUser = await prisma.user.update({
            where:{
                user_id : id
            },
            data:{
                name,
                email,
                password:passHash
            }
        })
        if (updateUser !== null)
            res.json(updateUser).status(HttpCode.OK)
        else
            res.json({ msg: "utilisateur pas modifier" })

    },
    deleteUser

}

export default controlleurs