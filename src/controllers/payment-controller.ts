import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticket = await paymentService.getPaymentByTicketId(userId, ticketId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
