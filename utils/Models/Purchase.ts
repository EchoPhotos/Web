export interface Purchase {
  user: string;
  timestamp: number;
  feature: string;
  album?: string;
  stripeCheckoutSession?: string;
}

export interface IdPurchase extends Purchase {
  id: string;
}
