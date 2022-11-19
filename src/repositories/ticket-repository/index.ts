import { prisma } from "@/config";
import { createTicketType } from "../../factories";

async function findManyTypes() {
  return prisma.ticketType.findMany();
}
async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId
      }
    },
    include: {
      TicketType: true,
    },
  });
}
const ticketsRepository = {
  findManyTypes,
  findUserTicket
};

export default ticketsRepository;
