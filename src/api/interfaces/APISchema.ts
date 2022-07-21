export interface APISchema<T> {
    Count: number;
    Message: string;
    Results: T[]
}