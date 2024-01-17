import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"



function Filter(props) {

    const [gen1, setGen1] = useState(false)
    const [gen2, setGen2] = useState(false)
    const [gen3, setGen3] = useState(false)
    const [gen4, setGen4] = useState(false)
    const [gen5, setGen5] = useState(false)
    const [empty, setEmpty] = useState(false)

    const Apply = () => {
        props.Apply({
            "gen1": gen1,
            "gen2": gen2,
            "gen3": gen3,
            "gen4": gen4,
            "gen5": gen5,
        })
    }

    const Apagar = () => {
        setGen1(false)
        setGen2(false)
        setGen3(false)
        setGen4(false)
        setGen5(false)
        setEmpty(true)

    }

    useEffect(() => {
        if (empty) Apply()
    }, [empty])

    function HandleChange(n) {
        setEmpty(false)
        switch (n) {
            case (1):
                setGen1(!gen1)
                break
            case (2):
                setGen2(!gen2)
                break
            case (3):
                setGen3(!gen3)
                break
            case (4):
                setGen4(!gen4)
                break
            case (5):
                setGen5(!gen5)
                break
        }
    }

    return (
        <div>
            <Container className='border-top border-bottom mb-3' style={{"width": "10%", "minWidth": "450px", display: "inline-block"}}>
                <Form.Check type="checkbox" checked={gen1} onChange={() => HandleChange(1)} label="Gen 1" inline reverse/>
                <Form.Check type="checkbox" checked={gen2} onChange={() => HandleChange(2)} label="Gen 2" inline reverse/>
                <Form.Check type="checkbox" checked={gen3} onChange={() => HandleChange(3)} label="Gen 3" inline reverse/>
                <Form.Check type="checkbox" checked={gen4} onChange={() => HandleChange(4)} label="Gen 4" inline reverse/>
                <Form.Check type="checkbox" checked={gen5} onChange={() => HandleChange(5)} label="Gen 5" inline reverse/>
            </Container>

            <Container className='botoes-filter d-flex' style={{"justifyContent":"space-evenly",  "minWidth":"400px", width: "7%"}}>
                <Button className='' variant="info"onClick={Apply}>
                    Apply
                </Button>
                <Button className='btn-filter' onClick={Apagar} variant='dark'>
                    Erase
                </Button>
            </Container>
        </div>
    )

}

export default Filter