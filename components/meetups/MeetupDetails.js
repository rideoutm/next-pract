import styles from "./MeetupDetails.module.css";

export default function MeetupDetails({ image, title, address, description }) {
  return (
    <section className={styles.detail}>
      <img src={image} alt={title} />
      <h1>A first meetup</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}
