//Export and create of the schema for the income object
module.exports = {
  income: {
    $id: 'income',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      title: { type: 'string' },
      date: { type: 'string', format: 'date-time'}
    },
    required: ['amount', 'title']
  }
};
