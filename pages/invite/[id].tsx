import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import admin from "firebase-admin";

interface PropsData {
  domain: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (admin.apps.length == 0) {
    admin.initializeApp();
  }
  const host = req.headers.host;
  const projectId = admin.instanceId().app.options.projectId;

  let domain = `https://${projectId}.web.app`;
  if (host?.includes("localhost") || host?.includes("127.0.0.1")) {
    domain = "https://echo-photos-dev.web.app";
  }

  let propsData: PropsData = {
    domain: domain,
  };

  return {
    props: propsData,
  };
};

export default function InvitePage(props: PropsData) {
  const router = useRouter();
  const fullInviteId = router.query.id as string;
  const inviteCode = fullInviteId.substring(0, 8);

  return (
    <>
      <Head>
        <title>Title Example</title>
      </Head>

      <section>
        Hello "{props.domain}" with code {inviteCode}
      </section>
    </>
  );
}
