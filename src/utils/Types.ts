export type User = {
  name: string;
  email: string;
  password: string;
  organization: string;
};

// añadir las propiedades de User que se necesiten
export type PromiseUser = Promise<{
  name: string;
  email: string;
  password: string;
  organization: string;
}>;

export const Views = {
  Map: 'map',
  List: 'list',
};

export const TableStatus = {
  Empty: 'empty',
  InTime: 'inTime',
  Late: 'late',
  Verylate: 'veryLate',
};
