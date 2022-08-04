export type Ly6Methods = 'get' | 'post' | 'put' | 'delete';
export type Ly6ContentTypes = 'text/html' | 'multipart/form-data' | 'application/json'
export type Ly6CrudActions = 'update' | 'create';
export type Ly6Process = 'products' | 'third_party';
export type Ly6Request<T> = {process: Ly6Process, data: T};
export type Ly6Response<T> = {message: string, data?: T};
export type Ly6CookiesTypes = 'access_token'