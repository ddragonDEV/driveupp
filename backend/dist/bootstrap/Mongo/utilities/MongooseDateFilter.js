"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Period = exports.dateQueryFilter = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dateQueryFilter = (dates) => {
    var _a;
    if (dates.startDate === "")
        dates.startDate = undefined;
    if (dates.endDate === "")
        dates.endDate = undefined;
    return {
        startDate: (0, dayjs_1.default)((_a = dates.startDate) !== null && _a !== void 0 ? _a : "2022-01-01")
            .hour(0)
            .minute(0)
            .second(0)
            .toDate(),
        endDate: (dates === null || dates === void 0 ? void 0 : dates.endDate) ? (0, dayjs_1.default)(dates.endDate).hour(23).minute(59).second(59).toDate() : (0, dayjs_1.default)().toDate()
    };
};
exports.dateQueryFilter = dateQueryFilter;
class Period {
}
exports.Period = Period;
