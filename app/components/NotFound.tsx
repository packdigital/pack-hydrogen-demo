export function NotFound({type = 'page'}: {type?: string}) {
  const heading = `We've lost this ${type}`;
  const description = `We couldn't find the ${type} you're looking for. Try checking the URL or heading back to the home page.`;

  return (
    <section className="container">
      <h1>{heading}</h1>
      <p>{description}</p>
    </section>
  );
}
