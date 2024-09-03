import { AtpAgent } from "@atproto/api";
import instance from "../api/instance";

const startSession = async () => {
  const agent = new AtpAgent({
    service: "https://bsky.social/",
  });

  await agent.login({
    identifier: process.env.BLUESKY_EMAIL!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  const { brl } = await instance
    .get("/simple/price?ids=usd&vs_currencies=brl")
    .then((response) => response.data.usd);

  if (brl) {
    await agent.post({
      text: `The current dollar price is: R$${brl}`,
      createdAt: new Date().toISOString(),
    });
  }
};

startSession();
