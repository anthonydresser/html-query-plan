/**
 * Finds the first ancestor that has the given class name.
 * @param element Element to search.
 * @param className Class name to search for.
 */
function findAncestor(element: Element, className: string): Element {
    return findAncestorP(element, e => hasClass(e, className));
}

/**
 * Finds the first ancestor that matches the given predicate.
 * @param element Element to search.
 * @param predicate Predicate for the ancestor to find.
 */
function findAncestorP(element: Element, predicate: (e: Element) => boolean): Element {
    if (element === null) {
        return null;
    }
    while (element && !predicate(element)) {
        element = element.parentElement;
    }
    return element;
}

function hasClass(element: Element, cls: string): boolean {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}

export { findAncestor, findAncestorP, hasClass };
