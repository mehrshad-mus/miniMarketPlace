"use client"
import { useState } from "react";

type NavButtonProps = {
    options: {
        title: string,
        fn: () => void
    }[]
};



export const NavButton = (props: NavButtonProps) => {

    const [selected, setSelected] = useState(props.options[0].title);

    return (
        <div className="pt-5 mb-5">
            <div className="flex items-center justify-start gap-1">

                <div className="flex justify-center items-center gap-1 ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <span>  مرتب سازی براساس : </span>
                </div>

                {props.options.map((opt) => (
                    <label
                        key={opt.title}
                        className={`
                                    flex items-center px-3 h-8 justify-center  rounded-lg text-sm cursor-pointer
                                    transition
                                    ${selected === opt.title
                                ? "bg-black text-white border-black"
                                : "bg-white text-black border-gray-300 hover:text-blue-600"}
                                    `}>
                        <input
                            type="radio"
                            name="changeResults"
                            value={opt.title}
                            checked={selected === opt.title}
                            onChange={() => {
                                setSelected(opt.title)
                                opt.fn()
                            }}
                            className="sr-only"  // hides it visually
                        />
                        <span>{opt.title}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
export default NavButton