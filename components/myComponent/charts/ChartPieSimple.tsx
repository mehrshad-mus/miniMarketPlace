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

export const description = "A simple pie chart"

const chartData = [
    { transaction: "موفق", count: 275, fill: "#70e000" },
    { transaction: "ناموفق", count: 300, fill: "#c1121f" },
    { transaction: "در انتظار", count: 187, fill: "#ffb703" },
]

const chartConfig = {

}

export function ChartPieSimple() {
    return (
        <Card className="flex flex-col w-60 p-0 pt-2 gap-0">

            <CardHeader className="items-center pb-0  ">
                <CardTitle className="text-[#c1121f] pt-2">تراکنش ها</CardTitle>
                <CardDescription className="text-xs">تراکنش ها در 3 ماه اخیر</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0 ">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="count" nameKey="transaction" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
