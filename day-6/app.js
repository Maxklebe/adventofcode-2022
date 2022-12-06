import fs from 'fs'

//PART 1
const SEQUENCE_CHARS_PART_ONE = 4
//PART 2
const SEQUENCE_CHARS_PART_TWO = 14

const getMarkerLocation = (input, sequenceChars) => {
  for (let i = 0; i < input.length; i++) {
    const sequence = input.slice(i, i + sequenceChars)
    const repeated = sequence.some((item, index) => sequence.filter((_, sequenceIndex) => index !== sequenceIndex).includes(item))

    if (!repeated) {
      return i + sequence.length
    }
  }
}

const run = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').split('')

  console.log('Marker is complete at:', getMarkerLocation(input, SEQUENCE_CHARS_PART_ONE))
}

run()