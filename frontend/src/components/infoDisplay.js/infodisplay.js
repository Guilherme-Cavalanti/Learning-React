import { useState, useEffect } from "react"
import Container from "react-bootstrap/esm/Container"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Carousel from "react-bootstrap/Carousel"
import './infodisplay.css'
import Form from "react-bootstrap/Form"
import ChangePool from "../../ChangePool"

function InfoDisplay(props) {

    const {capitalizeFirstLetter} = ChangePool
    
    const [data, setData] = useState({})
    const [hp, setHp] = useState(0)
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [spa, setSpa] = useState(0)
    const [spd, setSpd] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [higherStat, setHigherStat] = useState(0)
    const [stats, setStats] = useState([])

    const [name,setName] = useState("")
    const [index,setIndex] = useState("")
    const [ability,setAbility] = useState("")
    
    useEffect(() => {
        setData(props.data)
        console.log(props.data)
    }, [])

    function GetHigherStatus(stats) {
        let higher = 0
        for (let i of stats) {
            if (i["base_stat"] > higher) higher = i["base_stat"]
        }
        return higher
    }

    const fillStats = () => {
        setHp(stats[0]["base_stat"])
        setAttack(stats[1]["base_stat"])
        setDefense(stats[2]["base_stat"])
        setSpa(stats[3]["base_stat"])
        setSpd(stats[4]["base_stat"])
        setSpeed(stats[5]["base_stat"])
    }

    //Loading Stats
    useEffect(() => {
        if (data["stats"] !== undefined) {
            setStats(data["stats"])
            setName(capitalizeFirstLetter(data["name"]))
            setIndex(data["id"])
            setAbility(capitalizeFirstLetter(data["abilities"][0]["ability"]["name"]))
        }
    }, [data])

    //Loading Higher Stat
    useEffect(() => {
        if (stats.length === 6) {
            setHigherStat(GetHigherStatus(stats))
        }

    }, [stats])
    useEffect(() => {
        if (higherStat > 0) {
            fillStats()
        }
    }, [higherStat])

    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <Container>
                        <span>HP: {hp}</span>
                        <ProgressBar now={(hp / higherStat) * 100} variant="primary" />
                        <span>Attack: {attack}</span>
                        <ProgressBar now={(attack / higherStat) * 100} variant="warning" />
                        <span>Defense: {defense}</span>
                        <ProgressBar now={(defense / higherStat) * 100} variant="danger" />
                        <span>SpA: {spa}</span>
                        <ProgressBar now={(spa / higherStat) * 100} variant="success" />
                        <span>SpD: {spd}</span>
                        <ProgressBar now={(spd / higherStat) * 100} variant="secondary" />
                        <span>Speed: {speed}</span>
                        <ProgressBar now={(speed / higherStat) * 100} variant="info" />
                    </Container>
                </Carousel.Item>
                <Carousel.Item>
                    <Container>
                        <Row className="mb-2">
                            <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Name:</span>
                        </Row >
                        <Row className="mb-2">
                            <Form.Control type="text" placeholder={name} readOnly disabled style={{ "transition": "all 0.3s ease" }} />
                        </Row>
                        <Row className="mb-2">
                            <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Pokedex index:</span>
                        </Row >
                        <Row className="mb-2">
                            <Form.Control type="text" placeholder={index} readOnly disabled />
                        </Row>
                        <Row className="mb-2">
                            <span className="border-bottom" style={{ "textAlign": "left", "fontWeight": "700" }}>Ability:</span>
                        </Row>
                        <Row className="mb-2">
                            <Form.Control type="text" placeholder={ability} readOnly disabled style={{ "transition": "all 0.3s ease" }} />
                        </Row>

                    </Container>
                </Carousel.Item>
            </Carousel>
            <style>
                {`
          .carousel-indicators {
            display: none;
          }
        `}
            </style>
        </>
    )
}

export default InfoDisplay