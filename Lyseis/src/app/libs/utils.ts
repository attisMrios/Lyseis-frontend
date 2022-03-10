export default class Utils {

    public static SetSessionStorage(key: string, value: string): boolean {
        let sessionWasSaved = false;

        try {
            window.sessionStorage.setItem(key, atob(value));

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

    public static GetSessionStorage(key: string): string {
        let sessionData = '';
        try {
            let sessionStorageData = window.sessionStorage.getItem(key);
            if (sessionStorageData) {
                sessionData = btoa(sessionStorageData);
            }
        } catch (error) {
            console.log(error);
        }
        return sessionData;
    }
}