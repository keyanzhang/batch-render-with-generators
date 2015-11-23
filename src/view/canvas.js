import {
  randomInt,
  genRgbPalette,
  genNextElement,
 } from '../algorithm'

function* genNextPxPosition(width, height, select) {
  var raw = []
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      raw.push([x, y])
    }
  }

  yield* genNextElement(raw, select)
}

const drawPixel = (ctx, data, pxData, x, y) => {
  pxData.data[0] = data[0]
  pxData.data[1] = data[1]
  pxData.data[2] = data[2]
  pxData.data[3] = 255

  ctx.putImageData(pxData, x, y)
}

export function* genNextBatchRender(domEl, dataSelect, posSelect, regionLength) {
  const ctx = domEl.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, domEl.width, domEl.height)

  const pxData = ctx.getImageData(0, 0, 1, 1)
  const colorPalette = genRgbPalette(6, 6, 6)

  const dataGen = genNextElement(
    colorPalette,
    dataSelect,
  )

  const posGen = genNextPxPosition(
    domEl.width,
    domEl.height,
    posSelect,
  )

  let i = 0

  while (1) {
    const { value: data, done: dataDone } = dataGen.next()
    if (dataDone) {
      return
    }

    const [ x, y ] = posGen.next().value

    // // is it necessary to use rAF here?
    // window.requestAnimationFrame(
    //   () => drawPixel(ctx, data, pxData, x, y)
    // )

    drawPixel(ctx, data, pxData, x, y)
    i++

    if (i === regionLength) {
      yield null
      i = 0
    }
  }
}
