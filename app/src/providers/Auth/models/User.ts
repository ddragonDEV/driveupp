export type User = {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  rut: string;
  photo?: string;
  role: 'mechanic' | 'user';
  createdAt: string;
  scoreAverage: 3.5;
  scoreCount: 2;
  scorePoints: 7;
};
