import {
  actualizarTextoIndicePokemones,
  mostrarListadoPokemones
} from '../listado.js'

test('actualiza el texto indice', () => {
  document.body.innerHTML = '<div id="indice"></div>'
  actualizarTextoIndicePokemones('test')
  expect(document.querySelector('#indice').textContent).toContain('test')
})

test('muestra el listado de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>'
  const mockCallBack = jest.fn()
  const pokemones = [
    { name: 'Bulbasaur' },
    { name: 'Ivysaur' },
    { name: 'Venusaur' }
  ]

  mostrarListadoPokemones(pokemones, mockCallBack)
  const $links = document.querySelectorAll('.list-group-item')
  $links.forEach(($link) => {
    $link.click()
  })

  expect(mockCallBack).toBeCalledTimes(3)
})
