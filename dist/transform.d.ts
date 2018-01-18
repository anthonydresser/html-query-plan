/**
 * Sets the contents of a container by transforming XML via XSLT.
 * @param container Container to set the contens for.
 * @param xml Input XML.
 * @param xslt XSLT transform to use.
 */
declare function setContentsUsingXslt(container: Element, xml: string, xslt: string): void;
export { setContentsUsingXslt };
