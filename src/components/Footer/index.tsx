import Link from 'next/link';

export const Footer = () => (
  <footer className="w-[90vw] max-w-[800px] mx-auto flex items-center justify-center my-10">
    <p className="text-white">
      This work is based on{' '}
      <Link href="https://sketchfab.com/3d-models/cat-655edd88cfa74d2cafc13c7aa387d137">
        <a className="underline hover:no-underline text-yellow-400">
          &quot;Cat&quot;
        </a>
      </Link>{' '}
      by{' '}
      <Link href="https://sketchfab.com/miss86615">
        <a className="underline hover:no-underline text-yellow-400">
          Miss86615
        </a>
      </Link>{' '}
      licensed under the{' '}
      <Link href="https://creativecommons.org/licenses/by/4.0/">
        <a className="underline hover:no-underline text-yellow-400">
          CC-BY-4.0
        </a>
      </Link>
      .
    </p>
  </footer>
);
