// types/index.ts

export type Product = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: Product[];
  amount: number;
  date: Date;
  status: "pending" | "completed" | "cancelled";
};

export type OrdersSlice = {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  removeOrder: (orderId: string) => void;
};

export type CartSlice = {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addCartItem: (cartItem: CartItem) => void;
  removeCartItem: (productId: string) => void;
};
export type ProductsSlice = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
};

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export type NavSlice = {
  expand: boolean;
  setExpand: (arg: boolean) => void;
  menuNav: string;
  setMenuNav: (arg: string) => void;
  isLoadingPage: boolean;
  setIsLoadingPage: (arg: boolean) => void;
  mobileNav: boolean;
  setMobileNav: (arg: boolean) => void;
};

export type ModalSlice = {
  type: string;
  data: any;
  isOpen: boolean;
  onOpen: (arg: string, data?: any) => void;
  onClose: () => void;
};

export type StoreState = ProductsSlice &
  CartSlice &
  UserSlice &
  OrdersSlice &
  ModalSlice &
  NavSlice;

export interface User {
  email: string;
  mobile: string;
  name: string;
  password: string;
  createdAt: string;
  verified: boolean;
}

export interface Users {
  [key: string]: User;
}

export interface UsersData {
  users: Array<{
    email: string;
    password: string;
    [key: string]: any;
  }>;
}
