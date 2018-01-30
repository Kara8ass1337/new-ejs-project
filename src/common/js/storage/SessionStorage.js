//сохраняем/загружаем состояния в SessionStorage. не забываем, что всё хранится в строках
export default class SessionStorage {
    constructor() {

    }

    /**
     *
     * @param values {object};
     * @param key {string};
     */
    static write({values, key} = {}) {
        if (values.length === 0) return;

        sessionStorage.setItem(key, JSON.stringify(values)); //сериализуем объект в строку
    }

    /**
     *
     * @param key {string};
     */
    static read({key} = {}) {
        if (!sessionStorage.getItem(key)) return false;

        return JSON.parse(sessionStorage.getItem(key)); //получаем значение и десериализируем его в объект
    }

    /**
     *
     * @param key {string};
     */
    static remove({key} = {}) {
        sessionStorage.removeItem(key);
    }
};