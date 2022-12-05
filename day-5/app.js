import fs from 'fs'

const containerRegexp = /.{1,4}/g
const instructionsRegexp = /\d+/g
const messageRegexp = /[^\w]/g

const createStacksFromContainers = (containers) => containers.pop().match(containerRegexp).map(() => [])

const populateStacks = (containers, stacks) => containers.forEach(container => {
  container
    .match(containerRegexp)
    .map(item => item.trim())
    .forEach((item, index) => {
      if (item) {
        stacks[index].push(item)
      }
    })
})


//Part1
const moveContainers = (amount, fromStack, toStack) => {
  for (let i = 0; i < amount; i++) {
    toStack.unshift(fromStack.shift())
  }
}

//Part2
const moveContainers2 = (amount, fromStack, toStack) => {
  const removedContainers = fromStack.splice(0, amount)
  const removedStack = toStack.splice(0, toStack.length)
  toStack.push(...removedContainers, ...removedStack)
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8')

  const [containersRaw, instructionsRaw] = input.split(/\r\n\r\n/)
  const containers = containersRaw.split(/\r\n/)
  const instructions = instructionsRaw.split(/\r\n/)

  const stacks = createStacksFromContainers(containers)
  populateStacks(containers, stacks)

  instructions.forEach(instruction => {
    const [amount, from, to] = instruction
      .match(instructionsRegexp)
      .map(item => Number(item))

    moveContainers2(amount, stacks[from - 1], stacks[to - 1])
  })

  const text = stacks.map(item => item.length ? item[0].replace(messageRegexp, '') : '').join('')
  console.log('Container message:', text)
}

run()