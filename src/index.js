import { genNextBatchRender } from './view/canvas'
import { randomInt } from './algorithm'

import styles from './index.css'

const rootEl = document.getElementById('app')
const canvasEl = document.getElementsByClassName('thatCanvas')[0]
const controlEl = document.getElementsByClassName('control')[0]
const buttonEl = document.getElementsByClassName('switchButton')[0]

rootEl.classList.add(styles.app)
controlEl.classList.add(styles.control)
buttonEl.classList.add(styles.switchButton)

let defaultFn = (rightBound, prevElem) => rightBound - 1

let renderer = genNextBatchRender(
  canvasEl,
  (rightBound, prevElem) => rightBound - 1,
  (rightBound, prevElem) => rightBound - 1,
  1000,
)

const doRender = () => {
  const { value, done } = renderer.next()

  if (!done) {
    requestAnimationFrame(doRender)
  }
}

doRender()

buttonEl.onclick = (e) => {
  if (renderer) {
    renderer.return() // cancels the current task
  }

  renderer = genNextBatchRender(
    canvasEl,
    (rightBound, prevElem) => randomInt(0, rightBound),
    (rightBound, prevElem) => randomInt(0, rightBound),
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
