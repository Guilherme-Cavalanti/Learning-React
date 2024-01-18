function ChangePool(gens, array) {
    let Pokes = []
    if(gens["gen1"] === true){
        for (let i=0;i<151;i++){
            Pokes.push(array[i])
        }
    }
    if(gens["gen2"]){
        for (let i=151;i<251;i++){
            Pokes.push(array[i])
        }
    }
    if(gens["gen3"]){
        for (let i=251;i<386;i++){
            Pokes.push(array[i])
        }
    }
    if(gens["gen4"]){
        for (let i=386;i<493;i++){
            Pokes.push(array[i])
        }
    }
    if(gens["gen5"]){
        for (let i=493;i<649;i++){
            Pokes.push(array[i])
        }
    }
    return Pokes
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const ArrumarArray = (array) => {
    return array.map(pokemon => capitalizeFirstLetter(pokemon))
}
export default {
    ChangePool,
    ArrumarArray,
    capitalizeFirstLetter
}