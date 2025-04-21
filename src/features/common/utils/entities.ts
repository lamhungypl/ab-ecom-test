import { EntityState } from '@/features/common/common.types';
import { uniqArray } from '@/features/common/utils/array';

export const createEntityAdapter = <T, Id extends string = string>() => {
  return {
    getInitialState: (): EntityState<T, Id> => {
      return { ids: [], entities: {} as Record<Id, T> };
    },
    addOne: (state: EntityState<T, Id>, entity: { id: Id } & T): EntityState<T, Id> => {
      if (!state.entities[entity.id]) {
        state.entities[entity.id] = entity;
        state.ids = uniqArray(state.ids.concat(entity.id));
      }
      return state;
    },
    updateOne: (
      state: EntityState<T, Id>,
      update: { changes: Partial<T>; id: Id }
    ): EntityState<T, Id> => {
      if (state.entities[update.id]) {
        state.entities[update.id] = {
          ...state.entities[update.id],
          ...update.changes,
        };
      }
      return state;
    },
    upsertOne: (state: EntityState<T, Id>, entity: { id: Id } & T): EntityState<T, Id> => {
      if (state.entities[entity.id]) {
        state.entities[entity.id] = { ...state.entities[entity.id], ...entity };
      } else {
        state.entities[entity.id] = entity;
        state.ids = uniqArray(state.ids.concat(entity.id));
      }
      return state;
    },
    removeOne: (state: EntityState<T, Id>, id: Id): EntityState<T, Id> => {
      if (state.entities[id]) {
        delete state.entities[id];
        state.ids = state.ids.filter((entityId) => entityId !== id);
      }
      return state;
    },
    removeMany: (state: EntityState<T, Id>, ids: Id[]): EntityState<T, Id> => {
      ids.forEach((id) => {
        if (state.entities[id]) {
          delete state.entities[id];
        }
      });
      state.ids = state.ids.filter((id) => !ids.includes(id));
      return state;
    },
    selectIds: (state: EntityState<T, Id>): Id[] => state.ids,
    selectEntities: (state: EntityState<T, Id>): Record<Id, T> => state.entities,
    selectAll: (state: EntityState<T, Id>): T[] => state.ids.map((id) => state.entities[id]!),
    selectTotal: (state: EntityState<T, Id>): number => state.ids.length,
    selectById: (state: EntityState<T, Id>, id: Id): T | undefined => state.entities[id],
  };
};
