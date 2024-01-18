import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/esm/Container"


function About() {
    return (
        <Container style={{ "width": "20%", "minWidth": "520px" }}  className="mt-5">
            <Card  >
                <Card.Body>
                    <Card.Title>About this website:</Card.Title>
                    <Card.Subtitle>Developing:</Card.Subtitle>
                    <Card.Text style={{"textAlign":"justify"}} >
                        This website was made by me: <a href="https://github.com/Guilherme-Cavalanti">Github Profile</a>, in
                        collaboration with ChatGPT 3.5. You can find the full repository on <a href="https://github.com/Guilherme-Cavalanti/Learn-React-Bootstrap">here</a>.
                    </Card.Text>
                    <Card.Subtitle>Tools</Card.Subtitle>
                    <Card.Text style={{"textAlign":"justify"}}>
                        This website was made using ReactJS, with <a href="https://create-react-app.dev/">create-react-app</a>, 
                        in collaboration with <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/">bootstrap</a>, and 
                        <a href="https://react-bootstrap.netlify.app/"> react-bootstrap</a>, a lib that allows you to import bootstrap based react components.
                        This page was made using the <u>Card</u> component from their library.
                    </Card.Text>
                    <Card.Subtitle>About the API</Card.Subtitle>
                    <Card.Text style={{"textAlign":"justify"}}>
                        There is no backend on this application, all my requests were done using the PokeApi. which you can find 
                        <a href="https://pokeapi.co/"> here</a>. They allow you to get useful info and images from each pokemon, thats how I made everything.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default About