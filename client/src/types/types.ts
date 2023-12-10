export type WineTasting = {
  id: string;
  price: number;
  quantity: number;
};

export type Sale = {
  _id: string;
  wineTastings: [{ price: number; id: string; quantity: number }];
  wines: [
    {
      id: string;
      title: string;
      img: string;
      year: string;
      price: number;
      quantity: number;
      isWineInBox: boolean;
      wineType: string;
      date: Date;
    }
  ];
  total: number;
  subtotal: number;
  discount: number;
  discountAmount: number;
  discountDifference: number;
  comment: string;
  date: Date;
  isBusiness: boolean;
};

export type Wine = {
  id: string;
  img?: string;
  title: string;
  year: string;
  price: number;
  wineType: string;
  volume?: number;
  isWineInBox?: boolean;
  quantity?: number;
};
