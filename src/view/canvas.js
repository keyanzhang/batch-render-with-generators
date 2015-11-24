import {
  randomInt,
  genRgbPalette,
  genNextElement,
 } from '../algorithm'

function* genNextPxPosition(width, height, select) {
  var rawPos = []
  for (let x = width - 1; x >= 0; x--) {
    for (let y = height - 1; y >= 0; y--) {
      rawPos.push([x, y])
    }
  }
  yield* genNextElement(rawPos, select)
}

const drawPixel = (ctx, data, pxData, x, y) => {
  pxData.data[0] = data[0]
  pxData.data[1] = data[1]
  pxData.data[2] = data[2]
  pxData.data[3] = 255

  ctx.putImageData(pxData, x, y)
}

export function* genNextBatchRender(domEl, colorSelect, posSelect, regionLength) {
  const ctx = domEl.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, domEl.width, domEl.height)

  const pxData = ctx.getImageData(0, 0, 1, 1)
  const colorPalette = genRgbPalette(6, 6, 6)

  const colorGen = genNextElement(
    colorPalette,
    colorSelect,
  )

  const posGen = genNextPxPosition(
    domEl.width,
    domEl.height,
    posSelect,
  )

  let i = 0

  while (1) {
    const { value: data, done: dataDone } = colorGen.next()
    if (dataDone) {
      return
    }

    const [ x, y ] = posGen.next().value
    // // not necessary to use rAF here
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
