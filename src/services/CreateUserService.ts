import User from '../models/User'
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'

interface Request {
    name: string;
    password: string;
    email: string;
}

class CreateUserService {
   public async execute({ name, email, password}: Request): Promise<User> {
       const usersRepository = getRepository(User);
       const checkUserExists = await usersRepository.findOne({
           where: { email },
       })
       if(checkUserExists){
           throw new AppError('Emaill addres already used.');
       }
       const hashedPassword = await hash(password, 8);
       const user = usersRepository.create({
           name, 
           email,
           password: hashedPassword,
       })
       await usersRepository.save(user);

       delete user.password;
       return user;

   }
}

export default CreateUserService;