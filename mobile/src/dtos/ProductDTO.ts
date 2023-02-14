export type ProductDTO = {
  id?: string;
  name: string;
  description: string;
  user: {
    avatar: string;
  };
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
};
