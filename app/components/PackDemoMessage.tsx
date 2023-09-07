export const PackDemoMessage = () => {
  return (
    <div className="bg-black py-6 px-4 rounded text-white text-sm text-center font-light">
      <>
        This is a simple demo storefront brought to you by{' '}
        <a
          href="https://packdigital.com"
          target="_blank"
          className="underline text-[#00BE8E]"
          rel="noreferrer"
        >
          Pack
        </a>
        . <br />
        <br />
        <div className="grid gap-2 max-w-xs mx-auto">
          <a
            target="_blank"
            href="https://github.com/packdigital/pack-hydrogen-demo"
            className="px-4 py-1 border border-[#00bE8E] rounded hover:underline"
            rel="noreferrer"
          >
            Explore this demo on GitHub &rarr;
          </a>
        </div>
      </>
    </div>
  );
};
