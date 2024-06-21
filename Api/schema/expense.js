module.exports = {
    expense: {
        $id: 'expense',
        type: 'object',
        properties: {
        amount: { type: 'number' },
        title: { type: 'string' },
        date: { type: 'string', format: 'date-time' }
        },
        required: ['amount', 'title']
    }
};
