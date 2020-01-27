export function isEmptyArray(array) {
    return !array || !Array.isArray(array) || array.length === 0
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/a/6274381/3263250
 */
export function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function randomHistogram(length) {
    const histogram = [];
    for(let i = 1; i <= length; i++) histogram.push(i);
    return shuffle(histogram);
}
