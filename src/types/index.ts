import {EStatusRequest} from '../enums';

export interface IAction<TType extends string, TData> {
    type: TType;
    payload: TData | null;
}

export interface IAsyncAction<
    TType extends string,
    TData,
    TError = any
> extends IAction<TType, TData> {
    status: EStatusRequest;
    error: TError;
}

export type ObjectTypes<K extends string> = {
    [P in K]: string;
};
