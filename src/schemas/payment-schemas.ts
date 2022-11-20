import Joi from "joi";

export const processPaymentSchema = Joi.object({

  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
