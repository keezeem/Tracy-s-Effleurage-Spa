/**
 * DEMO AVAILABILITY. Nothing here reflects Tracy's real calendar.
 * To connect a real service, replace the slot logic in BookingFlow with an API call.
 */
export const demoTimeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"] as const;

/** Weekdays (0 = Sunday) the demo pretends to be closed. */
export const demoClosedWeekdays: number[] = [0];

/** How many days ahead the demo date picker shows. */
export const demoDaysAhead = 14;
