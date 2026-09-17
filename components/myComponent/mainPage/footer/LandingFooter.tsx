import {
    Globe2,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react"

const contactItems = [
    {
        label: "ایمیل",
        value: "mehrshadmasoumi66@gmail.com",
        href: "mailto:mehrshadmasoumi66@gmail.com",
        icon: Mail,
    },
    {
        label: "اینستاگرام",
        value: "@mehrshad-mus",
        href: "https://instagram.com/mehrshad-mus",
        icon: Instagram,
    },
    {
        label: "تلگرام",
        value: "@mehrshad-mus",
        href: "https://t.me/mehrshad-mus",
        icon: Send,
    },
    {
        label: "شماره تماس",
        value: "09924211342",
        href: "tel:09924211342",
        icon: Phone,
    },
    {
        label: "آدرس وب‌سایت",
        value: "mini-market-place-afb6.vercel.app",
        href: "https://mini-market-place-afb6.vercel.app/",
        icon: Globe2,
    },
] as const

export default function LandingFooter() {
    return (
        <footer
            id="contact-footer"
            dir="rtl"
            className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
        >
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
                <div className="flex flex-col justify-between gap-8 border-b border-slate-200 pb-10 dark:border-slate-800 md:flex-row md:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 text-red-600 dark:text-red-400">
                            <MapPin className="size-5" />
                            <span className="text-sm font-bold">با ما در ارتباط باشید</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                            هر سوالی دارید، کنار شما هستیم.
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                            برای ارتباط با تیم مینی‌مارکت‌پلیس از راه‌های زیر استفاده کنید.
                        </p>
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                        © {new Date().getFullYear()} Mini Marketplace
                    </p>
                </div>

                <div className="grid gap-3 pt-8 sm:grid-cols-2 lg:grid-cols-5">
                    {contactItems.map(({ label, value, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noreferrer" : undefined}
                            className="group rounded-2xl bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-900 dark:hover:bg-red-950/30"
                        >
                            <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm dark:bg-slate-800 dark:text-red-400">
                                <Icon className="size-5" />
                            </span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">{label}</span>
                            <span className="mt-1 block truncate text-sm font-bold text-slate-800 group-hover:text-red-600 dark:text-slate-100 dark:group-hover:text-red-400">
                                {value}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}
