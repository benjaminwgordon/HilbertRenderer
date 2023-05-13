import HilbertThreeRenderer from "../components/HilbertThreeRenderer";

function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center bg-black max-w-screen ">
      <div className="mx-auto text-center mt-32 max-w-4xl text-gray-200 text-lg xl:text-3xl text-center z-10">
        <p className="mb-12 font-poppins font-semibold">Hi there, I'm Ben.</p>
        <p className="font-poppins font-semibold">
          I'm a software engineer focused on Rust, TypeScript, WebAssembly, 3D
          Graphics, and Full-Stack Web Development.
        </p>
      </div>
      <div className="m-auto -mt-28 h-full w-full z-0">
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
    </div>
  );
}

export default HomePage;
