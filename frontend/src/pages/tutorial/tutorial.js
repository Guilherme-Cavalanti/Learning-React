import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/esm/Container"

function Tutorial(){
    return (
        <Container style={{ "width": "20%", "minWidth": "520px" }}  className="mt-5">
        <Card  >
            <Card.Body>
                <Card.Title>How to Play:</Card.Title>
                <Card.Subtitle>Filter:</Card.Subtitle>
                <Card.Text style={{"textAlign":"justify"}} >
                    To use the filter, click on the checkboxes refering to the gens you would like to select, for example: if I want to play with pokemons from 
                    gen 1, 2 and 3, i will mark the first 3 checkboxes.
                </Card.Text>
                <Card.Subtitle>Guessing</Card.Subtitle>
                <Card.Text style={{"textAlign":"justify"}}>
                    When you're already in the game, you will se a dark sprite of the pokemon you are supposed to guess. To guess, type the name of the pokemon you think 
                    is the answer, and a name list will show up, click on the name you want and then press "Guess".
                </Card.Text>
                <Card.Subtitle>Hints</Card.Subtitle>
                <Card.Text style={{"textAlign":"justify"}}>
                    You have 3 rounds to guess, within each round you get extra tips, at first you are given the pokemons height, then the weight and finally its
                    types. The hints are displayed at the right side of the pokemon image.
                </Card.Text>
                <Card.Subtitle>Ending</Card.Subtitle>
                <Card.Text style={{"textAlign":"justify"}}>
                    When the game ends, you have two different states, win or loss. For both, the name and coloured sprite of the pokemon will show up, and the hints
                    area will be changed for an info display, showing some stuff about that pokemon.
                </Card.Text>
            </Card.Body>
        </Card>
    </Container>
    )
}

export default Tutorial