import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetails from "../../components/meetups/MeetupDetails";

export default function MeetupPage({ meetupData: { image, title, address, description } }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <MeetupDetails image={image} title={title} address={address} description={description} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mrideout17:nHGPQzaHU2uMhmO6@cluster0.u5hp5c9.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  // fetch data for single meetup

  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://mrideout17:nHGPQzaHU2uMhmO6@cluster0.u5hp5c9.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
