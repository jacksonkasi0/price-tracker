import { makeApiCall } from '../utils/api-client';

/**
 * Handles the scheduled cron event.
 * @param event - The scheduled event triggered by Cron.
 * @param env - The environment object containing secrets like the API URL.
 */
export async function handleCronEvent(event: ScheduledEvent, env: { API_URL: string }): Promise<void> {
	event.waitUntil(makeApiCall(env));
}
