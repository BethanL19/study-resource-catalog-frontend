import axios from "axios";

export async function sendDiscordNotification(title: string, link: string) {
    const webHook =
        "https://discord.com/api/webhooks/1153254736984801342/iVEkwNcgW4Jt8V1aXTcIogFlerQLheMFW4FFUXGLUHAkDX9WW7MtUtX-zvYxe1PyDhmF";
    const data = {
        content: `A new resource has been added:\n*${title}*\n\nPlease follow the link to view:\n${link}`,
    };
    await axios.post(webHook, data);
}
