

export default function getFromStorage(key) {

    try {
        const storage = localStorage.getItem(key);
        const storageData = JSON.parse(storage);

        if (!Array.isArray(storageData)) {
            return [];
        }

        return storageData;

    } catch (error) {
        return [];
    }

}