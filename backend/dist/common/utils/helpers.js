"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonField = parseJsonField;
exports.stringifyJsonField = stringifyJsonField;
exports.paginate = paginate;
exports.buildPageMeta = buildPageMeta;
function parseJsonField(value, defaultValue) {
    if (!value)
        return defaultValue;
    try {
        return JSON.parse(value);
    }
    catch {
        return defaultValue;
    }
}
function stringifyJsonField(value, defaultValue = '[]') {
    if (value === undefined || value === null)
        return defaultValue;
    try {
        return JSON.stringify(value);
    }
    catch {
        return defaultValue;
    }
}
function paginate(page = 1, limit = 10) {
    const take = limit > 100 ? 100 : limit;
    const skip = (Math.max(1, page) - 1) * take;
    return { take, skip };
}
function buildPageMeta(total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page: Math.max(1, page),
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
}
//# sourceMappingURL=helpers.js.map