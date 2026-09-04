import sanitizeHtml from "sanitize-html"

export function processSvg(svgText: string) {
    return sanitizeHtml(svgText, {
        allowedTags: [
            "svg",
            "g",
            "path",
            "circle",
            "rect",
            "line",
            "polyline",
            "polygon",
            "ellipse",

            "defs",
            "style",
            "clipPath",
            "mask",
            "linearGradient",
            "radialGradient",
            "stop",
            "use",
            "symbol",

            "title",
            "desc",
        ],

        allowedAttributes: {
            "*": [
                "id",
                "class",

                "fill",
                "stroke",
                "stroke-width",
                "stroke-linecap",
                "stroke-linejoin",

                "fill-rule",
                "clip-rule",

                "opacity",
                "fill-opacity",
                "stroke-opacity",

                "transform",

                "clip-path",
                "mask",

                "href",
                "xlink:href",
            ],

            svg: [
                "xmlns",
                "viewBox",
                "width",
                "height",
                "fill",
                "stroke",
            ],

            path: [
                "d",
            ],

            circle: [
                "cx",
                "cy",
                "r",
            ],

            rect: [
                "x",
                "y",
                "width",
                "height",
                "rx",
                "ry",
            ],

            line: [
                "x1",
                "y1",
                "x2",
                "y2",
            ],

            polyline: [
                "points",
            ],

            polygon: [
                "points",
            ],

            ellipse: [
                "cx",
                "cy",
                "rx",
                "ry",
            ],

            linearGradient: [
                "id",
                "x1",
                "x2",
                "y1",
                "y2",
                "gradientUnits",
                "gradientTransform",
            ],

            radialGradient: [
                "id",
                "cx",
                "cy",
                "r",
                "fx",
                "fy",
                "gradientUnits",
                "gradientTransform",
            ],

            stop: [
                "offset",
                "stop-color",
                "stop-opacity",
            ],

            clipPath: [
                "id",
                "clipPathUnits",
            ],

            mask: [
                "id",
                "x",
                "y",
                "width",
                "height",
                "maskUnits",
                "maskContentUnits",
            ],

            use: [
                "href",
                "xlink:href",
                "x",
                "y",
                "width",
                "height",
            ],

            symbol: [
                "id",
                "viewBox",
            ],
        },

        parser: {
            lowerCaseTags: false,
            lowerCaseAttributeNames: false,
        },
    })
}