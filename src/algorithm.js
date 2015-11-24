import invariant from 'invariant'

export const randomInt = (l, r) => l + Math.random() * (r - l) | 0

export const genRgbPalette = (br, bg, bb) => {
  const ret = []

  for (let r = 0; r < Math.pow(2, br); r++) {
    for (let g = 0; g < Math.pow(2, bg); g++) {
      for (let b = 0; b < Math.pow(2, bb); b++) {
        ret.push([
          r * (256 / Math.pow(2, br)) | 0,
          g * (256 / Math.pow(2, bg)) | 0,
          b * (256 / Math.pow(2, bb)) | 0,
          255,
        ])
      }
    }
  }

  return ret
}

export function* genNextElement(seq, select) {
  const data = Array.from(seq)
  let rightBound = data.length
  let i
  let prevElem = null

  while (rightBound) {
    i = select(rightBound, prevElem)
    invariant(i < rightBound, `invalid index ${i}, current upper bound ${rightBound}`)

    rightBound--

    let tmp = seq[i]
    seq[i] = seq[rightBound]
    seq[rightBound] = tmp

    yield seq[rightBound]

    prevElem = seq[rightBound]
  }
}

export const posToIndex = (data) => {
  const [x, y] = data
  return (511 - x) * 512 + (511 - y) * 1
}
