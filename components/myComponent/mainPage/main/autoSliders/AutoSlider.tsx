"use client"
import { extraQueryis } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { NextButton, PrevButton, usePrevNextButtons } from './sliderSetting/EmblaCarouselArrowButtons'
import Product from './Product'
import { useAutoScroll } from './sliderSetting/EmblaCarouselAutoScroll'
import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from "embla-carousel-auto-scroll"
import { Pause, Play } from "lucide-react"

const AutoSlider = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["product4"],
        queryFn: () => extraQueryis.getTenProductForAutoSlider()
    })


    const options: EmblaOptionsType = { loop: true }
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll({speed : 0.5})])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const { autoScrollIsPlaying, toggleAutoScroll, onAutoScrollButtonClick } =
        useAutoScroll(emblaApi)

    if (isLoading) {
        return <p className="py-8 text-center text-neutral-500">در حال بارگذاری پیشنهادهای ویژه...</p>
    }

    if (error) {
        return <p className="py-8 text-center text-red-600">بارگذاری پیشنهادهای ویژه با خطا مواجه شد.</p>
    }

    if (!data?.length) {
        return null
    }

    return (
        <section className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6" dir="rtl">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-rose-700 via-red-600 to-rose-600 p-4 text-white shadow-lg sm:p-6 lg:p-8">
                <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
                    <div>
                        <p className="mb-1 text-xs font-medium text-rose-100 sm:text-sm">انتخاب‌های ویژه برای شما</p>
                        <h2 className="text-xl font-bold sm:text-2xl">پیشنهادهای ویژه</h2>
                    </div>
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"
                        onClick={toggleAutoScroll}
                        type="button"
                        aria-label={autoScrollIsPlaying ? "توقف حرکت خودکار" : "شروع حرکت خودکار"}
                        title={autoScrollIsPlaying ? "توقف حرکت خودکار" : "شروع حرکت خودکار"}
                    >
                        {autoScrollIsPlaying
                            ? <Pause className="h-5 w-5" aria-hidden="true" />
                            : <Play className="h-5 w-5" aria-hidden="true" />}
                    </button>
                </div>

                <div className="rounded-2xl bg-white p-2 text-neutral-900 sm:p-4">
                    <div className="embla">
                        <div className="relative">
                            <div className="embla__viewport" ref={emblaRef}>
                                <div className="embla__container">
                                    {data.map((item) => {
                                        let minDiscount = 100
                                        let maxDiscount = 0

                                        for (const variant of item.productVariant) {
                                            for (const offer of variant.offer) {
                                                if (offer.discount >= maxDiscount) {
                                                    maxDiscount = offer.discount
                                                }
                                                if (offer.discount <= minDiscount) {
                                                    minDiscount = offer.discount
                                                }
                                            }
                                        }

                                        return (
                                            <div className="embla__slide" key={item.id}>
                                                <Product
                                                    id={item.id}
                                                    title={item.title}
                                                    images={item.productImage[0]?.url}
                                                    minDiscount={minDiscount}
                                                    maxDiscount={maxDiscount}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="absolute left-1 top-1/2 z-10 -translate-y-1/2 sm:left-2">
                                <PrevButton
                                    onClick={() => onAutoScrollButtonClick(onPrevButtonClick)}
                                    disabled={prevBtnDisabled}
                                    aria-label="محصول قبلی"
                                />
                            </div>
                            <div className="absolute right-1 top-1/2 z-10 -translate-y-1/2 sm:right-2">
                                <NextButton
                                    onClick={() => onAutoScrollButtonClick(onNextButtonClick)}
                                    disabled={nextBtnDisabled}
                                    aria-label="محصول بعدی"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AutoSlider