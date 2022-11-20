import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { exclude } from "@/utils/prisma-utils";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<any> {
  const ticketsType = await ticketsRepository.findManyTypes();
  return ticketsType;
}

async function getTicketsByUserId(userId: number): Promise<Ticket | TicketType> {
  const tickets = await ticketsRepository.findUserTicket(userId);
  if(!tickets) throw notFoundError();
  return tickets;
}

async function postTicket(enrrolmentId: number, ticketTypeId: number): Promise< Ticket | TicketType> {
  return await ticketsRepository.createTicket(enrrolmentId, ticketTypeId);
}

async function checkTicketOwnership(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if(!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(enrollment.id !== ticket.Enrollment.id) throw unauthorizedError();

  return ticket;
}
const ticketsService = {
  getTicketsTypes,
  getTicketsByUserId,
  postTicket,
  checkTicketOwnership
};
export default ticketsService;
