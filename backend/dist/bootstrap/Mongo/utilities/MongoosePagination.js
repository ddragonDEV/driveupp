"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateQuery = exports.mongoosePagination = void 0;
const mongoosePagination = (page = 1, rowsPerPage = 5) => {
    if (page < 1)
        page = 1;
    if (rowsPerPage < 1)
        rowsPerPage = 5;
    return {
        currentPage: page,
        skip: (page - 1) * rowsPerPage,
        limit: rowsPerPage
    };
};
exports.mongoosePagination = mongoosePagination;
const paginateQuery = (data) => {
    return {
        list: data.items,
        totalItems: data.totalItems,
        rowsPerPage: data.rowsPerPage,
        currentPage: data.currentPage,
        pages: Math.ceil(data.totalItems / data.rowsPerPage)
    };
};
exports.paginateQuery = paginateQuery;
