module.exports = {
  buildPaginatedQuery: ({ page, pageSize }) => {
    const offset = (parseInt(page, 10) ) * pageSize;
    return {
      offset,
      limit: parseInt(pageSize, 10),
    };
  },
};
