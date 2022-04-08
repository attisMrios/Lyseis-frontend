export default class Utils {

    /**
     * Storage in session storage any data 
     * @param key key name to set session storage
     * @param value the value to save to session storage
     * @param encrypt if needs to be encrypted
     * @returns true or false if data was saved
     */
    public static SetSessionStorage(key: string, value: string): boolean {
        let sessionWasSaved = false;

        try {
            window.sessionStorage.setItem(key, value);

            // validate the session storage 
            if (Utils.GetSessionStorage(key) == value) {
                sessionWasSaved = true
            } else {
                sessionWasSaved = false
            }
        } catch (error) {
            console.log(error);
        }

        return sessionWasSaved;
    }

    /**
     * get data from session storage
     * @param key key name to get session storage
     * @param decrypt if need to be decrypted
     * @returns data from session storage
     */
    public static GetSessionStorage(key: string): string | null {
        return window.sessionStorage.getItem(key);
    }

    public static CleanSessionStorage(){
        window.sessionStorage.clear();
    }
}