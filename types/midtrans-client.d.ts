declare module "midtrans-client" {
  interface ClientOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CustomerDetails {
    first_name?: string;
    email?: string;
  }

  interface CreateTransactionParameter {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    item_details?: { id: string; price: number; quantity: number; name: string }[];
    credit_card?: { secure: boolean };
    enabled_payments?: string[];
  }

  interface CreateTransactionResponse {
    token: string;
    redirect_url: string;
  }

  export class Snap {
    constructor(options: ClientOptions);
    createTransaction(parameter: CreateTransactionParameter): Promise<CreateTransactionResponse>;
    createTransactionToken(parameter: CreateTransactionParameter): Promise<string>;
    createTransactionRedirectUrl(parameter: CreateTransactionParameter): Promise<string>;
  }

  interface ChargeParameter {
    payment_type: string;
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    item_details?: { id: string; price: number; quantity: number; name: string }[];
    custom_expiry?: { expiry_duration: number; unit: "second" | "minute" | "hour" | "day" };
    [key: string]: unknown;
  }

  interface ChargeAction {
    name: string;
    method: string;
    url: string;
  }

  interface ChargeResponse {
    status_code: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    actions?: ChargeAction[];
    qr_string?: string;
    expiry_time?: string;
  }

  export class CoreApi {
    constructor(options: ClientOptions);
    charge(parameter: ChargeParameter): Promise<ChargeResponse>;
  }
}
