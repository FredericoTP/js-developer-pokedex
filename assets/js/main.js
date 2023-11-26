const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div id="pokemonDetails" style="display: none;">
                <span>Height: ${pokemon.height} dm</span>
                <span>Weight: ${pokemon.weight} hg</span>
                <span>Hp: ${pokemon.hp}</span>
                <span>Attack: ${pokemon.attack}</span>
                <span>Defense: ${pokemon.defense}</span>
                <span>SpcAtk: ${pokemon.spcAtk}</span>
                <span>SpcDef: ${pokemon.spcDef}</span>
                <span>Speed: ${pokemon.speed}</span>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.getElementById('pokemonList').addEventListener('click', function (event) {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
        const detailsDiv = pokemonItem.querySelector('#pokemonDetails');

        detailsDiv.style.display = (detailsDiv.style.display === 'none') ? 'flex' : 'none';
    }
});

