import { useState, useEffect } from 'react'
import App from '../../App'


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
            <div className='selects'>
                <label>
                    Gen 1:
                </label>
                <input type="checkbox" checked={gen1} onChange={() => HandleChange(1)} />



                <label>
                    Gen 2:
                </label>

                <input type="checkbox" checked={gen2} onChange={() => HandleChange(2)} />

                <label>
                    Gen 3:
                </label>
                <input type="checkbox" checked={gen3} onChange={() => HandleChange(3)} />


                <label>
                    Gen 4:
                </label>
                <input type="checkbox" checked={gen4} onChange={() => HandleChange(4)} />


                <label>
                    Gen 5:
                </label>
                <input type="checkbox" checked={gen5} onChange={() => HandleChange(5)} />

            </div>

            <div className='botoes-filter'>
                <button className='btn-filter' onClick={Apply}>
                    Aplicar
                </button>
                <button className='btn-filter' onClick={Apagar}>
                    Apagar
                </button>
            </div>
        </div>
    )

}

export default Filter