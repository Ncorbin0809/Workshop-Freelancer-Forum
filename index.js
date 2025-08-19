/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve']
const OCCUPATIONS = ['Writer', 'Teacher', 'Programmer', 'Designer', 'Engineer']
const PRICE_RANGE = { min: 20, max: 200 }
const NUM_FREELANCERS = 100

// === Helpers ===
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}
function getRandomRate(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// === Factory ===
function createFreelancer() {
  /** @type {Freelancer} */
  return {
    name: getRandomElement(NAMES),
    occupation: getRandomElement(OCCUPATIONS),
    rate: getRandomRate(PRICE_RANGE.min, PRICE_RANGE.max),
  }
}

// === State ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, createFreelancer)

function getAverageRate(list) {
  if (!list.length) return 0
  let total = 0
  for (const f of list) total += f.rate
  return total / list.length
}

const averageRate = getAverageRate(freelancers)

// === Components (return DOM elements) ===
function FreelancerComponent(f) {
  const li = document.createElement('li')
  li.textContent = `${f.name} ${f.occupation} $${f.rate}/hr`
  return li
}

function FreelancersListComponent(list) {
  const ul = document.createElement('ul')
  for (const f of list) {
    ul.appendChild(FreelancerComponent(f))
  }
  return ul
}

function AverageRateComponent(avg) {
  const p = document.createElement('p')
  p.textContent = `Average Rate: $${avg.toFixed(2)}/hr`
  return p
}

// === Render ===
function render() {
  document.body.textContent = ''
  const h1 = document.createElement('h1')
  h1.textContent = 'Freelancers'

  document.body.appendChild(h1)
  document.body.appendChild(AverageRateComponent(averageRate))
  document.body.appendChild(FreelancersListComponent(freelancers))
}

render()
