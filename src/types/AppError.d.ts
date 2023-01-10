export type AppError = {
    title: string;
    description?: string;
    code?: string;
    fields: {[key: string]: string};
}