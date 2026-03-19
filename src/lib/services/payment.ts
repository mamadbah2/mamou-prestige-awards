/** Price per single vote in GNF */
export const VOTE_PRICE = 1000;

interface PaymentResult {
  success: boolean;
  transactionRef: string;
  error?: string;
}

/**
 * Process an Orange Money payment.
 * Currently in SANDBOX mode — simulates a successful payment.
 * Replace the body of this function with the real Orange Money Guinea API later.
 */
export async function processPayment(
  phoneNumber: string,
  amount: number
): Promise<PaymentResult> {
  // Sandbox: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const transactionRef = `OM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  // Sandbox always succeeds
  return {
    success: true,
    transactionRef,
  };
}
