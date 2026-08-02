import { ChartLineDefault } from "@/components/myComponent/charts/LineChart"
import { ChartPieDonut } from "@/components/myComponent/charts/ChartPieDonut"
import { ChartPieSimple } from "@/components/myComponent/charts/ChartPieSimple"
import { ChartLineLinear } from "@/components/myComponent/charts/ChartLineLinear"
import ChartBarInteractive from "@/components/myComponent/charts/ChartBarInteractive"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ChartRadialGrid from "@/components/myComponent/charts/ChartRadialGrid"
import ChartAreaInteractive from "@/components/myComponent/charts/ChartAreaInteractive"
import { DashboardMainData } from "@/components/myComponent/DashboardMainData"
import { BankCart } from "@/components/myComponent/BankCart"
import { getSellerProductRequestCount, getSellerRequestCount } from "@/lib/actions/getCounts"


export default async function DashboardPage() {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you havent acces")
    }

    const user = await prisma.user.findUnique({ where: { id: currentUser.userId } })

    if (!user) {
        throw new Error("you havent acces")
    }

    const usersPerMonth = await prisma.$queryRaw<
        { year: number; month: number; total_users: bigint }[]
    >`
SELECT
  EXTRACT(YEAR FROM "createdAt") AS year,
  EXTRACT(MONTH FROM "createdAt") AS month,
  SUM(COUNT(*)) OVER (
    ORDER BY
      EXTRACT(YEAR FROM "createdAt"),
      EXTRACT(MONTH FROM "createdAt")
  ) AS total_users
FROM "User"
WHERE "createdAt" >= NOW() - INTERVAL '12 months'
GROUP BY
  EXTRACT(YEAR FROM "createdAt"),
  EXTRACT(MONTH FROM "createdAt")
ORDER BY
  year,
  month;
`;

    const chartData = usersPerMonth.map((item) => ({
        date: `${item.year}-${String(item.month).padStart(2, "0")}`,
        users: Number(item.total_users),
    }));

    
    let productRequestSellerCount;
    if (user.role === "SELLER") {
        const seller = await prisma.seller.findUnique({ where: { userId: currentUser.userId } })
        productRequestSellerCount = await prisma.productRequest.count({ where: { sellerId: seller?.id } })
    }
    
    const productRequestCount = await getSellerProductRequestCount(true)

    const sellerRequest = await getSellerRequestCount(true)

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">پیشخوان</div>

            <div className="bg-white rounded-xl p-4 mb-14 flex justify-center items-center flex-col gap-15">

                <div className={`flex justify-center p-3 items-start w-full ${user?.role === "ADMIN" ? "gap-19" : "gap-7"}`}>

                    <DashboardMainData
                        user={user}
                        productRequestCount={productRequestCount.count}
                        productRequestSellerCount={productRequestSellerCount}
                        sellerRequest={sellerRequest.count}
                    />

                    {user.role === "ADMIN" && <ChartPieSimple />}

                    <BankCart user={user} />
                </div>

                {user.role === "ADMIN" &&
                    <div className="flex justify-center gap-10 w-full">
                        <ChartBarInteractive data={chartData} />
                        <ChartLineLinear />

                        <ChartLineDefault />

                        <ChartPieDonut />
                    </div>
                }

                {(user.role === "ADMIN" || user.role === "SELLER") && <div className="flex justify-center gap-7 w-full px-5">
                    <ChartAreaInteractive />

                    <ChartRadialGrid />

                </div>}

            </div>

        </div>

    )
}
