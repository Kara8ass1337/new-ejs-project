//сохраняем/загружаем состояния в LocalStorage. не забываем, что всё хранится в строках
export default class LocalStorage {
    constructor() {

    }

    /**
     *
     * @param values {object};
     * @param key {string};
     */
    static write({values, key} = {}) {
        if (values.length === 0) return;

        localStorage.setItem(key, JSON.stringify(values)); //сериализуем объект в строку
    }

    /**
     *
     * @param key {string};
     */
    static read({key}) {
        if (!localStorage.getItem(key)) return false;

        return JSON.parse(localStorage.getItem(key)); //получаем значение и десериализируем его в объект
    }

    /**
     *
     * @param key {string};
     */
    static remove({key}) {
        localStorage.removeItem(key);
    }
};