"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceEdit = exports.AssistanceCreate = exports.AssistanceEntity = exports.GetAssistancesFilter = exports.AssistanceFilterStatus = exports.AsistanceStatus = void 0;
var AsistanceStatus;
(function (AsistanceStatus) {
    AsistanceStatus["InProcess"] = "InProcess";
    AsistanceStatus["Canceled"] = "Canceled";
    AsistanceStatus["Completed"] = "Completed";
    AsistanceStatus["Aborted"] = "Aborted";
})(AsistanceStatus = exports.AsistanceStatus || (exports.AsistanceStatus = {}));
var AssistanceFilterStatus;
(function (AssistanceFilterStatus) {
    AssistanceFilterStatus[""] = "";
    AssistanceFilterStatus["InProcess"] = "InProcess";
    AssistanceFilterStatus["Canceled"] = "Canceled";
    AssistanceFilterStatus["Completed"] = "Completed";
    AssistanceFilterStatus["Aborted"] = "Aborted";
})(AssistanceFilterStatus = exports.AssistanceFilterStatus || (exports.AssistanceFilterStatus = {}));
class GetAssistancesFilter {
}
exports.GetAssistancesFilter = GetAssistancesFilter;
class AssistanceEntity {
}
exports.AssistanceEntity = AssistanceEntity;
class AssistanceCreate {
}
exports.AssistanceCreate = AssistanceCreate;
class AssistanceEdit {
}
exports.AssistanceEdit = AssistanceEdit;
