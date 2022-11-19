import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { exclude } from "@/utils/prisma-utils";

async function getTicketsTypes(): Promise<any> {
  const ticketsType = await ticketsRepository.findManyTypes();
  return ticketsType;
}

async function getTickets(userId: number) {
  const hasEnrrolment = enrollmentRepository.findWithAddressByUserId(userId);
  if(!hasEnrrolment) return notFoundError();

  const tickets = await ticketsRepository.findUserTicket(userId);
  if(!tickets) throw notFoundError();
  return tickets;
}

const ticketsService = {
  getTicketsTypes,
  getTickets
};
export default ticketsService;
