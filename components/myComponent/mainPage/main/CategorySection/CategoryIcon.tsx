"use client"

import { useEffect, useState } from "react"

type CategoryIconProps = {
    src: string
    className?: string
}

export function CategoryIcon({
    src,
    className,
}: CategoryIconProps) {

    const [svg, setSvg] = useState("")

    useEffect(() => {
        async function loadSvg() {
            const res = await fetch(src)

            if (!res.ok) {
                throw new Error("Failed to load SVG")
            }

            let svgText = await res.text()

            svgText = svgText
                .replace(/\swidth="[^"]*"/gi, "")
                .replace(/\sheight="[^"]*"/gi, "")
                .replace(
                    /<svg([^>]*)>/i,
                    `<svg$1 class="${className ?? ""}">`
                )

            setSvg(svgText)
        }

        loadSvg()
    }, [src, className])

    if (!svg) return null

    return (
        <span
            dangerouslySetInnerHTML={{
                __html: svg,
            }}
        />
    )
}