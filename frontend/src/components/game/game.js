import React, { useState, useEffect, useRef, useContext } from 'react';
import fetch from '../../fetch';
import InputPokemon from '../input/input';
import { GameContext } from '../../Context/GameContext'
import ImageDisplay from '../imageDisplay/imageDisplay';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form'
import './game.css'

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
        switch (round) {
            case (1):
                setFirstGuess(guess)
                break;
            case (2):
                setSecondGuess(guess)
                break;
            case (3):
                setThirdGuess(guess)
                break;
        }
    }

    useEffect(() => {
        if (guess !== "") {
            if (guess == PokeName) {
                fillGuess()
                WinGame()

            }
            else {
                console.log("errado:",guess)
                console.log("certo:",PokeName)
                fillGuess()
                Wrong()
                setGuess('')
            }
        }
    }, [guess])
    useEffect(() => {
        console.log('state mudado', currentState)
    }, [currentState])

    useEffect(() => {
        if (round == 4 && currentState !== null) {
            LoseGame()
        }
    }, [round])
    return (    
        <>        
            {loading ? (
                <Spinner animation='border' role="status">
                    {/* <span className='vissualy-hidden'>Loading...</span> */}
                </Spinner>
            ) : (
                <>
                    <ImageDisplay data={pokemonData} />
                    <br />
                    <Container style={{ width: "10%", "minWidth": "313px", "padding": "0%" }} className="mb-3">
                    <Form.Control type="text" placeholder={firstGuess} readOnly className='Guesses' disabled/>
                        <Form.Control type="text" placeholder={secondGuess} readOnly className='Guesses' disabled/>
                        <Form.Control type="text" placeholder={thirdGuess} readOnly className='Guesses' disabled/>

                        {currentState === "" ? (
                            <>
                                <InputPokemon names={props.nomes} GuessFunc={Guess} />
                            </>
                        ) : (
                            currentState == "win" ? (
                                <h7 style={{"fontWeight":"700"}}>Você Acertou! O Pokemon Era {PokeName}</h7>
                            ) : (
                                <h7>Você Perdeu! O Pokemon Era {PokeName}</h7>
                            )
                        )}
                    </Container>
                </>
            )}
        </>
    )
}

export default Game