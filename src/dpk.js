const crypto = require('crypto')

function createStringHash(string) {
  return crypto.createHash('sha3-512').update(string).digest('hex')
}

/**
 * Returns the existing deterministic key of the event
 *
 * @param {any} event
 * @returns  deterministic key of the provided event
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0'
  const MAX_PARTITION_KEY_LENGTH = 256

  // No data, return trivial partition key
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }

  // The data has specified partition key
  if (event?.partitionKey) {
    const existingPartitionKey = event?.partitionKey
    const existingPartitionKeyStringified =
      typeof existingPartitionKey === 'string'
        ? existingPartitionKey
        : JSON.stringify(existingPartitionKey)

    // The existing key is longer than MAX_PARTITION_KEY_LENGTH
    if (existingPartitionKeyStringified.length > MAX_PARTITION_KEY_LENGTH) {
      return createStringHash(existingPartitionKeyStringified)
    }

    return existingPartitionKeyStringified
  }

  // The event doesn't have a partition key, create one
  const data = JSON.stringify(event)

  return createStringHash(data)
}
