import React, { useState, useEffect, useRef } from 'react';
import fetch from '../../fetch';
import Filter from '../../components/filter/filter';
import Changes from '../../ChangePool';
import Game from '../../components/game/game';

function Home() {
    const { PegarPokemonAleatorio } = fetch
    const { BuscarPokemon } = fetch
    const [lista, setLista] = useState([])
    const { PegarNomesPokemon } = fetch

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
            console.log(atualizado)
            setNomesGame(atualizado)
            setGame(true)
            console.log(gens)
        }
        else {
            setGame(false)
        }
    }, [gens])

    const closeGame = () => {
        setGame(false)
    }
    return (
        <>
            <h1>TESTE</h1>
            {!game && <Filter Apply={Apply} />}
            {/* {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    
                    <img src={image} ref={imageRef} />
                    <button onClick={DarkenImage}>APAGAR</button>
                    <button onClick={LightenImage}>ACENDER</button>
                </>
            )} */}
            {game ? (
                <>
                    <Game nomes={nomesGame} />
                    <button onClick={closeGame}>Fechar</button>
                </>
            ) : (
                <h1>Lets play bro</h1>
            )}
        </>
    )
}

export default Home