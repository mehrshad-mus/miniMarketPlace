"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-30", magazine: 454, store: 380 },
    { date: "2024-05-01", magazine: 165, store: 220 },
    { date: "2024-05-02", magazine: 293, store: 310 },
    { date: "2024-05-03", magazine: 247, store: 190 },
    { date: "2024-05-04", magazine: 385, store: 420 },
    { date: "2024-05-05", magazine: 481, store: 390 },
    { date: "2024-05-06", magazine: 498, store: 520 },
    { date: "2024-05-07", magazine: 388, store: 300 },
    { date: "2024-05-31", magazine: 178, store: 230 },
    { date: "2024-06-01", magazine: 178, store: 200 },
    { date: "2024-06-02", magazine: 470, store: 410 },
    { date: "2024-06-03", magazine: 103, store: 160 },
    { date: "2024-06-04", magazine: 439, store: 380 },
    { date: "2024-06-05", magazine: 88, store: 140 },
    { date: "2024-06-06", magazine: 294, store: 250 },
    { date: "2024-06-07", magazine: 323, store: 370 },
    { date: "2024-06-08", magazine: 385, store: 320 },
    { date: "2024-06-09", magazine: 438, store: 480 },
    { date: "2024-06-10", magazine: 155, store: 200 },
    { date: "2024-06-11", magazine: 92, store: 150 },
    { date: "2024-06-12", magazine: 492, store: 420 },
    { date: "2024-06-13", magazine: 81, store: 130 },
    { date: "2024-06-14", magazine: 426, store: 380 },
    { date: "2024-06-15", magazine: 307, store: 350 },
    { date: "2024-06-16", magazine: 371, store: 310 },
    { date: "2024-06-17", magazine: 475, store: 520 },
    { date: "2024-06-18", magazine: 107, store: 170 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    magazine: {
        label: "مجله",
        color: "var(--chart-1)",
    },
    store: {
        label: "فروشگاه",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0 w-2/3 transition-shadow duration-300 shadow-2xs hover:shadow-[5px_-7px_20px_#f26d6d,0_7px_20px_#008000]">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-[#008000]">بازدید ها</CardTitle>
                    <CardDescription className="text-xs">
                        نمایش بازدید های 3 ماه گذشته
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-62.5 w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#f26d6d"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#f26d6d"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#008000"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#008000"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("fa", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("fa", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="store"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="#004b23"
                            stackId="a"
                        />
                        <Area
                            dataKey="magazine"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="#fc0303"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
