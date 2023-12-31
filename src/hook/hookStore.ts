'use client';
type StorageType = 'session' | 'local'
type UserStorageReturnValue = {
    getItem:(key:string,type?:StorageType) => string;
    setItem:(key:string,value:string,type?:StorageType) => boolean;
    removeItem:(key:string,type?:StorageType) => void;
}


const useStorage = ():UserStorageReturnValue => {
    const storageType = (type?:StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

    const isBrowser:boolean = (():boolean => typeof window !== undefined)();
    if(typeof window !== "undefined"){
        console.log({
            isBrowser,
            window
        })
    }
    

    const getItem = (key:string,type?:StorageType):string => {
        return isBrowser ? window[storageType(type)][key]: '';
    };

    const setItem = (key:string,value:string,type?:StorageType):boolean => {
        if(isBrowser){
            window[storageType(type)].setItem(key,value);
            return true;
        }
        return false;
    }

    const removeItem = (key:string,type?:StorageType):void => {
        window[storageType(type)].removeItem(key);
    }

    return {
        getItem,
        setItem,
        removeItem
    }
 }


 export default useStorage;