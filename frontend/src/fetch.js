import api from "./api";

const PegarPokemonAleatorio = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex].toString()
}

//const numeros = Array.from({ length: 649 }, (_, index) => index + 1);

const BuscarPokemon = async (p) => {
    const res = await api.get(`/${p.toLowerCase()}`)
    const { data } = res
    return data
}


const PegarNomesPokemon = async () => {
    const nomes = []
    const res = await api.get('?limit=649&offset=0')
    const { data } = res
    const { results } = data
    for(let i = 0; i<results.length; i++){
        let nome = results[i]["name"]
        nomes.push(nome)
    }
    return nomes
}
export default {
    PegarPokemonAleatorio,
    BuscarPokemon,
    PegarNomesPokemon
}