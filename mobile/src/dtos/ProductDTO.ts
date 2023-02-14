export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  user_id: string;
  user: {
    tel: string;
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
  payment_methods: {
    key: string;
    name: string;
  }[];
};
