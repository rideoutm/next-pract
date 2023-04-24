import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>NextJS Meetups</title>
        <meta name="description" content="browse list of React meetups" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from API
  //   MongoClient.connect();

  const client = await MongoClient.connect(
    "mongodb+srv://mrideout17:nHGPQzaHU2uMhmO6@cluster0.u5hp5c9.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
