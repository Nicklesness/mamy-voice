const LAVA_API_URL = "https://gate.lava.top/api/v3/invoice";

interface CreateInvoiceParams {
  email: string;
  offerId: string;
  currency?: string;
}

interface LavaInvoiceResponse {
  id: string;
  status: string;
  paymentUrl: string;
}

/**
 * Creates a payment invoice via Lava.top API.
 * Docs: https://docs.lava.top
 */
export async function createInvoice({
  email,
  offerId,
  currency = "USD",
}: CreateInvoiceParams): Promise<LavaInvoiceResponse> {
  const apiKey = process.env.LAVA_API_KEY;
  if (!apiKey) {
    throw new Error("LAVA_API_KEY is not configured");
  }

  const response = await fetch(LAVA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      email,
      offerId,
      currency,
      paymentProvider: "STRIPE",
      buyerLanguage: "EN",
      periodicity: "ONE_TIME",
    }),
  });

  if (response.status === 429) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lava.top API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as LavaInvoiceResponse;
  return data;
}
