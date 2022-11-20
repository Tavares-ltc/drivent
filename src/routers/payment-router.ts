import { getPaymentByTicketId } from "@/controllers/payment-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId);

export { paymentRouter };
