import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors';
import routes from './routes';
import "./database"
import "reflect-metadata";

import AppError from './errors/AppError'

import uploadConfig from './config/upload'


const app = express();
app.use('/file', express.static(uploadConfig.directory))
app.use(express.json())
app.use(routes)
/*
app.get('/', (request, response) =>{
    return response.json({ message: 'Hello World!'})
})*/

app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
    console.error(err)
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})


app.listen(3333, () => {
    console.log(`Server Started on port 3333`);
})