import { AtpAgent } from "@atproto/api";
import instance from "../api/instance";
import { json } from "stream/consumers";
require("dotenv").config();

const startSession = async () => {
  const url = "https://api.coingecko.com/api/v3/";
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
