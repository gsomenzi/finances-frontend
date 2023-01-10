import axios from 'axios';
import { AppError } from '../types/AppError';

/**
 * Adiciona queryString ao final de uma URL
 * @param url URL base para o método
 * @param name Nome da query string
 * @param value Valor da query string
 * @returns Retorna a URL atualizada
 */
export function addQueryString(url: string, name: string, value: string | number): string {
    if (url.indexOf('?') > -1 && !/\?$/.test(url)) {
        url = `${url}&${name}=${value}`;
    } else {
        url = `${url}?${name}=${value}`;
    }
    return url;
}

/**
 * Filtra objeto informando os parâmetros desejados
 */
export function getTrustedObject(object: any, trustedFields: string[]): any {
    const trusted: any = {};
    Object.keys(object).map(key => {
        if (trustedFields.indexOf(key) > -1) {
            trusted[key] = object[key];
        }
    });
    return trusted;
}

export function normalizeError(e: any): AppError {
    const formattedError: AppError = { title: '', fields: {} };
    if (axios.isAxiosError(e) && e.response?.data) {
        const { message } = e.response.data;
        formattedError.title = message;
        formattedError.code = String(e.response.status);
        if (e.response.data.errors) {
            Object.entries(e.response.data.errors).forEach(([key, value]) => {
                if (value && Array.isArray(value)) {
                    formattedError.fields[key] = String(value[0]);
                }
            });
        }
    } else {
        formattedError.title = e.message;
    }
    return formattedError;
}

/**
 * Recebe uma string ou número, com casas decimais ou não, e retorna em um float
 * @param {string | number} value Valor a ser formatado
 * @returns {number} O número como um float
 */
export function normalizeValue(value: string | number): number {
    if (typeof value === 'number') {
        return value;
    }
    if (value.indexOf(',') > -1 || value.indexOf('.') > -1) {
        if (value.lastIndexOf(',') > value.lastIndexOf('.')) {
            return (
                parseFloat(
                    value
                        .substring(0, value.lastIndexOf(',') + 3)
                        .replace(/,/g, '')
                        .replace(/\./g, ''),
                ) / 100
            );
        } else {
            return (
                parseFloat(
                    value
                        .substring(0, value.lastIndexOf('.') + 3)
                        .replace(/,/g, '')
                        .replace(/\./g, ''),
                ) / 100
            );
        }
    } else {
        return parseFloat(value);
    }
}