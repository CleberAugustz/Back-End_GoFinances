import User from '../models/User'
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'

import AppError from '../errors/AppError'

import authConfig from '../config/auth'

import { sign, verify } from 'jsonwebtoken'

interface Request {
    email: string;
    password: string
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response>{

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne( { where: { email }})

        if(!user){
            throw new AppError('Incorrect email/password combination.')
        }        
        // user.password senha criptografada
        // password - senha não criptografada

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination.')
        }
        //Usuário authenticado

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, '9c678adbc20027707de90733c073f25d', {
            subject: user.id,
            expiresIn,
        } )
        return{
            user,
            token,
        }
    }
}

export default AuthenticateUserService;
