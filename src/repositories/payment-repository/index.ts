import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

const paymentRepository = {
  findPaymentByTicketId
};

export default paymentRepository;
