import { notFoundError, unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";
import ticketsService from "../tickets-service";

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
  const payment  = await paymentRepository.findPaymentByTicketId(ticketId);
  if(!payment) throw notFoundError();
    
  return payment;
}
async function processPayment(ticketId: number, value: number, cardData: CardData) {
  const cardLastDigits = String(cardData.number).slice(String(cardData.number).length - 4);
  const payment = await paymentRepository.processPayment(ticketId, value, cardData.issuer, cardLastDigits);
  await ticketsRepository.updateTicketToPaid(ticketId);
  return payment;
}

const paymentService = {
  getPaymentByTicketId,
  processPayment
};

export default paymentService;
