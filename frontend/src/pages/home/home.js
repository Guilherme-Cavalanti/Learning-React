import React, { useState, useEffect, useRef, useContext } from 'react';
import fetch from '../../fetch';
import Filter from '../../components/filter/filter';
import Changes from '../../ChangePool';
import Game from '../../components/game/game';
import Button from 'react-bootstrap/Button'
import { GameContext } from '../../Context/GameContext';

function Home() {
    const { PegarPokemonAleatorio } = fetch
    const { BuscarPokemon } = fetch
    const [lista, setLista] = useState([])
    const { PegarNomesPokemon } = fetch

    const {currentState, ResetGame} = useContext(GameContext)

    const {ChangePool} = Changes
    const {ArrumarArray} = Changes

    const [game, setGame] = useState(false)
    const [nomesGame, setNomesGame] = useState(["mew"])
    useEffect(() => {
        const SelecionarPokemon = async () => {
            let res = await PegarNomesPokemon()
            setLista(res)
        }
        SelecionarPokemon()
    }, []);

    const [gens, setGens] = useState({})

    const Apply = (Gens) => {
        setGens(Gens)
    }

    const checkGens = (gens) => {
        if (
            gens["gen1"] === false &&
            gens["gen2"] === false &&
            gens["gen3"] === false &&
            gens["gen4"] === false &&
            gens["gen5"] === false
        ) {
            return false
        }
        else if (gens["gen1"] == undefined) {
            setGame(false)
            return false
        }
        else {
            return true
        }
    }


    useEffect(() => {
        if (checkGens(gens) === true) {
            let atualizado = ChangePool(gens, lista)
            atualizado = ArrumarArray(atualizado)
            setNomesGame(atualizado)
            setGame(true)
            console.log("estado",currentState)
        }
        else {
            setGame(false)
        }
    }, [gens])

    const closeGame = () => {
        setGame(false)
        ResetGame()
    }
    return (
        <>
            <h1>TESTE</h1>
            {!game && <Filter Apply={Apply} />}
            {game ? (
                <>
                    <Game nomes={nomesGame} />
                    {currentState === "" && <Button  variant="info" onClick={closeGame}>Close</Button>}
                    {(currentState === "win" || currentState === "lose") && <Button onClick={closeGame} className='mt-3'>New Game</Button>}
                </>
            ) : (
                <h1>Press apply when ready</h1>
            )}
        </>
    )
}

export default Home