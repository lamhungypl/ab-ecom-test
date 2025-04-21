export type EntityState<T, Id extends string = string> = {
  entities: Record<Id, T>;
  ids: Id[];
};
