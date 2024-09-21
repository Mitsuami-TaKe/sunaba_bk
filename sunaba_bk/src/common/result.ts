export type Result<T, E> = Success<T> | Failure<E>;

export class Success<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
    isSuccess(): this is Success<T> {
        return true;
    }
    isFailure(): this is Failure<any> {
        return false;
    }
    getValue(): T {
        return this.value;
    }
}

export class Failure<E> {
    readonly value: E;

    constructor(value: E) {
        this.value = value;
    }
    isSuccess(): this is Success<any> {
        return false;
    }
    isFailure(): this is Failure<E> {
        return true;
    }
    getValue(): E {
        return this.value;
    }
}
