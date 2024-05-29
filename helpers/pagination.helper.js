module.exports = (query, countItems) => {
    const objPagination = {
        currentPage : 1,
        limitPerPage : 8 
    }
    

    objPagination.totalPage = Math.ceil(countItems / objPagination.limitPerPage);

    if(query.page)
    {
        objPagination.currentPage = parseInt(query.page);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitPerPage;

    return objPagination
}