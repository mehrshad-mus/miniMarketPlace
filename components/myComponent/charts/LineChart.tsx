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

export const description = "A line chart"

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
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineDefault() {
    return (
        <Card className="w-60 p-0 pt-5 gap-8 flex flex-col transition-shadow duration-300 shadow-2xs shadow-[#358f80] hover:shadow-[0_0_20px_#118ab2]">
            <CardHeader>
                <CardTitle className="text-[#358f80]">محصولات منتشر شده</CardTitle>
                <CardDescription className="text-xs"> محصولات منتشر شده در یک سال گذشته</CardDescription>
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
                            type="natural"
                            stroke="#358f80"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
