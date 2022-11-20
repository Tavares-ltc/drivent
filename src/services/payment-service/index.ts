import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if(!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(enrollment.id !== ticket.Enrollment.id) throw unauthorizedError();

  const payment  = await paymentRepository.findPaymentByTicketId(ticketId);
  if(!payment) throw notFoundError();
 
  return payment;
}

const paymentService = {
  getPaymentByTicketId
};

export default paymentService;
