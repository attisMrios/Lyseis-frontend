export type Ly6Methods = 'get' | 'post' | 'put' | 'delete';
export type Ly6ContentTypes = 'text/html' | 'multipart/form-data' | 'application/json'
export type Ly6CrudActions = 'update' | 'create';
export type Ly6Services<T> = {process: 'products' | 'customers', data: T};
export type Ly6Response<T> = {message: string, data?: T};