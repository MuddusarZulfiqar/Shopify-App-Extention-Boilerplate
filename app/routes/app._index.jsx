/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { TitleBar } from "@shopify/app-bridge-react";
import {
  BlockStack,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  RadioButton,
  Spinner,
  TextField
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  const pageOptions = await prisma.pageOption.findMany({})

  return { data: pageOptions }
};

export const action = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const formData = await request.formData();
  const bannerText = formData.get("bannerText");
  const pageOption = formData.get("pageOption");
  if (!bannerText || !pageOption) {
    return { error: "Please Provide banner text", success: false };
  }

  const session = await prisma.session.findUnique({
    where: {
      id: auth.session.id
    }
  })

  const count = await prisma.setting.count({
    where: {
      sessionId: session.session_id,
    }
  })
  if(count === 2){
    return { error: "You can only have 2 settings", success: false };
  }
  await prisma.setting.create({
    data: {
      text: bannerText,
      pageOptionId: parseInt(pageOption),
      sessionId: session.session_id,
    },
  });
  return {success:true};
};

export default function Index() {

  const fetcher = new useFetcher();
  const { data } = useLoaderData();

  const [bannerText, setBannerText] = useState("");
  const [pageOption, setPageOption] = useState(1);
  const [pageOptions, setPageOptions] = useState(data);
  const isLoading = fetcher.state !== "idle";
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show('Page Setting saved.')
    }
    if (fetcher.data?.error) {
      setErrorMessage(fetcher.data.error);
    } else {
      setErrorMessage("");
    }
  }, [fetcher.data]);

  return (
    <Page>
      <TitleBar title="Shopify Remix Boiler Plate">
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <p>Welcome to the Shopify Remix Boiler Plate</p>
              <fetcher.Form method="post">
                <FormLayout>
                  <TextField
                    name="bannerText"
                    label="Banner Text"
                    value={bannerText}
                    onChange={setBannerText}
                    autoComplete="off"
                    error={errorMessage}
                  />
                  <div>
                    {pageOptions.map((option) => (
                      <RadioButton
                        key={option.id}
                        label={option.title}
                        checked={pageOption === option.id}
                        onChange={() => setPageOption(option.id)}
                      />
                    ))}
                  </div>
                  <input type="hidden" name="pageOption" value={pageOption} />
                  <Button submit primary disabled={isLoading}>
                    {isLoading ? <Spinner size="small" /> : "Save"}
                  </Button>
                </FormLayout>
              </fetcher.Form>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
