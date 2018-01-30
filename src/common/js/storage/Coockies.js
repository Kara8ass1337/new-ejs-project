//сохраняем/загружаем состояния в Coockies. не забываем, что всё хранится в строках
export default class Coockies {
    constructor() {

    }

    /**
     *
     * @param key {string};
     */
    static read({key}) {
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
        ));
        return matches ? decodeURIComponent(matches[1]) : false;
    }

    static write({key, value, options}) {
        let expires = options.expires;

        if (!expires) expires = 'Session';

        value = encodeURIComponent(value);

        let updatedCookie = `${key}=${value}`;

        for (const propName in options) {
            updatedCookie += `; ${propName}`;

            const propValue = options[propName];

            if (propValue !== true) {
                updatedCookie += `=${propValue}`;
            }
        }

        document.cookie = updatedCookie;
    }

    /**
     *
     * @param key {string};
     */
    static remove({key}) {
        Coockies.write({
            key,
            value: '',
            options: {expires: -1}
        });
    }
};