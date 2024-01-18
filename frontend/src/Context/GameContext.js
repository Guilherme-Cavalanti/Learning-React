import { useState, createContext, useEffect  } from "react";

const GameContext = createContext()

const GameFunctions = ({children}) => {
    const [currentState, setCurrentState] = useState(null)
    const [round, setRound] = useState(1)

    const WinGame = () => {
        setCurrentState("win")
    }

    const LoseGame = () => {
        setCurrentState("lose")
    }

    const StartGame = () => {
        setCurrentState("")
    }

    const ResetGame = () => {
        setCurrentState(null)
    }

    const Wrong = () => {
        setRound(round+1)
    }   
    const NewRound = () => {
        setRound(1)
    }
    useEffect(()=> {
    },[round])
    return (
        <GameContext.Provider value={{round,Wrong, NewRound, WinGame, LoseGame, StartGame, currentState, ResetGame}}>
            {children}
        </GameContext.Provider>
    )
}  

export {
    GameContext,
    GameFunctions
}