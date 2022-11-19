import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    await enrollmentsService.getOneWithAddressByUserId(userId);
    const tickets = await ticketsService.getTicketsByUserId(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId }: {ticketTypeId: number} = req.body;
  try {
    const enrrolment = await enrollmentsService.getOneWithAddressByUserId(userId);
    if(!enrrolment) return res.sendStatus(httpStatus.NOT_FOUND);
    const ticketCreated = await ticketsService.postTicket(enrrolment.id, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticketCreated);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
