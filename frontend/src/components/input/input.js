import { useState, useEffect, useContext } from "react"
import { GameContext } from "../../Context/GameContext"

function InputPokemon(props) {
    const [names, setNames] = useState([])
    const [pokemon, setPokemon] = useState("")
    const [textInput, setTextInput] = useState("")
    const [namesVisible, setNamesVisible] = useState(false)
    const { round, currentState } = useContext(GameContext)

    useEffect(() => {
        setNames(props.names)
    }, [])

    const changeInput = (event) => {
        event.preventDefault()
        setTextInput(event.target.value)
    }

    const choosePokemon = (event) => {
        let pokemon = names.filter(pokemon => pokemon === event.target.innerHTML)[0]
        console.log(pokemon)
        setPokemon(pokemon)
        setNamesVisible(false)
        setTextInput(pokemon)
    }

    useEffect(() => {
        setNamesVisible(textInput !== "")
    }, [textInput])

    useEffect(() => {
        if (round > 1) {
            setPokemon('')
            setTextInput('')
        }
    }, [round])

    const Guess = () => {
        if (textInput === pokemon) {
            props.GuessFunc(
                pokemon
            )
        }
        else console.log("must be a poke")
    }

    return (
        <div>
                    <input onChange={changeInput} placeholder="Type pokemon name" type="text" value={textInput}></input>
                    <div className="PokemonList" height="500px">
                        {namesVisible && textInput != pokemon && <ul>
                            {names.filter(pokemon => pokemon.toUpperCase().includes(textInput.toUpperCase())).map(pokemon =>
                                <li value={pokemon} onClick={choosePokemon}>{pokemon}</li>
                            )}
                        </ul>
                        }
                    </div>
                    <button className="guess" onClick={Guess}>Guess</button>
        </div>
    )
}

export default InputPokemon