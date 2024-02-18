import React from 'react'
import Button from './Button'
import { useStateContext } from '../contexts/ContextProvider'

export default function Card() {
    const {currentcolor} = useStateContext


    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-fit rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex flex-col justify-between items-center">
                <div>
                    <p className="font-bold text-gray-400" style={{textAlign : "center"}}>Most awaited Combo ! 🥳</p>
                    <p className="text-l" style={{color: "black", fontSize: "16px"}}>I will create the best combo there is for your restaurant with any product based on past sales</p>
                </div>
                <button
                    type="button"
                    style={{ backgroundColor: currentcolor }}
                    className="mt-4 border text-l opacity-0.9 text-black hover:drop-shadow-xl rounded-full  p-4"
                >
                    Click here to create one
                </button>
            </div>
        </div>
    )
}
