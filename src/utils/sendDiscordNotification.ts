import axios from "axios";

export async function sendDiscordNotification(title: string, link: string) {
    const webHook =
        "https://discord.com/api/webhooks/1153271721894363196/HlV_xai84byXxf9y8r64CQfAkXfjNBRNB86PHufKufaJwDE45CGRpyQimUx60Z_ZxanS";
    const data = {
        content: `A new resource has been added:\n*${title}*\n\nPlease follow the link to view:\n${link}`,
    };
    await axios.post(webHook, data);
}
