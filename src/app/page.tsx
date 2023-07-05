"use client";

import { trpc } from "@/utils/trpc";

const HomePage: React.FC = () => {
  const { data } = trpc.channel.getId.useQuery();

  return (
    <div>
      {/* <button onClick={() => refetch()}>Get stuff</button> */}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default HomePage;
