import React, { useState, useEffect, useRef, useContext } from 'react';
import fetch from '../../fetch';
import InputPokemon from '../input/input';
import { GameContext } from '../../Context/GameContext'
import ImageDisplay from '../imageDisplay/imageDisplay';

function Game(props) {
    const { PegarPokemonAleatorio } = fetch
    const { BuscarPokemon } = fetch

    const { Wrong, WinGame, StartGame, currentState, NewRound, round, LoseGame } = useContext(GameContext)
    const [loading, setLoading] = useState(false)
    const [PokeName, setPokeName] = useState('')
    const [pokemonData, setPokemonData] = useState('')
    const [guess, setGuess] = useState("")

    const [firstGuess, setFirstGuess] = useState("")
    const [secondGuess, setSecondGuess] = useState("")
    const [thirdGuess, setThirdGuess] = useState("")

    useEffect(() => {
        
    }, [])

    const SearchPoke = async (p) => {
        const data = await BuscarPokemon(p)
        console.log("poke:", data.name)
        setPokemonData(data)
    }
    useEffect(() => {
        const SelecionarPokemon = async () => {
            setLoading(true)
            let p = PegarPokemonAleatorio(props.nomes)
            setPokeName(p)
            await SearchPoke(p)
            setLoading(false)
            await NewRound()
            StartGame()
        }
        SelecionarPokemon()
    }, []);

    const Guess = (guess) => {
        setGuess(guess)
    }

    const fillGuess = () => {
        switch(round){
            case(1):
            setFirstGuess(guess)
            break;
            case(2):
            setSecondGuess(guess)
            break;
            case(3):
            setThirdGuess(guess)
            break;
        }
    }

    useEffect(() => {
        if (guess !== "") {
            if (guess == PokeName) {
                console.log("Correct :)")
                fillGuess()
                WinGame()

            }
            else {
                console.log("Wrong :(")
                console.log(guess)
                fillGuess()
                Wrong()
                setGuess('')
            }
        }
    }, [guess])
    useEffect(()=> {
        console.log('state mudado', currentState)
    },[currentState])

    useEffect(() => {
        if (round == 4) {
            LoseGame()
        }
    }, [round])
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <ImageDisplay data={pokemonData} />
                    <br />
                    <div style={{border:"1 px solid black"}}><span>{firstGuess}</span> </div>
                    <div style={{border:"1 px solid black"}}><span>{secondGuess}</span> </div>
                    <div style={{border:"1 px solid black"}}><span>{thirdGuess}</span> </div>

                    {currentState === "" ? (
                        <>
                            <InputPokemon names={props.nomes} GuessFunc={Guess} />
                        </>
                    ) : (
                        currentState == "win" ? (
                            <h1>Você Acertou! O Pokemon Era {PokeName}</h1>
                        ) : (
                            <h1>Você Perdeu! O Pokemon Era {PokeName}</h1>
                        )
                    )}
                    
                </>
            )}
        </>
    )
}

export default Game