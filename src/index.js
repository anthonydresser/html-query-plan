﻿import transform from './transform.js';
var qpXslt = require('raw!./qp.xslt');

/* Draws the lines linking nodes in query plan diagram.
root - The document element in which the diagram is contained. */
function drawLines(root) {
    if (root === null || root === undefined) {
        // Try and find it ourselves
        root = $(".qp-root").parent();
    } else {
        // Make sure the object passed is jQuery wrapped
        root = $(root);
    }
    internalDrawLines(root);
};

/* Internal implementaiton of drawLines. */
function internalDrawLines(root) {
    var canvas = getCanvas($(".qp-root", root));
    var canvasElm = canvas[0];

    // Check for browser compatability
    if (canvasElm.getContext !== null && canvasElm.getContext !== undefined) {
        // Chrome is usually too quick with document.ready
        window.setTimeout(function() {
            var context = canvasElm.getContext("2d");

            canvasElm.width = canvasElm.offsetWidth;
            canvasElm.height = canvasElm.offsetHeight;
            var offset = canvas.offset();

            $(".qp-tr", root).each(function() {
                var from = $("> * > .qp-node", $(this));
                $("> * > .qp-tr > * > .qp-node", $(this)).each(function() {
                    drawLine(context, offset, from, $(this));
                });
            });
            context.stroke();
        }, 1);
    }
}

/* Locates or creates the canvas element to use to draw lines for a given root element. */
function getCanvas(root) {
    var returnValue = $("canvas", root);
    if (returnValue.length == 0) {
        root.prepend($("<canvas></canvas>"));
        returnValue = $("canvas", root);
    }
    return returnValue;
}

/* Draws a line between two nodes.
context - The canvas context with which to draw.
offset - Canvas offset in the document.
from - The document jQuery object from which to draw the line.
to - The document jQuery object to which to draw the line. */
function drawLine(context, offset, from, to) {
    var fromOffset = from.offset();
    fromOffset.top += from.outerHeight() / 2;
    fromOffset.left += from.outerWidth();

    var toOffset = to.offset();
    toOffset.top += to.outerHeight() / 2;

    var midOffsetLeft = fromOffset.left / 2 + toOffset.left / 2;

    context.moveTo(fromOffset.left - offset.left, fromOffset.top - offset.top);
    context.lineTo(midOffsetLeft - offset.left, fromOffset.top - offset.top);
    context.lineTo(midOffsetLeft - offset.left, toOffset.top - offset.top);
    context.lineTo(toOffset.left - offset.left, toOffset.top - offset.top);
}

function showPlan(container, planXml) {
    transform.setContentsUsingXslt(container, planXml, qpXslt);
    drawLines(container);
}

module.exports.drawLines = drawLines;
module.exports.showPlan = showPlan;