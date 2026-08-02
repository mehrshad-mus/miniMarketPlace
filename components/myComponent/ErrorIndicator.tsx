import React from 'react'


const ErrorIndicator = ({flag } : {flag?: boolean}) => {
    return (
        <div className="relative flex items-center justify-center">
            <div className={`absolute ${flag ? "h-1.75 w-1.75": "h-2.5 w-2.5"} opacity-40 rounded-full bg-red-500 animate-ping`} />
            <div className={`${flag ? "h-1.25 w-1.25": "h-2 w-2"} rounded-full bg-red-600`} />
        </div>
    )
}

export default ErrorIndicator