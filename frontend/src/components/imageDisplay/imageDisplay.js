import { useState, useEffect, useRef, useContext } from "react"
import { GameContext } from "../../Context/GameContext";

function ImageDisplay(props) {
    const { currentState } = useContext(GameContext)
    const [image, setImage] = useState("")
    const [Info, setInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const imageRef = useRef(null);


    useEffect(() => {
        setInfo(props.data)
        setLoading(true)
    }, [])

    useEffect(() => {
        if (Info["sprites"] !== undefined) {
            setImage(Info["sprites"]["front_default"])
        }
    })

    const DarkenImage = () => {
        if (imageRef.current) {
            imageRef.current.style.filter = 'brightness(0)';
        }
    }

    const LightenImage = () => {
        if (imageRef.current) {
            imageRef.current.style.filter = "none"
        }
    }

    useEffect(() => {
        console.log(image)
        DarkenImage()
        setLoading(false)
        console.log("escureci imagem")
    }, [imageRef.current])

    useEffect(() => {
        if (currentState !== "") {
            LightenImage()
        }
    }, [currentState])

    return (
        <>
            {loading ? (
                <h1>Loading image... </h1>
            ) : (
                <img src={image} ref={imageRef} />
            )}    
        </>
    )
}

export default ImageDisplay