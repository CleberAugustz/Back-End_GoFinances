import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/appointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find(); // ginf == ele retorna todos os elementos do repositório.

    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {

    //try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date)

        const ccreateAppointment = new CreateAppointmentService();

        const appointment = await ccreateAppointment.execute({ date: parsedDate, provider_id })

        return response.json(appointment)

    // } catch (err) {
    //     return response.status(400).json({ error: err.message })
    // }
})

export default appointmentsRouter;