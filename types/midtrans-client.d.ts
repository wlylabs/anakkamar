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

  export class CoreApi {
    constructor(options: ClientOptions);
  }
}
