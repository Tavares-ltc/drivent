import { getTicketsTypes, getTickets, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postTicket);
export { ticketsRouter };
