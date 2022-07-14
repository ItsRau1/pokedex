let url = id =>`https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    let pokemonPromises = []

    for (let i = 1 ; i <= 250 ; i++ ) {
        pokemonPromises.push(fetch(url(i)).then(response => response.json()))
    }
    
    Promise.all(pokemonPromises)
    .then(pokemons => {
         const liCreator = pokemons.reduce((accumulator, pokemon) => {
            let type = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
                <li class="card ${type[0]}">
                    <h4 class="card-id">${pokemon.id}</h4>
                    <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
                    <h2 class="card-name">${pokemon.name}</h2>
                    <p class="card-type">${type.join(" | ")}</p>
                </li>
            `
            return accumulator
        }, '')

        let ul = document.querySelector(`#pokedex`)

        ul.innerHTML = liCreator
    })
}
fetchPokemon()
