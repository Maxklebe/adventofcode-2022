import fs from 'fs'

const TOTAL_SPACE = 70000000
const UPDATE_SPACE = 30000000

const isCommand = (input) => input.startsWith('$')

const handleInfo = (entry, currentPath) => {
  const [type, name] = entry.split(/\s/)

  if (type === 'dir') {
    currentPath[name] = {
      parent: currentPath
    }
  } else {
    currentPath[name] = Number(type)
  }
}

const handleCommand = (commandString, currentPath) => {
  const [command, location] = commandString.split(/\s/)

  if (command === 'cd') {
    switch (location) {
      case '/':
        return currentPath
      case '..':
        return currentPath.parent
      default:
        return currentPath[location]
    }
  }

  return currentPath
}

const loopThroughFileSystem = (fileSystem, folderSize) => {
  const size = Object.entries(fileSystem).map(([key, value]) => {
    if (key === 'parent') return

    if (typeof value === 'object') {
      return loopThroughFileSystem(value, folderSize)
    }

    return value
  }).filter(i => i).reduce((prev, curr) => prev + curr, 0)

  folderSize.push(size)

  return size
}

const calcRequiredSpace = (allocatedSize) => {
  const availableSize = TOTAL_SPACE - allocatedSize
  return UPDATE_SPACE - availableSize
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n/)

  let fileSystem = {}
  let currentPath = fileSystem

  input.forEach(row => {
    if (isCommand(row)) {
      currentPath = handleCommand(row.substring(2), currentPath)
    } else {
      handleInfo(row, currentPath)
    }
  })

  const folderSize = []
  const allocatedSize = loopThroughFileSystem(fileSystem, folderSize)

  console.log('Sum of all directories:', folderSize.filter(folder => folder < 100000).reduce((prev, curr) => prev + curr))

  const requiredSpace = calcRequiredSpace(allocatedSize)
  const folderToDelete = folderSize.filter(folder => folder >= requiredSpace).sort((a, b) => a - b)[0]

  console.log('Delete folder with size:', folderToDelete)
}

run()