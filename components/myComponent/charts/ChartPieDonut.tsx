"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

const chartData = [
    { month: "فروردین", desktop: 186, fill: "#03045e" },
    { month: "اردیبهشت", desktop: 305, fill: "#0077b6" },
    { month: "خرداد", desktop: 237, fill: "#00b4d8" },
    { month: "تیر", desktop: 73, fill: "#90e0ef" },
    { month: "مرداد", desktop: 209, fill: "#caf0f8" },
]


export const description = "A donut chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartPieDonut() {
    return (
        <Card className="flex flex-col p-0 pt-5 gap-0 w-70 transition-shadow duration-300 shadow-2xs shadow-[#03045e] hover:shadow-[0_0_20px_#03045e]">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-[#03045e]">مقالات متتشر شده</CardTitle>
                <CardDescription className="text-xs"> مقالات منتشر شئده در یک سال گذشته</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="desktop"
                            nameKey="month"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
