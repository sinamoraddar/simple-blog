import Image from "next/image";

const Card = () => (
  <div>
    <h3>Title</h3>

    <p>Short desc</p>
  </div>
);

export default function Home() {
  return (
    <main>
      <Card />
    </main>
  );
}
