"use client"
import { extraQueryis, product } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { NextButton, PrevButton, usePrevNextButtons } from './sliderSetting/EmblaCarouselArrowButtons'
import Product from './Product'
import { useAutoScroll } from './sliderSetting/EmblaCarouselAutoScroll'
import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from "embla-carousel-auto-scroll"

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

type AutoSliderType = {
    qKey: string[],
    qFunNumber: number
}

const AutoSlider = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => extraQueryis.getTenProductForAutoSlider()
    })


    let content;

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

    
    if (data) {
        content = <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {data?.map((item) => {

                        let minDiscount = 100;
                        let maxDiscount = 0;

                        for(const vari of item.productVariant){
                            for(const off of vari.offer){
                                if(off.discount >= maxDiscount){
                                    maxDiscount = off.discount
                                }
                                if(off.discount <= minDiscount){
                                    minDiscount = off.discount
                                }
                            }
                        }

                        
                        return (
                            <div className="embla__slide" key={item.id}>
                                <Product
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    images={item.productImage[0]?.url}                               
                                    minDiscount ={minDiscount}
                                    maxDiscount ={maxDiscount}/>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={() => onAutoScrollButtonClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={() => onAutoScrollButtonClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <button
                    className="embla__play"
                    onClick={toggleAutoScroll}
                    type="button"
                >
                    {autoScrollIsPlaying ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    }

    if (isLoading) {
        content = <p>Is Loading ...</p>
    }

    return (
        <>
            {content}
        </>
    )
}

export default AutoSlider