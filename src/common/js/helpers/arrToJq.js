/**
 *
 * @param arr[] {object} jquery;
 */
export function arrToJq (arr) {
    return $($.map(arr, (el) => {
        return el.get();
    }));
}