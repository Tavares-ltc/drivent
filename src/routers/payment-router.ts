import { getPaymentByTicketId, processPayment } from "@/controllers/payment-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { processPaymentSchema } from "@/schemas";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(processPaymentSchema), processPayment);

export { paymentRouter };
