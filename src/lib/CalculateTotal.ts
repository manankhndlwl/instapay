
export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const calculateTotalPrice = (cartArr: IProduct[]): number => {
  let total = 0;
  cartArr.forEach((item) => (total += item.price * item.quantity));
  return Math.round(total);
};
