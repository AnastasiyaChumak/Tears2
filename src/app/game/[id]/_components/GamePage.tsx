"use client"

import { useState } from "react"
import { Input } from "~/shared/ui/input"
import { Button } from "~/shared/ui/button"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export default function GamePage() {
    const router = useRouter()
    const [randomNum, setRandomNum] = useState(() => Math.floor(Math.random() * 100) + 1)
    const [inputValue, setInputValue] = useState("")
    const [message, setMessage] = useState("")
    const [won, setWon] = useState(false)
    const [attempt, setAttempt] = useState(5)

    const updateRating = api.user.updateRating.useMutation();

    const handleReset = () => {
        setRandomNum(Math.floor(Math.random() * 100) + 1)
        setInputValue("")
        setMessage("")
        setWon(false)
        setAttempt(5)
    }

    const handleGuess = () => {
        const guess = parseInt(inputValue, 10)
        if (isNaN(guess)) {
            setMessage("Enter a valid number")
            return
        }
        if (guess === randomNum) {
            setWon(true);
            setMessage("Congrat! You won!")
            updateRating.mutate({ delta: attempt * 5 });
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
            });
        } else if (attempt <= 1) {
            setMessage("Game over! You lose!" + ` Correct number: ${randomNum}`)
            setWon(false)
            updateRating.mutate({ delta: -5 });
        } else {
            setAttempt(prev => prev - 1)
            setMessage(`${guess < randomNum ? "Too low" : "Too high"}! ${attempt - 1} attempts left.`)
        }
        setInputValue("")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Guess the number (1–100)</h1>
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
            {message && <p className="text-lg">{message}</p>}
            <Button onClick={() => router.push("/")}>
                Back to games
            </Button>
            {(attempt < 5) && (
                <Button className="hover:bg-gray-600" onClick={handleReset}>
                    Reset
                </Button>
            )}
        </main>
    )
}
