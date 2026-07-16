"use client"

import { useState } from "react"
import { Input } from "~/shared/ui/input"
import { Button } from "~/shared/ui/button"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export default function GamePage() {
    const router = useRouter()
    const [randomNum, setRandomNum] = useState(() => Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111)
    const [inputValue, setInputValue] = useState("")
    const [attempt, setAttempt] = useState(5)
    const [won, setWon] = useState(false)
    const [mainMessage, setMainMessage] = useState("")
    const [guessMessage, setGuessMessage] = useState("")
    const [numberArray, setNumberArray] = useState<string[]>(["?", "?", "?", "?"])

    const updateRating = api.user.updateRating.useMutation();

    const handleGuess = () => {
        const array: string[] = [...numberArray]
        const randomNumStr = randomNum.toString()
        let guessNumStr = inputValue.toString();
        const value = parseInt(inputValue, 10)

        if (isNaN(value) || inputValue.length !== 4) {
            setMainMessage("Invalid value or not a number.")
            return
        }

        for (let i = 0; i < randomNumStr.length; i++) {
            if (randomNumStr[i] === guessNumStr[i]) {
                array[i] = randomNumStr[i]!
            }
        }
        setAttempt(prev => prev - 1)
        setMainMessage(`${attempt - 1} attempts left.`)
        setNumberArray(array)
        setGuessMessage(array.join(""))

        if (!array.includes("?")) {
            setWon(true)
            setMainMessage("You win! Congrats!")
            updateRating.mutate({ delta: attempt * 5 });
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
            });
            return
        }

        if (attempt <= 1 && array.includes("?")) {
            setWon(false)
            setMainMessage(`You lose. Your number: ${randomNum}`)
            return
        }
    }

    return (
        <main className="flex pt-40 flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Guess the number (1111–9999)</h1>
            <div className="flex gap-2">
                <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Your guess"
                    disabled={won}
                    onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                />
                <Button onClick={handleGuess} disabled={won || attempt === 0}>
                    Confirm
                </Button>
            </div>
            {mainMessage && <p className="text-lg">{mainMessage}</p>}
            {guessMessage && <p className="text-lg">{guessMessage}</p>}
            <Button onClick={() => router.push("/")}>
                Return to games
            </Button>
        </main>
    )
}