import sanitizeHtml from "sanitize-html"

export function processSvg(svgText: string) {
    let cleanSvg = sanitizeHtml(svgText, {
        allowedTags: [
            "svg",
            "path",
            "circle",
            "rect",
            "line",
            "polyline",
            "polygon",
            "ellipse",
            "g",
        ],

        allowedAttributes: {
            svg: [
                "viewBox",
                "xmlns",
                "fill",
                "stroke",
                "stroke-width",
            ],

            path: [
                "d",
                "fill",
                "stroke",
                "stroke-width",
                "stroke-linecap",
                "stroke-linejoin",
                "fill-rule",
                "clip-rule",
            ],

            circle: [
                "cx",
                "cy",
                "r",
                "fill",
                "stroke",
                "stroke-width",
            ],

            rect: [
                "x",
                "y",
                "width",
                "height",
                "rx",
                "ry",
                "fill",
                "stroke",
                "stroke-width",
            ],

            line: [
                "x1",
                "x2",
                "y1",
                "y2",
                "stroke",
                "stroke-width",
                "stroke-linecap",
                "stroke-linejoin",
            ],

            polyline: [
                "points",
                "fill",
                "stroke",
                "stroke-width",
            ],

            polygon: [
                "points",
                "fill",
                "stroke",
                "stroke-width",
            ],

            ellipse: [
                "cx",
                "cy",
                "rx",
                "ry",
                "fill",
                "stroke",
                "stroke-width",
            ],

            g: [
                "fill",
                "stroke",
                "stroke-width",
                "fill-rule",
                "clip-rule",
            ],
        },
    })

    // Add viewBox if the uploaded SVG doesn't have one
    const hasViewBox = /viewBox=/i.test(cleanSvg)

    if (!hasViewBox) {
        cleanSvg = cleanSvg.replace(
            /<svg([^>]*)>/i,
            '<svg$1 viewBox="0 0 16 16">'
        )
    }

    return cleanSvg
        .replace(/\s(width|height)="[^"]*"/gi, "")
        .replace(
            /\s(fill|stroke)="(?!none)[^"]*"/gi,
            ' $1="currentColor"'
        )
        .replace(
            /\sstyle="[^"]*"/gi,
            ""
        )
}