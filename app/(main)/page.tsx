import AutoSlider from "@/components/myComponent/mainPage/main/autoSliders/AutoSlider";
import Advertisement from "@/components/myComponent/mainPage/main/advertisement/Advertisement";
import Category from "@/components/myComponent/mainPage/main/CategorySection/Category";
import AdvertisementSection from "@/components/myComponent/mainPage/main/CategorySection/AdvertisementSection";
import StoryStrip from "@/components/myComponent/mainPage/main/Story/StoryStrip";
import { getCurrentUser } from "@/lib/auth";
import { getActiveStories } from "@/services/story/story.service";
export default async function Home() {
    const currentUser = await getCurrentUser();
    const stories = await getActiveStories(currentUser?.userId);

    return (

        <div className="bg-gray-100 dark:bg-gray-800">


            <main className="pt-52" dir="rtl">
                <StoryStrip initialStories={stories} />

                <div className="flex justify-center items-center mt-8 w-full">
                    <Advertisement />
                </div>
            </main>

            <div className="mt-10">
                <AutoSlider />
            </div>

            <>    
                <Category/>     
                <AdvertisementSection />
            </>

            <div className="h-300">

            </div>

        </div>
    )
}
