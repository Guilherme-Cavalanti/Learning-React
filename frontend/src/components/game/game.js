import React, { useState, useEffect, useRef, useContext } from 'react';
import fetch from '../../fetch';
import InputPokemon from '../input/input';
import { GameContext } from '../../Context/GameContext'

function Game(props) {
    const { PegarPokemonAleatorio } = fetch
    const { BuscarPokemon } = fetch

    const { Wrong, WinGame, StartGame, currentState, NewRound, round, LoseGame } = useContext(GameContext)
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [PokeName, setPokeName] = useState('')
    const [pokemonData, setPokemonData] = useState('')
    const [guess, setGuess] = useState("")
    const imageRef = useRef(null);

    const [firstGuess, setFirstGuess] = useState("")
    const [secondGuess, setSecondGuess] = useState("")
    const [thirdGuess, setThirdGuess] = useState("")

    useEffect(() => {
        
    }, [])

    const ChangeImage = async (p) => {
        const data = await BuscarPokemon(p)
        console.log("poke:", data.name)
        setPokemonData(data)
        setImage(data["sprites"]["front_default"])
    }

    const DarkenImage = () => {
        if (imageRef.current) {
            imageRef.current.style.filter = 'brightness(0)';
        }
    }

    const LightenImage = () => {
        if (imageRef.current) {
            imageRef.current.style.filter = "none"
        }
    }

    useEffect(() => {
        const SelecionarPokemon = async () => {
            setLoading(true)
            let p = PegarPokemonAleatorio(props.nomes)
            setPokeName(p)
            await ChangeImage(p)
            setLoading(false)
            await NewRound()
            StartGame()
        }
        SelecionarPokemon()
    }, []);

    useEffect(() => {
        if (image !== "") {
            DarkenImage()
        }
    }, [imageRef.current])

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
                LightenImage()
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
            LightenImage()
        }
    }, [round])
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>

                    <img src={image} ref={imageRef} />
                    {/* <button onClick={DarkenImage}>APAGAR</button>
                    <button onClick={LightenImage}>ACENDER</button> */}
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