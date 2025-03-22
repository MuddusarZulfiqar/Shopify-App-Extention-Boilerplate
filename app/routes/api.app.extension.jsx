import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { title } from "process";

if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
}

const prisma = global.prismaGlobal ?? new PrismaClient();

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  const session = await prisma.session.findFirst({
    where: {
      shop: shop,
    },
  });

  const settings = await prisma.setting.findMany({
    where: {
      sessionId: session.session_id,
    },
    include: {
      pageOption: true,
    },
  });
  return json(
    settings.length > 0
      ? { success: true, settings }
      : { success: false, message: "No settings found" },
    {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  );
};
