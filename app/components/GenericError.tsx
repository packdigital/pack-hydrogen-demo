export function GenericError({error}: {error?: {message: string}}) {
  // TODO hide error in prod?
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }

  return (
    <section className="container flex items-center justify-center border border-dashed border-red-400 py-56 rounded-lg">
      <pre className="text-red-400">An error has occurred on this page</pre>
    </section>
  );
}
