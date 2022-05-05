import { HttpError } from "routing-controllers";

export class NotAvailableResourceError extends HttpError {
  constructor(message?: string) {
    super(410, message);
  }
}
