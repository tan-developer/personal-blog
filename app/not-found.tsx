export default function NotFound() {
  return (
    <>
      <div className="">
        <div className="pt-8 pb-24">
          <h1 className="text-7xl font-black tracking-tight md:font-serif md:text-2xl md:font-medium md:italic md:tracking-tight md:text-gray-500 dark:md:text-gray-400 hyphens">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-medium tracking-tight text-gray-600 dark:text-gray-400 md:mt-0 md:text-6xl md:font-black md:text-black dark:md:text-white">
            Something went wrong...
          </h2>
        </div>

          <img
            src="https://kailoon.com/_next/image?url=%2Fstatic%2Fimages%2Ferrorimage.png&w=1920&q=75"
            className="bg-white"
          />
        <a className="underline text-center block my-8 text-sm" href="/">
          Go back to homepage.
        </a>
      </div>
    </>
  );
}
