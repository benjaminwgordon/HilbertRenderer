const BlogPageLayout = (page) => {
  return (
    <div className="flex flex-col justify-center content-center flex-wrap">
      <main className="max-w-xl w-full h-full ">
        <div className="mt-8">{page}</div>
      </main>
    </div>
  );
};

export default BlogPageLayout;
