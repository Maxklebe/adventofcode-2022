import fs from 'fs'

const run = async () => {
  const elfFood = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n\r\n/)

  const calories = elfFood.map(food => food.split(/\r\n/).reduce((prev, curr) => Number(prev) + Number(curr), 0)).sort((a, b) => b - a)

  const mostCalories = calories[0]
  const topThreeCalories = calories.splice(0, 3).reduce((prev, curr) => Number(curr) + Number(prev))

  console.log('Most calories:', mostCalories)
  console.log('topThreeCalories', topThreeCalories)
}


run()