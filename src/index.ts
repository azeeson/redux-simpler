import {IAsyncAction, ObjectTypes} from './types/index';
import {EStatusRequest} from './enums';

export async function executeAsyncAction<
    TType extends string,
    TData,
    TArgs extends any[] = [],
>(
    type: TType,
    args: TArgs,
    action: (...args: TArgs) => Promise<TData>,
    dispatch: (action: Partial<IAsyncAction<TType, TData>>) => any
) {
    dispatch({type, status: EStatusRequest.RUNNING, payload: null, error: null});
    try {
        const response = await action(...args);
        dispatch({type, status: EStatusRequest.SUCCESS, payload: response, error: null});
    } catch (error) {
        dispatch({type, status: EStatusRequest.FAIL, payload: null, error})
    }
}

export function asyncActionCreator<
    TType extends string,
    TData,
    TArgs extends any[] = [],
>(
    type: TType, asyncHandler: (...args: TArgs) => Promise<TData>
) {
    return (dispatch: any, ...args: TArgs) => executeAsyncAction<TType, TData, TArgs>(type, args, asyncHandler, dispatch);
}

export function createTypes<T extends string, K extends T[]>(types: K, namespace: string): ObjectTypes<K[number]> {
    if (!Array.isArray(types)) {
        return Object.create({});
    }

    return types.reduce<ObjectTypes<K[number]>>((typeMap, type: K[number]) => {
        typeMap[type] = namespace ? `${namespace}_${type}` : type;
        return typeMap;
    }, Object.create({}));
}