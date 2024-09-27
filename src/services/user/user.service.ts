import { Iuser } from "../../interface/user/user.interface";
import { Request, Response } from "express";
import { isValidCredencials, IsvalidPassword } from "../../utils/validator";
import { randomInt } from "crypto";
import { passwordHash } from "../../utils/hash";
import { prisma } from "../../database/prisma";
import { Secret, sign, verify } from "jsonwebtoken";
import { Refresh } from "../../types/token";


class UserService {

    
    public async cadastro(user: Iuser, response: Response):Promise<Response> {
        
        if(!isValidCredencials(user.username,user.email)) {
            return response.status(400).json({ message: 'Campos inválidos' });
        }
        if(!IsvalidPassword(user.password,user.confirmPassword)) {
            return response.status(400).json({ message: 'As senhas são inválidas' });
        }
        const salt:number = randomInt(10,16)
        const senha = await passwordHash(user.password,salt)
        
        const userExiste = await prisma.user.findUnique({
            where: {
                email: user.email,
            }
        })

        if (userExiste?.email===user.email) {
            return response.status(400).json({ message: 'Usuário já existe' });
        } 
        
        
        const newuser:Iuser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: senha
            }
        })
        return response.status(201).json({user: newuser})
         
    }
    public async authentication( {username,password}:Iuser , response: Response):Promise<Response> {
        //const {username, password}:Iuser = request.body

        if(username === '' || password === '') {
            return response.status(400).json({ message: 'Todos os campos devem ser preenchidos!' });
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })

            if (!user) {
                return response.status(400).json({ message: 'Usuário não encontrado' });
            }
            const key = process.env.SECRET_KEY as Secret
            
            const refreshtoken = sign({id:user.id,email:user.email},key,{expiresIn:'1d'})

            const acesssToken = sign({id:user.id,email:user.email},key,{expiresIn:'1h'})
            
            return response.status(200).json({ refresh:refreshtoken,access: acesssToken })

        } catch (error) {
                console.log(error)
                return response.status(500).json({ message: 'Erro na geração do token' })
        }
    }

    public async refresh( refresh:Refresh, response: Response ):Promise<Response> {
        
        if(refresh === '' || refresh === undefined) {
            return response.status(400).json({ message: 'Token não existente' });
        }
        
        const key = process.env.SECRET_KEY as Secret

        let decodedtoken:any

        try{
            decodedtoken = verify(refresh,key)
            const {id,email} = decodedtoken as {id:number,email:string}
            const token = sign({id:id,email:email},key,{expiresIn:'1d'})
            return response.status(200).json({ access:token })
        } catch(error) {
            return response.status(400).json({ message: 'Token de acesso inválido!' });
        }

        
    }
}

const userService = new UserService()

export default userService