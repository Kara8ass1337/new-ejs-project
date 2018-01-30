/**
 *
 * @param $obj {object} jquery;
 */
export function jqToArr ($obj) {
    const arr = [];

    $obj.each((i, item) => {
        arr.push($(item));
    });

    return arr;
}