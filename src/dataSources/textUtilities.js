
export const blackList = /^([0-9]+|s|a|aa|at|an|the|of|on|and|to|in|for)$/;
export const splitOn = /[\-\[\]\s,.–_'’();:/"”]/;
export const propNames = ['title', 'description'];

export const getNumberFromQueryId = queryId => Number(queryId.match(/^q(?<index>\d+)$/).groups.index);