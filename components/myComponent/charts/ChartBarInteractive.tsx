"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartConfig = {
    users: {
        label: "تعداد کاربران",
        color: "var(--chart-2)",
    },
};



export default function ChartBarInteractive({ data }: { data: { date: string, users: number }[] }) {

    
    return (
        <Card className="py-0 w-60 gap-0 transition-shadow duration-300 shadow-2xs shadow-[#118ab2] hover:shadow-[0_0_20px_#118ab2]">
            <CardHeader className="flex flex-col items-stretch p-0! sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
                    <CardTitle className=" mt-4 text-[#118ab2]">تعداد کاربران</CardTitle>
                    <CardDescription className="mb-4 text-xs">
                        همه کاربران در یک سال گذشته
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-40 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) =>
                                new Date(`${value}-01`).toLocaleDateString("fa", {
                                    month: "short",
                                    year: "2-digit",
                                })
                            }
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-37.5"
                                    nameKey="users"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("fa", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={"users"} fill={`#118ab2`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}