import fs from 'fs'

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split(/\r\n/)

  let counter = 0

  input.forEach(item => {
    const sections = item.split(/,/)

    const [longest, shortest] = sections.map(item => {
      const [start, end] = item.split('-')
      return Array.from({ length: end - start + 1 }, (_, index) => Number(start) + Number(index))
    }).sort((a, b) => b.length - a.length)


    //Part one
    /*if (shortest.every(item => longest.includes(item))) {
      counter++
    }*/

    //Part two
    if (shortest.some(item => longest.includes(item))) {
      counter++
    }
  })

  console.log('OVERLAPS:', counter)
}

run()