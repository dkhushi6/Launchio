import SearchRepo from "@/components/hero-section/search-repo";

const page = () => {
  return (
    <main className="h-full">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-block text-xs font-medium  px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          Deploy in seconds
        </span>
        <h1 className="text-5xl font-bold tracking-tight  mb-4 leading-tight">
          Ship your GitHub repos <br /> instantly
        </h1>
        <p className=" text-lg mb-10 text-muted-foreground">
          Search any public repository and deploy it with a single click.
        </p>

        <SearchRepo />
      </section>
    </main>
  );
};

export default page;
