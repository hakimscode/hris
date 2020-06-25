export declare class ResponseDto {
    readonly statusCode: number;
    readonly message: string;
    readonly data: any;
    constructor(statusCode: number, message: string, data?: any);
}
