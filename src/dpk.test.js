const crypto = require('crypto')
const { deterministicPartitionKey } = require('./dpk')

// It creates a deterministic partition for the data input based on

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe('0')
  })

  it('Creates a deterministic key for primitive data based on SHA3-512 algorythm', () => {
    const event1 = 'String'
    const event2 = 12345
    const event3 = true

    expect(deterministicPartitionKey(event1)).toBe(
      crypto.createHash('sha3-512').update(JSON.stringify(event1)).digest('hex')
    )

    expect(deterministicPartitionKey(event2)).toBe(
      crypto.createHash('sha3-512').update(JSON.stringify(event2)).digest('hex')
    )

    expect(deterministicPartitionKey(event3)).toBe(
      crypto.createHash('sha3-512').update(JSON.stringify(event3)).digest('hex')
    )
  })

  it('Creates a new deterministic key for complex data based on on SHA3-512 algorythm', () => {
    const event = {
      fieledOne: 'This is a primitive value',
      fieldTwo: 'This is the second field',
      filedThree: {
        value: ['THis is the third field'],
      },
    }
    const generatedKey = deterministicPartitionKey(event)

    expect(generatedKey).toHaveLength(128)
    expect(generatedKey).toBe(
      crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
    )
  })

  it('Returns the existing partition key if the input already already has it', () => {
    const existingKey = 'Existing partition key'

    const event = {
      hello: 'World',
      partitionKey: existingKey,
    }

    expect(deterministicPartitionKey(event)).toBe(existingKey)
  })

  it('Stringifies the existing partition key if the provided partition key is not a string value', () => {
    const existingKeyNumber = 1234
    const existingKeyArray = [1, 2, 3, 4]
    const existingKeyObject = { key: 'value' }

    const eventDefault = {
      hello: 'World',
    }

    const eventPartitionKeyNumber = {
      ...eventDefault,
      partitionKey: existingKeyNumber,
    }

    const eventParitionEventKeyArray = {
      ...eventDefault,
      partitionKey: existingKeyArray,
    }

    const eventPartitionKeyObject = {
      ...eventDefault,
      partitionKey: existingKeyObject,
    }

    expect(deterministicPartitionKey(eventPartitionKeyNumber)).toBe('1234')
    expect(deterministicPartitionKey(eventParitionEventKeyArray)).toBe(
      JSON.stringify(existingKeyArray)
    )
    expect(deterministicPartitionKey(eventPartitionKeyObject)).toBe(
      JSON.stringify(existingKeyObject)
    )
  })

  it('Creates a new deterministic key based on SHA3-512 angorythm if existing partition key is longer than 256 symbols', () => {
    const legacyKey = 'This is a string longer than 512 symbols'.repeat(50)

    const event = {
      partitionKey: legacyKey,
    }

    const generatedKey = deterministicPartitionKey(event)

    expect(generatedKey).toHaveLength(128)
    expect(generatedKey).toBe(
      crypto.createHash('sha3-512').update(legacyKey).digest('hex')
    )
  })
})
