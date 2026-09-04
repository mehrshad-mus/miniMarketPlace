"use client"

import { useEffect, useState } from "react"

type CategoryIconProps = {
    src: string
    className?: string
    color?: string
    monochrome?: boolean
}

export function CategoryIcon({
    src,
    className = "",
    color,
    monochrome = false,
}: CategoryIconProps) {
    const [svg, setSvg] = useState("")

    useEffect(() => {
        let cancelled = false

        async function loadSvg() {
            try {
                const res = await fetch(src)

                if (!res.ok) {
                    throw new Error(`Failed to load SVG: ${src}`)
                }

                let svgText = await res.text()

                /*
                 * فقط width و height خود SVG اصلی را حذف کن
                 */
                svgText = svgText.replace(
                    /<svg([^>]*)>/i,
                    (_, attributes) => {
                        const cleanAttributes = attributes
                            .replace(
                                /\swidth="[^"]*"/gi,
                                ""
                            )
                            .replace(
                                /\sheight="[^"]*"/gi,
                                ""
                            )
                            .replace(
                                /\sclass="[^"]*"/gi,
                                ""
                            )
                            .replace(
                                /\sstyle="[^"]*"/gi,
                                ""
                            )

                        return `<svg${cleanAttributes} class="${className}">`
                    }
                )

                /*
                 * SVG Repo بعضی وقت‌ها رنگ را داخل <style>
                 * قرار می‌دهد.
                 *
                 * مثال:
                 *
                 * .a {
                 *   fill:none;
                 *   stroke:#000000;
                 * }
                 */

                if (monochrome) {
                    svgText = svgText.replace(
                        /stroke\s*:\s*#[0-9a-f]+/gi,
                        "stroke:currentColor"
                    )

                    svgText = svgText.replace(
                        /fill\s*:\s*#[0-9a-f]+/gi,
                        "fill:currentColor"
                    )

                    /*
                     * fill="black"
                     * stroke="black"
                     * و غیره
                     */
                    svgText = svgText.replace(
                        /\sfill="(?!none|url\()[^"]*"/gi,
                        ' fill="currentColor"'
                    )

                    svgText = svgText.replace(
                        /\sstroke="(?!none|url\()[^"]*"/gi,
                        ' stroke="currentColor"'
                    )
                }

                /*
                 * رنگ مستقیم
                 */
                if (color) {
                    svgText = svgText.replace(
                        /<svg([^>]*)>/i,
                        `<svg$1 style="color:${color};">`
                    )
                }

                if (!cancelled) {
                    setSvg(svgText)
                }
            } catch (error) {
                console.error(
                    "Failed to load SVG:",
                    error
                )

                if (!cancelled) {
                    setSvg("")
                }
            }
        }

        loadSvg()

        return () => {
            cancelled = true
        }
    }, [src, className, color, monochrome])

    if (!svg) return null

    return (
        <span
            className="inline-flex"
            dangerouslySetInnerHTML={{
                __html: svg,
            }}
        />
    )
}