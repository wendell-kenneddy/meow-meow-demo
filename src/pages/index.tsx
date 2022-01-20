import dynamic from 'next/dynamic';
import Head from 'next/head';

import { CatLoader } from '../components/CatLoader';

const CatModel = dynamic<{ children?: never }>(
  () => import('../components/CatModel').then((mod) => mod.CatModel),
  {
    ssr: false,
    loading: () => <CatLoader />
  }
);

const Home = () => {
  return (
    <>
      <Head>
        <meta name="description" content="NextJS and ThreeJS Meow Meow Demo." />
        <title>Meow Meow Demo</title>
      </Head>

      <main
        className={`
          my-10
          w-[90vw]
          max-w-[800px]
          mx-auto
          flex
          flex-col
          items-center
          justify-between
          gap-10
        `}
      >
        <CatModel />
      </main>
    </>
  );
};

export default Home;
