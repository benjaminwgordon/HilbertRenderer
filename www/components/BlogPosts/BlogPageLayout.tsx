const BlogPageLayout = (page) => {
  return (
    <div className="flex flex-col justify-center content-center flex-wrap bg-black text-white">
      <main className="max-w-2xl w-full h-full ">
        <div className="mt-8">{page}</div>
      </main>
    </div>
  );
};

export default BlogPageLayout;
