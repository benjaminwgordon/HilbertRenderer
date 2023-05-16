const BlogIndexLayout = (page) => {
  return (
    <div className="flex flex-col justify-center content-center flex-wrap bg-black text-white">
      <main className="max-w-3xl w-full h-full ">
        <div className="mt-8">{page}</div>
      </main>
    </div>
  );
};

export default BlogIndexLayout;
