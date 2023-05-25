# Sentry Report Webhook API

This project provides a Sentry report webhook API implemented as a serverless function deployed on Vercel. It allows you to send Sentry error reports to various platforms, such as Discord.

## Setup

1. Clone the repository:

   ```shell
   git clone https://github.com/ckt1031/sentry-report.git
   ```

2. Install the dependencies:

   ```shell
   pnpm install
   ```

3. Deploy the serverless function:

   ```shell
   pnpm deploy
   ```

## Usage

### Discord Webhook Integration

To send error reports to a Discord channel, you need to provide a valid Discord webhook URL and mention a role for notifications. Set the following environment variables:

- `DISCORD_WEBHOOK_URL`: The Discord webhook URL to send error reports.
- `DISCORD_MENTION_ROLE_ID`: The role ID to mention when sending error reports to Discord.

## API Endpoints

The following API endpoint is available:

- `POST /api/discord`: Send a Sentry error report to the configured Discord webhook.

## Adding the API to Sentry

To send error reports from your Sentry project to this webhook API, follow these steps:

1. Log in to your Sentry account.

2. Navigate to your project's settings.

3. Select the **Integrations** tab.

4. Search for "Webhooks" in the integration list and click on it.

5. Click the **Create webhook** button.

6. Provide a name for the webhook (e.g., "Report Webhook").

7. In the **URL** field, enter the URL of your deployed Vercel app's Discord webhook endpoint: `https://<API Domain>/api/<Prefered Integration>`.

8. Customize the other webhook settings according to your preferences.

9. Click **Save changes** to add the webhook.

Now, when errors occur in your Sentry project, they will be automatically forwarded to this webhook API and sent to the specified Discord channel.

Note: Make sure your Vercel app is deployed and the environment variable is correctly set before adding the webhook to Sentry.

## License

This project is licensed under the [MIT License](LICENSE).
