export default async function Loading() {
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:t-20 min-h-screen md:pt-20 flex [&>*]:w-full flex-col">
      <div className="flex justify-center items-center h-full">
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </main>
  );
}
