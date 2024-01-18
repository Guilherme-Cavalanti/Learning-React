import Container from "react-bootstrap/esm/Container";
import { GameContext } from "../../Context/GameContext";
import { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form"
import ChangePool from "../../ChangePool";
import Alert from "react-bootstrap/Alert"

function HintsDisplay(props) {
    const { currentState, round } = useContext(GameContext)
    const [hint1, setHint1] = useState("???")
    const [hint2, setHint2] = useState("???")
    const [hint3, setHint3] = useState("???")
    const [data, setData] = useState({})
    const { capitalizeFirstLetter } = ChangePool
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setData(props.data)
    }, [])

    const ConvertWeigth = (w) => {
        return `${w / 10} kg`
    }

    const ConvertHeigth = (h) => {
        return `${h / 10} m`
    }

    const ConvertTypes = (types) => {
        let type1 = capitalizeFirstLetter(types[0]["type"]["name"])
        let type2 = "None"
        if (types.length == 2) {
            type2 = capitalizeFirstLetter(types[1]["type"]["name"])
        }
        return `${type1}/${type2}`
    }
    useEffect(() => {
        if (loaded) {
            switch (round) {
                case (1):
                    setHint1(ConvertHeigth(data["height"]))
                    break;
                case (2):
                    setHint2(ConvertWeigth(data["weight"]))
                    break;
                case (3):
                    setHint3(ConvertTypes(data["types"]))
                    break;
            }
        }

    })

    useEffect(()=>{
        if(data["height"] !== undefined)setLoaded(true)
    },[data])

    return (
        <Container>
            <Row>
                <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Height:</span>
            </Row >
            <br />
            <Row>
                <Form.Control type="text" placeholder={hint1} readOnly disabled style={{ "transition": "all 0.3s ease" }} />
            </Row>
            <Row>
                <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Weigth:</span>
            </Row>
            <br />
            <Row>
                <Form.Control type="text" placeholder={hint2} readOnly disabled className="transitionHint" />
            </Row>
            <Row>
                <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Types:</span>
            </Row>
            <br />
            <Row>
                <Form.Control type="text" placeholder={hint3} readOnly disabled style={{ "transition": "all 0.3s ease" }} />
            </Row>

        </Container>
    )
}
export default HintsDisplay