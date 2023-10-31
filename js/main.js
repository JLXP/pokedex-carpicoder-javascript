const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
    const div = document.createElement("div");
    //El map crea un array dependiendo de lo que le indiquemos
    let tipos = poke.types.map((type) => `
    <p class="${type.type.name} tipo">${type.type.name}</p>
    `);
    //el join crea un string apartir del array
    tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">
            #${pokeId}
        </p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}"
                alt="${poke.name}" />
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    
    `;

    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    //obtiene el id de cada pokemonen este caso son los tipos
    const botonId = event.currentTarget.id;

    //Se vacia la lista de pokemon
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    //Aqui extrae el tipo que es
                    const tipos = data.types.map(type => type.type.name);
                    
                    //Aqui compara si se encuentra en el data
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            });
    }

}))