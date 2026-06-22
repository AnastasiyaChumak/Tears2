"use client"

import { useState } from "react"
import { Input } from "~/shared/ui/input"
import { Button } from "~/shared/ui/button"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const [randomNum, setRandomNum] = useState(() => Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111)
const [inputValue, setInputValue] = useState("")
const [attempt, setAttempt] = useState(5)
const [won, setWon] = useState(false)
const [message, setMessage] = useState("")
const numberArray = []

const handleGuess = () => {
    const str = randomNum.toString()
    const value = parseInt(inputValue, 10)
    if(isNaN(value)) {
        setMessage("Invalid value. Not a number.")
        return
    } 

    for (let i = 0; i < str.length; i++) {
        numberArray[i] = str[i];
        
    }
}