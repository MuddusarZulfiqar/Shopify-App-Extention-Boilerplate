/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { TitleBar } from "@shopify/app-bridge-react";
import {
  Card,
  Layout,
  Page,
  DataTable,
  Spinner,
  Button
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import prisma from "../db.server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const session = await prisma.session.findUnique({
    where: {
      id: auth.session.id,
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

  return { data: settings };
};

export const action = async ({ request }) => {
  const auth = await authenticate.admin(request);
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const settingId = parseInt(formData.get("settingId"));

    if (!settingId) {
      return { success: false, error: "Invalid setting ID" };
    }

    await prisma.setting.delete({
      where: { id: settingId },
    });

    const session = await prisma.session.findUnique({
      where: {
        id: auth.session.id,
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

    return { success: true, data: settings };
  }

  return { success: false, error: "Invalid request method" };
};

export default function AdditionalPage() {
  const { data } = useLoaderData();
  const [settings, setSettings] = useState(data);

  const fetcher = useFetcher();

  const handleDelete = (id) => {
    fetcher.submit(
      { settingId: id },
      { method: "DELETE", action: "/app/additional" }
    );
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show("Page Setting Deleted.")
      setSettings(fetcher.data.data);
    }
    if (fetcher.data?.data) {
      setSettings(fetcher.data.data);
    }
  }, [fetcher.data]);

  const rows = settings.map((setting) => [
    setting.id,
    setting.text,
    setting.pageOption?.title || "N/A",
    <Button destructive onClick={() => handleDelete(setting.id)}>
      Delete
    </Button>,
  ]);

  return (
    <Page>
      <TitleBar title="Settings Table" />
      <Layout>
        <Layout.Section>
          <Card title="All Settings">
            <DataTable
              columnContentTypes={["numeric", "text", "text", "text"]}
              headings={["ID", "Text", "Page Option", "Action"]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
