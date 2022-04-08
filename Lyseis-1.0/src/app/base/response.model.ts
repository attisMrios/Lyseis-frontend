export default class ResponseModel<T> {
    public status: number | undefined;
    public data: T | undefined;
}