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
import HintsDisplay from '../HintsDisplay/hintsdisplay';
import Collapse from "react-bootstrap/Collapse"
import Alert from "react-bootstrap/Alert"
import InfoDisplay from '../infoDisplay.js/infodisplay';


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

    const [openEnd, setOpenEnd] = useState(false)

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
                fillGuess()
                Wrong()
                setGuess('')
            }
        }
    }, [guess])
    useEffect(() => {
        if (currentState === "win" || currentState === "lose") setOpenEnd(true)
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
                    <Container style={{ "width": "20%", "minWidth": "522px" }}>
                        <Row style={{ "width": "100%", minWidth: "522px" }}>
                            <Col style={{ "width": "50%", "minWidth": "261px" }}>
                                <ImageDisplay data={pokemonData} />
                            </Col>
                            <Col style={{ "width": "50%", "minWidth": "261px" }}>
                                {currentState === "" ? (
                                    <HintsDisplay data={pokemonData} />
                                ) : (
                                    <InfoDisplay data={pokemonData} />
                                )}
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <Container style={{ width: "10%", "minWidth": "313px", "padding": "0%" }} className="mb-3">
                        <Form className='mb-3'>
                            <Form.Control type="text" placeholder={firstGuess} readOnly className='Guesses' disabled />
                            <Form.Control type="text" placeholder={secondGuess} readOnly className='Guesses' disabled />
                            <Form.Control type="text" placeholder={thirdGuess} readOnly className='Guesses' disabled />
                        </Form>
                        {currentState === "" ? (
                            <>
                                <InputPokemon names={props.nomes} GuessFunc={Guess} />
                            </>
                        ) : (
                            <Collapse in={openEnd} dimension="width" className='mb-3'>
                                <div style={{ "maxHeight": "58px" }} className='mb-3'>
                                    {currentState == "win" ? (
                                        <Alert variant='success'>You got it! The pokemon was {PokeName}</Alert>
                                    ) : (
                                        <Alert variant='danger'>You missed it! The pokemon was {PokeName}</Alert>
                                    )}
                                </div>
                            </Collapse>
                        )}
                    </Container>
                </>
            )
            }
        </>
    )
}

export default Game