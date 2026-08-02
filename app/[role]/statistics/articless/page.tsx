import Table from "@/components/myComponent/MyTable";
import NavButton from "@/components/myComponent/NavButton";
import { Button } from "@/components/ui/button";

interface MyDataItem {
    lastUpdate: string;
    view: number;
    title: string;
    picture: string;
}

const data: MyDataItem[] = [
    {
        lastUpdate: "22:39 - 1404/12/24",
        view: 12,
        title: "smartphone",
        picture: "picture"
    },
    {
        lastUpdate: "22:39 - 1404/12/24",
        view: 20,
        title: "smartphone2",
        picture: "picture2"
    }
]

const columns = [
    {
        key: "lastUpdate",
        title: "آخرین بروزرسانی",
        rowWidth: "w-2/15"
    },
    {
        key: "view",
        title: "بازدید",
        rowWidth: "w-1/11"
    },
    {
        key: "title",
        title: "عنوان",
        rowWidth: "w-1398/1980"
    },
    {
        key: "picture",
        title: "تصویر",
        rowWidth: "w-1/12"
    },
]

const typedColumns: Array<{ key: keyof MyDataItem; title: string; rowWidth: string }> =
    columns as Array<{ key: keyof MyDataItem; title: string; rowWidth: string }>;

export const Article = () => {
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl text-end mb-6">آمار مقالات</div>

            <div className="bg-white rounded-xl p-6 mb-15">
                <div className="text-end font-bold border-b mb-2 pb-5">20 مقاله پربازدید</div>

                <NavButton title1={"همه"} title2={"امروز"} title3={"هفته"} title4={"ماه"}/>
                <Table data={data} columns={typedColumns} />
            </div>
        </div>

    )
}
export default Article