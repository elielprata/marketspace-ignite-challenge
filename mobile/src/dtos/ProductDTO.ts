export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  user_id: string;
  user: {
    name: string;
    avatar: string;
  };
  product_images: {
    id: string;
    path: string;
  }[];
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
};
