"use client"

import { useState } from "react"
import { Button } from "~/shared/ui/button"
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const WIN_COMBINATIONS: [number, number, number][] = [[0, 1, 2], [0, 3, 6], [1, 4, 7], [3, 4, 5], [6, 7, 8], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

export default function GamePage() {
    const router = useRouter()
    const [playerWon, setPlayerWon] = useState(false)
    const [botWon, setBotWon] = useState(false)
    const [message, setMessage] = useState("")
    const [array, setArray] = useState<string[][]>(
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    )

    const updateRating = api.user.updateRating.useMutation();

    const handleReset = () => {
        setArray([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]])
        setBotWon(false)
        setPlayerWon(false)
        setMessage("")
    }

    const checkWin = (flatArray: string[], player: string) => {
        return WIN_COMBINATIONS.some(combination =>
            combination.every(index => flatArray[index] === player)
        )
    }

    const handleComputerMove = (flatArray: string[]): number => {
        for (const combo of WIN_COMBINATIONS) {
            const [a, b, c] = combo
            const values = [flatArray[a], flatArray[b], flatArray[c]]
            const emptyIndex = combo[values.indexOf("")]
            if (values.filter(v => v === "O").length === 2 && values.includes("")) {
                return emptyIndex!
            }
        }

        for (const combo of WIN_COMBINATIONS) {
            const [a, b, c] = combo
            const values = [flatArray[a], flatArray[b], flatArray[c]]
            const emptyIndex = combo[values.indexOf("")]
            if (values.filter(v => v === "X").length === 2 && values.includes("")) {
                return emptyIndex!
            }
        }

        const emptyCells = flatArray
            .map((cell, index) => (cell === "" ? index : -1))
            .filter(index => index !== -1)
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]!
    }

    const handleGame = (row: number, col: number) => {
        const newArray = array.map((r) => [...r])
        if (!newArray[row]) return
        if (newArray[row][col] !== "") return

        newArray[row][col] = "X"
        setArray(newArray)

        const flatAfterPlayer = newArray.flat()

        if (checkWin(flatAfterPlayer, "X")) {
            setPlayerWon(true)
            setMessage("You win!")
            updateRating.mutate({ delta: +5 });
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
            });
            return
        }

        if (flatAfterPlayer.every(cell => cell !== "")) {
            setMessage("Break!")
            return
        }

        setTimeout(() => {
            const botMove = handleComputerMove(flatAfterPlayer)
            const boardWithBot = flatAfterPlayer.map((cell, index) =>
                index === botMove ? "O" : cell
            )

            const newBoard: string[][] = [
                boardWithBot.slice(0, 3),
                boardWithBot.slice(3, 6),
                boardWithBot.slice(6, 9)
            ]
            setArray(newBoard)

            if (checkWin(boardWithBot, "O")) {
                setBotWon(true)
                setMessage("Bot win!")
                updateRating.mutate({ delta: -5 });
            } else if (boardWithBot.every(cell => cell !== "")) {
                setMessage("Break!")
            }
        }, 500)
    }

    return (
        <main className="flex flex-col items-center justify-center gap-4 mt-10">
            {array.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((cell, colIndex) => (
                        <Button
                            key={colIndex}
                            variant="outline"
                            className="w-22 h-22 text-2xl"
                            disabled={botWon || playerWon || cell !== ""}
                            onClick={() => handleGame(rowIndex, colIndex)}
                        >
                            {cell}
                        </Button>

                    ))
                    }
                </div>
            ))}
            <div className="mt-4 text-xl">{message}</div>
            <Button onClick={() => router.push("/")}>
                Return to main page
            </Button>
            <Button className="hover:bg-gray-600" onClick={handleReset}>
                Reset
            </Button>
        </main >
    )
}