import { handleCronEvent } from "./handlers/cron-handler";

export default {
  /**
   * Scheduled event listener for Cron Triggers.
   * @param event - The scheduled event triggered by Cron.
   * @param env - The environment object containing secrets like the API URL.
   */
  scheduled(event: ScheduledEvent, env: { API_URL: string }) {
    handleCronEvent(event, env);
  },
};
