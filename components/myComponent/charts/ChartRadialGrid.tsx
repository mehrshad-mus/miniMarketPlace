"use client"

import { TrendingUp } from "lucide-react"
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart with a grid"

const chartData = [
    { os: "linux", visitors: 173, fill: "#FCC624" },
    { os: "android", visitors: 275, fill: "#3DDC84" },
    { os: "iphone", visitors: 200, fill: "#adb5bd" },
    { os: "windows", visitors: 187, fill: "#0078D4" },
    { os: "mac", visitors: 90, fill: "#6c757d" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    android: {
        label: "Android",
        color: "#d60f0f",
    },
    iphone: {
        label: "Iphone",
        color: "var(#d60f0f)",
    },
    windows: {
        label: "Windows",
        color: "var(--chart-3)",
    },
    linux: {
        label: "Linux",
        color: "var(--chart-4)",
    },
    mac: {
        label: "Mac",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export default function ChartRadialGrid() {
    return (
        <Card className="flex flex-col w-1/3 transition-shadow duration-300 shadow-2xs hover:shadow-[0_0_20px_#6c757d] shadow-[#6c757d]">
            <CardHeader className="items-center pb-0 ">
                <CardTitle className="text-[#6c757d]">سیستم عامل کاربران</CardTitle>
                <CardDescription className="text-xs">مشاهده در سه ماه اخیر</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 items-center justify-center p-0 pt-5">
                
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <RadialBarChart data={chartData} innerRadius={30} outerRadius={120}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="os" />}
                        />
                        <PolarGrid gridType="circle" />
                        <RadialBar dataKey="visitors" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
