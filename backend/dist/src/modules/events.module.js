"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const help_event_1 = require("@events/help.event");
const auth_event_1 = require("@events/auth.event");
const location_event_1 = require("@events/location.event");
const assistanceStatus_event_1 = require("@events/assistanceStatus.event");
exports.EventsModule = [
    auth_event_1.AuthEvent,
    help_event_1.HelpEvent,
    location_event_1.LocationEvent,
    assistanceStatus_event_1.AssistanceStatusEvent
];
