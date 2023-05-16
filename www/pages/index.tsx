import Link from "next/link";
import HilbertThreeRenderer from "../components/HilbertThreeRenderer";

function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center bg-black max-w-screen font-sourcecodepro">
      <div className="mx-auto text-center mt-12 max-w-3xl text-gray-200 text-lg xl:text-3xl text-center z-10">
        <p className="mb-12 text-4xl">Hi there, I'm Ben.</p>
        <p className="mb-8 font-light">
          I'm a software engineer focused on Rust, TypeScript, WebAssembly, 3D
          Graphics, and Full-Stack Web Development.
        </p>
      </div>
      <div className="m-auto h-3/4 w-full z-0">
        <HilbertThreeRenderer
          initN={3}
          initP={2}
          initPipeThickness={0.2}
          initGeometryType={"square"}
          isControlEnabled={false}
          isSpinning={true}
          isCameraOffSetY={true}
          rotationSpeed={0.006}
        />
      </div>
      <div className="text-center h-1/2 w-full p-4 z-10  max-w-3xl mx-auto">
        <p className=" font-light text-white">
          I generated this Hilbert Curve using Rust and Web Assembly.
          <Link href={"/blog"} className="text-blue-400">
            {" "}
            Come find out how on my blog!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
