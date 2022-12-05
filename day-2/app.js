import fs from 'fs'

const MyResponseShapes = {
  Rock: 'X',
  Paper: 'Y',
  Scissors: 'Z',
}

const TheirResponseShapes = {
  Rock: 'A',
  Paper: 'B',
  Scissors: 'C',
}

const ReverseResponseShapes = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
}

const RoundState = {
  Lose: 'X',
  Draw: 'Y',
  Win: 'Z',
}

const ResponseShapePoints = {
  X: 1,
  Y: 2,
  Z: 3
}

const getShapePoints = shape => ResponseShapePoints[shape]

//Part 1
const getRoundPoints = (theirShape, myShape) => {
  if (ReverseResponseShapes[myShape] === ReverseResponseShapes[theirShape]) return 3

  switch (myShape) {
    case MyResponseShapes.Rock:
      return theirShape === TheirResponseShapes.Scissors ? 6 : 0
    case MyResponseShapes.Paper:
      return theirShape === TheirResponseShapes.Rock ? 6 : 0
    case MyResponseShapes.Scissors:
      return theirShape === TheirResponseShapes.Paper ? 6 : 0
  }
}

//Part 2
const getOutcomePointsBasedOnShape = (theirShape, shapeToPlay) => {
  if (shapeToPlay === RoundState.Draw) return getShapePoints(MyResponseShapes[ReverseResponseShapes[theirShape]]) + 3

  switch (shapeToPlay) {
    case RoundState.Lose:
      if (theirShape === TheirResponseShapes.Rock) return getShapePoints(MyResponseShapes.Scissors)
      if (theirShape === TheirResponseShapes.Paper) return getShapePoints(MyResponseShapes.Rock)
      if (theirShape === TheirResponseShapes.Scissors) return getShapePoints(MyResponseShapes.Paper)

    case RoundState.Win:
      if (theirShape === TheirResponseShapes.Rock)
        return getShapePoints(MyResponseShapes.Paper) + 6
      if (theirShape === TheirResponseShapes.Paper)
        return getShapePoints(MyResponseShapes.Scissors) + 6
      if (theirShape === TheirResponseShapes.Scissors)
        return getShapePoints(MyResponseShapes.Rock) + 6
  }
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n/)

  let totalPoints = 0

  input.forEach(row => {
    const [theirShape, myShape] = row.split(/\s/)

    //Part 1
    //const shapePoints = getShapePoints(myShape)
    //const roundPoints = getRoundPoints(theirShape, myShape)

    //Part 2
    const roundPoints = getOutcomePointsBasedOnShape(theirShape, myShape)

    totalPoints += roundPoints
  })

  console.log('Total points:', totalPoints)
}


run()