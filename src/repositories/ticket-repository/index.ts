import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";
import { createTicketType } from "../../factories";

async function findManyTypes() {
  return prisma.ticketType.findMany();
}
async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      TicketType: true,
    }
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst(({
    where: { id: ticketId },
    include: {
      Enrollment: true
    }
  }));
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED
    },
    include: {
      TicketType: true
    },
  });
}
const ticketsRepository = {
  findManyTypes,
  findUserTicket,
  createTicket,
  findTicketById
};

export default ticketsRepository;
