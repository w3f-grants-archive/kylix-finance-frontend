import { StoreSetFn } from "@repo/types";

export interface PaginationDefaultProps {
  page: number;
  perPage: number;
  total: number;
}

export type TableName =
  | "latestLiquidation"
  | "liquidations"
  | "loanPositions"
  | "markets"
  | "personalBids"
  | "supply";

export type PaginationState = {
  [key in TableName]: PaginationDefaultProps;
};

export interface State {
  pagination: PaginationState;
}

export interface Handlers {
  updatePagination: (arg: {
    name: TableName;
    props: Partial<PaginationDefaultProps>;
  }) => void;
}

export type SetState = StoreSetFn<State>;

export type Store = State & Handlers;
