import fs from 'fs'

const alphabetical = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const getPrioPoints = () => {
  let prioPoints = {}

  for (let i = 0; i < alphabetical.length; i++) {
    prioPoints[alphabetical[i]] = i + 1
  }

  return prioPoints
}

//PART ONE
const getDuplicateItem = (items) => {
  const firstCompartment = []
  const secondCompartment = []
  const splitIndex = items.length / 2

  for (let i = 0; i < items.length; i++) {
    if (i < splitIndex) firstCompartment.push(items[i])
    else secondCompartment.push(items[i])
  }

  return firstCompartment.find(item => secondCompartment.includes(item))
}

//PART TWO
const findGroupBadge = (group) => {
  const firstGroup = group[0].split('')
  const secondGroup = group[1].split('')
  const thirdGroup = group[2].split('')

  return firstGroup.find(item => secondGroup.includes(item) && thirdGroup.includes(item))
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n/)

  const prioPointsMap = getPrioPoints()

  //Part 1
  //const points = input.map(rucksack => prioPointsMap[getDuplicateItem(rucksack)])
  //const totalPoints = points.reduce((prev, curr) => prev + curr)

  let totalPoints = 0;

  for (let i = 0; i < input.length; i = i + 3) {
    const group = input.slice(i, i + 3)
    const badge = findGroupBadge(group)
    totalPoints = totalPoints + prioPointsMap[badge]
  }

  console.log(totalPoints)
}


run()