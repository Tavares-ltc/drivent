import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

async function processPayment(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits
    }
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  processPayment
};

export default paymentRepository;
