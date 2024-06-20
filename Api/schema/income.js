//Export and create of the schema for the income object
module.exports = {
  income: {
    $id: 'income',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      title: { type: 'string' },
    },
    required: ['amount', 'title']
  }
};
