import Appointment from '../models/Appointments'
import { getCustomRepository } from 'typeorm'
import {startOfHour } from 'date-fns'; 
import AppointmentsRepository from '../repositories/appointmentsRepository';


import AppError from '../errors/AppError'

interface RequestDTO {
    provider_id: string;
    date: Date;    
}

class CreateAppointmentService {

    public async execute({ date, provider_id}: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        
        const AppointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(AppointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointments is already booked.');
            //return response.status(400).json({ message: 'This appointments is already booked.'})
        }

        const appointment = appointmentsRepository.create({
            date: AppointmentDate,
            provider_id,
        })

        await appointmentsRepository.save(appointment)
        return appointment
    }
}

export default CreateAppointmentService;