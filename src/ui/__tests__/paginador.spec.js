import mostrarPaginador, { manejarCambioPagina } from '../paginador.js'

test('maneja el cambio de página con un href', () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    target: {
      dataset: { pagina: 4 },
      getAttribute: jest.fn((i) => {
        const attributes = { href: 'http://test.com' }
        return attributes[i]
      })
    }
  }
  const mockCallback = jest.fn()
  manejarCambioPagina(mockEvent, mockCallback)
  expect(mockCallback).toBeCalledWith('http://test.com')
})

test('maneja el cambio de página con un número de página', () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    target: {
      dataset: { pagina: 4 },
      getAttribute: jest.fn((i) => {
        const attributes = { href: '#' }
        return attributes[i]
      })
    }
  }
  const mockCallBack = jest.fn()
  manejarCambioPagina(mockEvent, mockCallBack)
  expect(mockCallBack).toBeCalledWith(4)
})

test('muestra el paginador', () => {
  const mockCall = {
    pokemones: 100,
    paginas: {
      actual: 1,
      siguiente: 'http://test1.com',
      anterior: 'http://test2.com'
    },
    callback: jest.fn()
  }

  const { pokemones, paginas, callback } = mockCall
  const { actual, siguiente, anterior } = paginas

  document.body.innerHTML = '<div id="paginador"></div>'
  const $paginador = document.querySelector('#paginador')

  mostrarPaginador(pokemones, actual, siguiente, anterior, callback)
  expect($paginador.textContent).toMatch('1')

  $paginador.click()
  expect(callback).toBeCalled()
})

test('muestra el paginador sin url siguiente ni callback', () => {
  const mockCall = {
    pokemones: 100,
    paginas: {
      actual: 1,
      siguiente: null,
      anterior: 'http://test2.com'
    }
  }

  const { pokemones, paginas } = mockCall
  const { actual, siguiente, anterior } = paginas

  document.body.innerHTML = '<div id="paginador"></div>'

  mostrarPaginador(pokemones, actual, siguiente, anterior)

  const $paginaSiguiente = document.querySelector('[data-pagina="Siguiente"]')
  expect($paginaSiguiente.href).toMatch('null')
})
