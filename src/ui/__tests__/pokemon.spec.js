import mostrarPokemon from '../pokemon.js'
import pokedexFixture from '../../__tests__/pokedex.fixture.js'
import bulbasaurFixture from '../../../cypress/fixtures/bulbasaur.json'

const pokemon = bulbasaurFixture
beforeAll(() => {
  document.body.innerHTML = pokedexFixture
  mostrarPokemon(pokemon)
})

test('muestra el contenedor del pokemon', () => {
  expect(document.querySelector('#pokemon-contenedor').style.display).toEqual(
    'block'
  )
})

test('actualiza el texto de ayuda', () => {
  expect(document.querySelector('#ayuda').textContent).toEqual('')
})

test('muestra la imagen del pokemon', () => {
  const $pokemonImagen = document.querySelector('#pokemon-imagen')
  expect($pokemonImagen.src).toEqual(bulbasaurFixture.sprites.front_default)
  expect($pokemonImagen.alt).toEqual(
    `Imagen frontal del pokemon ${bulbasaurFixture.name}`
  )
})

test('muestra el nombre y el id del pokemon', () => {
  expect(document.querySelector('#pokemon-nombre').textContent).toEqual(
    bulbasaurFixture.name
  )
  expect(document.querySelector('#pokemon-id').textContent).toContain(
    bulbasaurFixture.id
  )
})

test('muestra los tipos del pokemon', () => {
  const $tipos = document.querySelectorAll('#tipos > span')
  expect($tipos).toHaveLength(2)

  $tipos.forEach((tipo, i) => {
    expect(tipo.className).toEqual(
      `badge ${bulbasaurFixture.types[i].type.name} type`
    )
    expect(tipo.textContent).toEqual(bulbasaurFixture.types[i].type.name)
  })
})

test('muestra las habilidades del pokemon', () => {
  const $habilidades = document.querySelectorAll('#habilidades > span')
  expect($habilidades).toHaveLength(2)

  $habilidades.forEach((habilidad, i) => {
    expect(habilidad.className).toEqual('badge')
    expect(habilidad.textContent).toEqual(
      bulbasaurFixture.abilities[i].ability.name
    )
  })
})

test('muestra los movimientos del pokemon', () => {
  const movimientos = bulbasaurFixture.moves
  const $movimientos = document.querySelector('#movimientos')

  movimientos.forEach((movimiento) => {
    const versiones = movimiento.version_group_details
    const nombreMovimiento = movimiento.move.name

    versiones.forEach((version, i) => {
      expect($movimientos.textContent).toContain(nombreMovimiento, version[i])
    })
  })
})
