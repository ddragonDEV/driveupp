export const mongoosePagination = (page: number = 1, rowsPerPage: number = 5): PaginationMongoParams => {
    if (page < 1) page = 1;
    if (rowsPerPage < 1) rowsPerPage = 5;

    return {
        currentPage: page,
        skip: (page - 1) * rowsPerPage,
        limit: rowsPerPage
    };
};


export const paginateQuery = (data: Query): QueryPaginated => {
    return {
        list: data.items,
        totalItems: data.totalItems,
        rowsPerPage: data.rowsPerPage,
        currentPage: data.currentPage,
        pages: Math.ceil(data.totalItems / data.rowsPerPage)
    };
};

export interface Pagination {
    page: number;
    rowsPerPage: number;
}

interface PaginationMongoParams {
    currentPage: number;
    skip: number;
    limit: number;
}

interface Query {
    items: any[];
    totalItems: number;
    rowsPerPage: number;
    currentPage: number;
}

interface QueryPaginated {
    list: any[];
    totalItems: number;
    rowsPerPage: number;
    currentPage: number;
    pages: number;
}