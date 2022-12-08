import fs from 'fs'

const calcVisibleTrees = (treeHeight, trees) => {
  let visibleTrees = 0

  for (let i = 0; i < trees.length; i++) {
    if (treeHeight > trees[i]) {
      visibleTrees++
    } else if (treeHeight === trees[i]) {
      visibleTrees++
      break
    } else {
      visibleTrees++
      break;
    }
  }

  return visibleTrees || 1
}

const checkTop = (col, rowIdx, colIdx, grid) => {
  let trees = []

  for (let i = 0; i < rowIdx; i++) {
    trees.unshift(grid[i][colIdx])
  }

  return {
    isTopVisible: trees.every(tree => tree < col),
    visibleTreesTop: calcVisibleTrees(col, trees)
  }
}

const checkBottom = (col, rowIdx, colIdx, grid) => {
  let trees = []

  for (let i = rowIdx + 1; i < grid.length; i++) {
    trees.push(grid[i][colIdx])
  }

  return {
    isBottomVisible: trees.every(tree => tree < col),
    visibleTreesBottom: calcVisibleTrees(col, trees)
  }
}

const checkLeft = (col, colIdx, row) => {
  let trees = []
  for (let i = 0; i < colIdx; i++) {
    trees.unshift(row[i])
  }

  return {
    isLeftVisible: trees.every(tree => tree < col),
    visibleTreesLeft: calcVisibleTrees(col, trees)
  }
}

const checkRight = (col, colIdx, row) => {
  let trees = []
  for (let i = colIdx + 1; i < row.length; i++) {
    trees.push(row[i])
  }

  return {
    isRightVisible: trees.every(tree => tree < col),
    visibleTreesRight: calcVisibleTrees(col, trees)
  }
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n/)

  const grid = input.map(row => row.split('').map(i => Number(i)))

  let highestScenicScore = 0

  const visibleTrees = grid.map((row, rowIdx) => row.map((col, colIdx) => {
    if (rowIdx === 0 || rowIdx === grid.length - 1 || colIdx === 0 || colIdx === row.length - 1) return 1

    const { isTopVisible, visibleTreesTop } = checkTop(col, rowIdx, colIdx, grid)
    const { isBottomVisible, visibleTreesBottom } = checkBottom(col, rowIdx, colIdx, grid)
    const { isLeftVisible, visibleTreesLeft } = checkLeft(col, colIdx, row)
    const { isRightVisible, visibleTreesRight } = checkRight(col, colIdx, row)

    const scenicScore = visibleTreesTop * visibleTreesBottom * visibleTreesLeft * visibleTreesRight

    if (scenicScore > highestScenicScore) {
      highestScenicScore = scenicScore
    }

    return isTopVisible || isBottomVisible || isLeftVisible || isRightVisible ? 1 : 0
  }))


  const total = visibleTrees.flat().reduce((prev, curr) => prev + curr)

  console.log('Which is', total, 'trees')
  console.log('Highest scenic score:', highestScenicScore)
}

run()