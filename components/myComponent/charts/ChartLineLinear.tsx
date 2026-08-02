"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A linear line chart"

const chartData = [
    { month: "فروردین", desktop: 186 },
    { month: "اردیبهشت", desktop: 305 },
    { month: "خرداد", desktop: 237 },
    { month: "تیر", desktop: 73 },
    { month: "مرداد", desktop: 209 },
    { month: "شهریور", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: " فروشندگان",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineLinear() {
    return (
        <Card className="w-60 transition-shadow duration-300 shadow-2xs shadow-[#fb8500] hover:shadow-[0_0_20px_#118ab2]">
            <CardHeader>
                <CardTitle className="text-[#fb8500]">فروشندگان</CardTitle>
                <CardDescription className="text-xs"> افزایش فروشنده ها  <TrendingUp className="h-4 w-4" /></CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="linear"
                            stroke="#fb8500"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
