/**
 * для удобства, во время дебагга страниц в dev-окружении
 */

/**
 * @param page {string};
 * @return {{}}
 */
pageConfig = (page) => {
    const pageConfig = {
        addScripts: '',
        title: '',
        context: '',
        header: true,
        footer: true
    };

    switch (page) {
        case 'index':
            pageConfig.title = 'Title for new ejs project';
            pageConfig.context = 'index';
            break;
        case 'err-404':
            pageConfig.title = '404 page title';
            pageConfig.context = 'err-404';
    }

    return pageConfig;
};

module.exports = pagesConfig = [
    pageConfig('index'),
    pageConfig('err-404')
];