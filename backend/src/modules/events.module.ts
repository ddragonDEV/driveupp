import { HelpEvent } from "@events/help.event";
import { AuthEvent } from "@events/auth.event";
import { LocationEvent } from "@events/location.event";
import { AssistanceStatusEvent } from "@events/assistanceStatus.event";

export const EventsModule = [
    AuthEvent,
    HelpEvent,
    LocationEvent,
    AssistanceStatusEvent
];