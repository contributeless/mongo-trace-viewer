import { ServerErrorModel } from '../models/ServerErrorModel';
import { settings as appSettings } from './AppSettings';

export class HttpUtility {
    public static makeUrl(relativePart = '') {
        return HttpUtility.trimEndSlash(appSettings.baseUrl) + "/" + HttpUtility.trimStartSlash(relativePart);
    }

    private static trimEndSlash(source: string) {
        return source.replace(/\/+$/g, '');
    }

    private static trimStartSlash(source: string) {
        return source.replace(/^\/+/g, '');
    }

    public static async post(url = '', data = {}) {
        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });

            if (response.ok) {
                return response.json();
            } else {
                const parsedBody = await response.json(); // parses JSON response into native JavaScript objects
                if ((parsedBody as ServerErrorModel)?.errors?.length > 0) {
                    return Promise.reject(parsedBody);
                } else {
                    return Promise.reject({
                        errors: ["Unexpected server error"]
                    } as ServerErrorModel);
                }
            }

        }
        catch {
            return {
                errors: ["Network error"]
            } as ServerErrorModel;
        }
    }

    public static async get(url = '') {
        // Default options are marked with *
        try {
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            });

            if (response.ok) {
                return response.json();
            } else {
                const parsedBody = await response.json(); // parses JSON response into native JavaScript objects
                if ((parsedBody as ServerErrorModel)?.errors?.length > 0) {
                    return Promise.reject(parsedBody);
                } else {
                    return Promise.reject({
                        errors: ["Unexpected server error"]
                    } as ServerErrorModel);
                }
            }

        }
        catch {
            return Promise.reject({
                errors: ["Network error"]
            } as ServerErrorModel);
        }
    }
} 