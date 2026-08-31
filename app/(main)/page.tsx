import Image from "next/image";
import AutoSlider from "@/components/myComponent/mainPage/main/autoSliders/AutoSlider";
import Advertisement from "@/components/myComponent/mainPage/main/advertisement/Advertisement";
import Category from "@/components/myComponent/mainPage/main/CategorySection/Category";
export default async function Home() {

    return (

        <div className="bg-gray-100 dark:bg-gray-800">


            <main className="pt-52" dir="rtl">
                <div className="flex justify-start items-center gap-5 px-12 ">

                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>
                    <div>
                        <div className="border-3 border-red-600 rounded-full w-20 h-20 shadow-[0_0_10px_#dc2626]"></div>
                        <p className="w-20 truncate dark:text-gray-200">استوری اول برای امتحان</p>
                    </div>

                </div>

                <div className="flex justify-center items-center mt-8 w-full">
                    <Advertisement />
                </div>
            </main>

            <div className="mt-10">
                <AutoSlider />
            </div>

            <>    
                <Category/>     
            </>

            <div className="h-300">

            </div>

        </div>
    )
}
