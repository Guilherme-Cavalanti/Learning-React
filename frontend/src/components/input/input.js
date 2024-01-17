import { useState, useEffect, useContext } from "react"
import { GameContext } from "../../Context/GameContext"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./input.css"
import Button from "react-bootstrap/esm/Button"
function InputPokemon(props) {
    const [names, setNames] = useState([])
    const [pokemon, setPokemon] = useState("")
    const [textInput, setTextInput] = useState("")
    const [namesVisible, setNamesVisible] = useState(false)
    const { round, currentState } = useContext(GameContext)
    const [alert, setAlert] = useState(false)
 
    useEffect(() => {
        setNames(props.names)
    }, [])

    const changeInput = (event) => {
        event.preventDefault()
        setTextInput(event.target.value)
    }

    const choosePokemon = (event) => {
        let pokemon = names.filter(pokemon => pokemon == event.target.innerHTML.trim())[0]
        //let pokemon = event.target.innerHTML
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
            setAlert(false)
        }
        else {
            console.log("must be a poke")
            setAlert(true)
        }
    }
        

    function handleItemKeyDown(event) {
        console.log(event.key)
        if (event.key === 'Enter') {
            choosePokemon(event)
        }
    }


    return (
        <div style={{ height: "286px" }}>
            <Container style={{ width: "10%", "minWidth": "313px", "padding": "0%", "height": "286px" }} >
                <Row style={{ "margin": "0" }}>
                    <Col >
                        <Form.Control onChange={changeInput} type="text" value={textInput} placeholder="Type pokemon name" className="InputPokemon" />
                    </Col>
                    <Col style={{ "width": "62.5px" }}>
                        <Button className="guess" onClick={Guess} variant="light">Guess</Button>
                    </Col>
                </Row>
                <Container style={{ "width": "80%", "zIndex": "1" }} id="DivList">
                    {namesVisible && textInput != pokemon && <ul id="NameList">
                        {names.filter(pokemon => pokemon.toUpperCase().includes(textInput.toUpperCase())).map(pokemon =>
                            <li value={pokemon} onClick={choosePokemon} style={{ listStyle: "none" }} className="border" tabIndex="0" onKeyDown={handleItemKeyDown} key={pokemon}>{pokemon} </li>
                        )}
                    </ul>
                    }
                </Container>
                {alert && <span className="text-danger">*must be a pokemon</span>}
            </Container>
            <br />
        </div>
    )
}

export default InputPokemon