export class LocalStorageProvider {
    public static save(key:string, value: object){
        console.log("Saved", key, value);

        localStorage.setItem(key, JSON.stringify(value));
    }

    public static get<TObj>(key: string): TObj | null {
        
        const strValue = localStorage.getItem(key);
        let value: TObj | null = null;
        if(strValue){
            value = JSON.parse(strValue) as TObj;
        } else {
            value = null;
        }

        console.log("Retrieved", key, value);
        return value;
    }
} 