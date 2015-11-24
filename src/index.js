import { genNextBatchRender } from './view/canvas'
import { randomInt, posToIndex } from './algorithm'

import styles from './index.css'

const rootEl = document.getElementById('app')
const canvasEl = document.getElementsByClassName('thatCanvas')[0]
const controlEl = document.getElementsByClassName('control')[0]
const buttonEl = document.getElementsByClassName('switchButton')[0]

rootEl.classList.add(styles.app)
controlEl.classList.add(styles.control)
buttonEl.classList.add(styles.switchButton)

let ops = [
  (rightBound, prevElem) => rightBound - 1,
  (rightBound, prevElem) => randomInt(0, rightBound),
]

let renderer = genNextBatchRender(
  canvasEl,
  ops[0], // color selecting function
  ops[0], // pos selecting function
  1000,
)

const doRender = () => {
  const { value, done } = renderer.next()

  if (!done) {
    requestAnimationFrame(doRender)
  }
}

doRender()

let opIdx = 0

buttonEl.onclick = (e) => {
  if (renderer) {
    renderer.return() // cancels the current task
  }

  opIdx = randomInt(0, 10)

  renderer = genNextBatchRender(
    canvasEl,
    ops[opIdx % ops.length], // color selecting function
    ops[opIdx % ops.length], // pos selecting function
    1000,
  )

  const doRender = () => {
    const { value, done } = renderer.next()

    if (!done) {
      requestAnimationFrame(doRender)
    }
  }

  doRender()
}
