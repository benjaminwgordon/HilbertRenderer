import React from "react";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import Section from "../../components/BlogPosts/Section";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";
import Link from "../../components/Link";
import NextLink from "next/link";
import DarkCodeBlock from "../../components/BlogPosts/DarkCodeBlock";

const HilbertCurves4 = () => {
  const HilbertCurves1Metadata: BlogPostMetaDataType = BlogPostMetaDataSet[3];
  const { id, slug, title, author, publishDate, blurb } =
    HilbertCurves1Metadata;

  return (
    <div className="m-2">
      <article className="">
        <BlogPostMetaDataDisplay
          id={id}
          slug={slug}
          title={title}
          author={author}
          publishDate={publishDate}
          blurb={blurb}
        />

        <Section>
          <div className="w-full h-96 mb-8 flex justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={5}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              rotationSpeed={0.003}
              isCameraOffSetY={false}
            />
          </div>
          <p className="mb-8">
            This is part 4 of a series on Hilbert Curves. To start from the
            beginning, please visit{" "}
            <Link
              target={"/blog/HilbertCurves1"}
              displayTarget={BlogPostMetaDataSet[0].title}
            />
          </p>
          <p className="mb-8">
            Fair warning, this is the part where we dig into the algorithm
            behind my implementation of Hilbert Curve Coordinate generation. If
            you landed on this blog to see 3D generative geometry and you don't
            want to see any math, then{" "}
            <Link
              target={"/blog/HilbertCurves3"}
              displayTarget={"Hilbert Curve Sandbox"}
            />{" "}
            is the last new render to see.
          </p>
          <p className="mb-8">
            If you are interested in how I render these Hilbert Curves using
            WebGL and ThreeJS, you are also welcome to skip to the next post in
            the series where I walk through that process:{" "}
            <Link
              target={"/blog/HilbertCurves5"}
              displayTarget={BlogPostMetaDataSet[4].title}
            />
          </p>
          <p className="mb-8">
            If you are here to see the algorithm, then welcome! I'll be
            providing code examples in Rust.
          </p>
          <section className="mb-8 p-4 rounded-md bg-gray-200">
            <h4 className="underline mb-4 font-semibold">
              {" "}
              A note on my implementation:
            </h4>
            <p>
              {" "}
              The Skilling Transform requires precise bit manipulation, but I
              expect that most of us (including me), aren't using bitwise
              operators regularly in our day jobs. Anywhere where bitwise
              manipulation of integers would have been optimal, I have chosen to
              instead represent the numbers as arrays of booleans. While the
              resulting code may be slower to execute, I hope this will make the
              code more accessible.
            </p>
          </section>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Recursive Generation of Hilbert Curve Coordinates
          </h3>
          <p className="mb-8 ">
            Hilbert Curves were first described in 1891, as a close relative to
            the previously existing Peano curve. Since Hilbert Curves are
            fractal, the common way to generate them involves recursion. In
            fact, the algorithm I briefly described in Part 1 of this series is
            a recursive algorithm. Since the recursive algorithm is the most
            readily accessible one in most other online sources, I won't spend
            any further time discussing it here. I only mention it as context
            for the algorithm I will be describing, whose main differentiating
            factor is that it is iterative, not recursive.
          </p>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Hilbert Curves as a Transformation of Binary Reflected Gray Codes
          </h3>
          <p className="mb-8 ">
            The algorithm I set out to recreate was proposed by John Skilling in
            2003. It fundementally relies on Binary Reflected Gray Codes, which
            are fascinating and widely useful patterns. Essentially, they are an
            alternate counting system in Binary, that hold an important
            property: only one bit of the binary representation changes between
            any adjacent numbers. Below, I've posted a Rust Iterator I've
            written that generates Binary Reflected Gray Codes. (I know I said I
            wouldn't use bitwise operators in my code examples, but the
            generation of BRGC's isn't the core of this blog post.)
          </p>
          <DarkCodeBlock
            text={`#[derive(Debug)]
pub struct Brgc {
    // callers will typically create the iterator with index = 0
    pub index: u32,
}

impl Iterator for Brgc {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        let gray = self.index ^ (self.index >> 1);
        self.index += 1;
        Some(gray)
    }
}`}
            language={"rust"}
          />
          <p className="mb-8 ">
            Implenting BRGC's as an iterator is particularly useful for my
            purposes, because the amount of BRGC's necessary for generating a
            particular Hilbert Curve varies depending on the dimensions and
            order of the Hilbert Curve.
          </p>
          <p className="mb-8 ">
            Here is an example of the iterator being used to print the first 8
            BRGC codes:
          </p>
          <DarkCodeBlock
            text={`fn main() {
    let brgc = Brgc { index: 0 };
    brgc.take(8).for_each(|code| {
        println!("{:03b}", code);
    })
}

  // Results in the first 8 BRGC codes:
  000
  001
  011
  010
  110
  111
  101
  100
  `}
            language={"rust"}
          />
          <p className="mb-8 ">
            Note that in the above example, each binary number in the BRGC
            sequence differs by only one bit. This shares a strong similarity
            with one of the core attributes of a Hilbert Curve! In a Hilbert
            Curve, the vector between any two adjacent vertices will have length
            1, and will only differ in x, y, or z (exclusively). To state that
            more plainly, the lines in a Hilbert Curve are all horizontal or
            vertical, there are no diagonal lines. Starting with a BRGC as the
            basis for our algorithm gives us a head-start on creating that
            behavior in our resulting Hilbert Curves.
          </p>
          <p className="mb-8 ">
            This will become more clear once we work through another core
            principle of this algorithm: assigning bits of the gray codes to
            axes in a 2D or 3D vector.
          </p>
          <p className="mb-8 ">
            For example, using the bit string 110 we can map the digits to 3
            axes:{" "}
          </p>
          <table className="text-xl mb-8">
            <tbody>
              <tr className="border">
                <td className="border p-1 px-2">x</td>
                <td className="border p-1 px-2">y</td>
                <td className="border p-1 px-2">z</td>
              </tr>
              <tr className="border">
                <td className="border p-1 px-2">1</td>
                <td className="border p-1 px-2">1</td>
                <td className="border p-1 px-2">0</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-8 ">
            When the bit string is longer, we can assign digits by rotation, for
            example 011010:{" "}
          </p>
          <table className="text-xl mb-8 text-center">
            <tbody>
              <tr className="border">
                <td className="border p-1 px-4">x</td>
                <td className="border p-1 px-4">y</td>
                <td className="border p-1 px-4">z</td>
                <td className="border p-1 px-4">x</td>
                <td className="border p-1 px-4">y</td>
                <td className="border p-1 px-4">z</td>
              </tr>
              <tr className="border">
                <td className="border p-1 px-4">0</td>
                <td className="border p-1 px-4">1</td>
                <td className="border p-1 px-4">1</td>
                <td className="border p-1 px-4">0</td>
                <td className="border p-1 px-4">1</td>
                <td className="border p-1 px-4">0</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-8 ">
            Then, we can combine the x, y, and z bits respectively:
          </p>
          <table className="text-xl mb-8 text-center">
            <tbody>
              <tr className="border">
                <td className="border p-1 px-4">x</td>
                <td className="border p-1 px-4">y</td>
                <td className="border p-1 px-4">z</td>
              </tr>
              <tr className="border">
                <td className="border p-1 px-4">00</td>
                <td className="border p-1 px-4">11</td>
                <td className="border p-1 px-4">10</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-8 ">
            Converting these from binary into decimal integers results in the x,
            y, and z components of a 3D Vector, which can be used as a position
            for this vertex.
          </p>
          <table className="text-xl mb-8 text-center">
            <tbody>
              <tr className="border">
                <td className="border p-1 px-4">x</td>
                <td className="border p-1 px-4">y</td>
                <td className="border p-1 px-4">z</td>
              </tr>
              <tr className="border">
                <td className="border p-1 px-4">0</td>
                <td className="border p-1 px-4">3</td>
                <td className="border p-1 px-4">2</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-8 ">
            If we perform this operation for the first 8 BRGC numbers, we can
            see get 8 vertex coordinates in 3D:
          </p>
          <table className="text-xl mb-8 text-center">
            <thead>
              <tr>
                <th className="border p-1 px-4">BRGC</th>
                <th className="border p-1 px-4">Binary (x,y,z)</th>
                <th className="border p-1 px-4">Decimal (x,y,z)</th>
              </tr>
            </thead>
            <tbody>
              {[
                "010010",
                "010011",
                "010001",
                "010000",
                "110000",
                "110001",
                "110011",
                "110010",
              ].map((brgc) => {
                return (
                  <tr key={brgc}>
                    <td className="border p-1 px-4">{brgc}</td>
                    <td className="border p-1 px-4">
                      {`(${brgc.charAt(0)}${brgc.charAt(3)}, ${brgc.charAt(
                        1
                      )}${brgc.charAt(4)}, ${brgc.charAt(2)}${brgc.charAt(5)})`}
                    </td>
                    <td className="border p-1 px-4">
                      {`(${parseInt(
                        brgc.charAt(0) + brgc.charAt(3),
                        2
                      )}, ${parseInt(
                        brgc.charAt(1) + brgc.charAt(4),
                        2
                      )}, ${parseInt(brgc.charAt(2) + brgc.charAt(5), 2)})`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mb-2 ">
            It would be very nice if these happened to be the coordinates to the
            first 8 vertices of a Hilbert Curve, but there is a big problem with
            the data we've generated so far. Let's review a few rules we've set
            for a Hilbert Curve:
          </p>
          <p className="mb-2 ">
            For each pair of sequential vertices, the vector between them must
            follow these rules:
          </p>
          <ul className="list-disc ml-8 mb-8">
            <li>
              The vector should change in x, y, or z (exclusively). This makes
              the line vertical or horizontal.
            </li>
            <li>The vector should have length 1</li>
          </ul>
          <p className="pb-8">
            This mapping of the BRGC's to Vertices accomplishes goal #1 (each
            sequential pair only changes in x, y, or z), but fails goal #2. The
            length of the x component of the vector is more than 1 when we jump
            from 010000 to 110000, since the x component moves from 0 to 2.
          </p>
          <p className="pb-8">
            Even though the generated coordinates aren't quite right yet, this
            pattern of extracting the x, y, and z components a binary string
            will still be the first step in our final algorithm. Below is my
            Rust code that seperates out the (x,y,z) components from a u32.
            Since both 2D and 3D curves are of interest to me for rendering,
            there is a seperate function that supports breaking a u32 into 2D
            coordinates.
          </p>
          <DarkCodeBlock
            text={`pub fn into_xyz_binary_3d(hilbert_coordinates: u32, n: u32, p: u32) -> (u32, u32, u32) {
    let binary_hilbert_encoded_coordinates = format!("{:b}", hilbert_coordinates);
    // insert any necessary leading zeros so that the string is N * P characters
    // this is necessary to ensure each bit is correctly
    // assigned to its x,y, or z axis
    let mut padding = String::new();
    while binary_hilbert_encoded_coordinates.len() + padding.len() < (n * p) as usize {
        padding.push_str("0");
    }
    padding.push_str(&binary_hilbert_encoded_coordinates);
    let padded_hilbert_coordinate_string = padding;

    // take every nth character and assign it to its axis
    // three axis decoding, x,y,z coordinates
    let x = padded_hilbert_coordinate_string
        .chars()
        .step_by(3)
        .collect::<String>()
        .parse::<u32>()
        .unwrap();
    let y = padded_hilbert_coordinate_string
        .chars()
        .skip(1)
        .step_by(3)
        .collect::<String>()
        .parse::<u32>()
        .unwrap();
    let z = padded_hilbert_coordinate_string
        .chars()
        .skip(2)
        .step_by(3)
        .collect::<String>()
        .parse::<u32>()
        .unwrap();
    (x, y, z)
}`}
            language={"rust"}
          />
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Undoing Excess Rotation with the Skilling Transform
          </h3>
          <p className="pb-8">
            As it turns out, the vertex positions we've generated by mapping the
            BRGCs are the result of applying too many rotations to the
            underlying lower-order Hilbert Curves. What we need now is a way to
            "undo" excess rotations to bring these vertices back into their
            correct positions. This is where the algorithm proposed by John
            Skilling enters the picture.
          </p>
          <p className="pb-8">
            Here is the algorithm as described by John Skilling. There is a fair
            bit of ambiguous language, so I'll follow up with an explanation,
            and my implementation.
          </p>
          <DarkCodeBlock
            text={`for (r = p - 2, p - 3, ..., 1, 0)
  for (i = n - 1, n - 2, ..., 1, 0)
    if (bit r of Xi if OFF)
      exchange low bits r + 1, r + 2, ..., p - 1, of Xi and X0
    else
      invert low bits of X0`}
            language={"text"}
          />
          <p className="mb-8">
            Essentially, we want to walk through each bit of the brgc, starting
            at the lowest-order bit and walking left. For each bit, we check to
            see whether that bit is 0 or 1. Depending on that result, we perform
            one of two types of bit swapping operations. I'll call these two
            operations <span className="font-bold italic">exchange</span> and{" "}
            <span className="font-bold italic">invert</span>, and provide a
            visual explanation of each below.
          </p>
        </Section>

        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            The Invert Operation
          </h3>{" "}
          <p className="mb-8">
            We will start with the inversion operation, as it is simpler.
          </p>
          <p className="mb-8">
            For all the bits that are associated with the same dimension (x, y,
            or z) as the current control bit (the bit we checked in the last
            step for whether it was 0 or 1), we want to flip that bit.
          </p>
          <DarkCodeBlock
            text={`// n is the number of dimensions (2 or 3)
// p is the number of bits assigned to each axis
  let mut i = n * p - n;
  while i > r && i >= n {
    hilbert_index_bitvec[i] = !hilbert_index_bitvec[i];
    i -= n;
  }`}
            language={"rust"}
          />
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            The Exchange Operation
          </h3>{" "}
          <p className="mb-8">
            The exchange operation is a little bit more involved. First, we
            determine which axis the control bit is associated with (I'll call
            this the "control bit axis"). Then, for each lower order set (x,y)
            or (x,y,z), we will swap the x bit in that set with the control axis
            bit in that set.
          </p>
          <p></p>
          <DarkCodeBlock
            text={`// swap the lower-order x bits with x,y, or z bits
  let offset = r % n;
  let mut s = (p * n - n) + offset;
  let mut q = (p * n - n);
  while q > r {
      hilbert_index_bitvec.swap(q, s);
      q -= n;
      s -= n;
  }`}
            language={"rust"}
          />
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Putting it All Together
          </h3>{" "}
          <p className="mb-8">
            You might have noticed that Skilling Pseudocode uses a nested loop.
            I flattened the loop and use a bit of modulus math as I find it
            easier to reason through. <br />
            <br />
            Here is my adjusted implementation:
          </p>
          <DarkCodeBlock
            text={`
  // rust ranges using .. count up, not down, so we use .rev() to get an iterator that counts down through the range
  for r in (0..(&hilbert_index_bitvec.len() - n)).rev() {
    if hilbert_index_bitvec[r] {
      // run the invert operation shown above
      let mut i = n * p - n;
      while i > r && i >= n {
          hilbert_index_bitvec[i] = !hilbert_index_bitvec[i];
          i -= n;
      }
    } else {
      // run the exchange operation shown above
        let offset = r % n;
        let mut s = (p * n - n) + offset;
        let mut q = (p * n - n);
        while q > r {
            hilbert_index_bitvec.swap(q, s);
            q -= n;
            s -= n;
        } 
    }
}
  `}
            language={"rust"}
          />
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">Glue Code</h3>{" "}
          <p className="mb-8">
            As mentioned earlier, I avoided doing direct manipulation on the
            bits of the u32 Hilbert Index to avoid complexity. Here is the glue
            code that converts the u32 Hilbert Indices into Vectors of bits, and
            vice-versa:
            <br />
          </p>
          <DarkCodeBlock
            text={`
fn into_bit_vec(int: u32, length: usize) -> Vec<bool> {
  let mut bitvec = Vec::<bool>::new();
  // for each bit of the input u32, push a boolean into the bitvec
  format!("{int:b}")
      .chars()
      .for_each(|bit| bitvec.push(bit == '1'));

  // prepend leading 0's to prevent out of bounds issues later
  let leading_false_count = length - bitvec.len();
  let mut leading = Vec::<bool>::new();
  for _ in 0..leading_false_count {
      leading.push(false);
  }
  leading.extend(bitvec);
  leading
}

fn into_u32(bitvec: Vec<bool>) -> u32 {
  let bitstring: String = bitvec
      .iter()
      .map(|bit| if *bit { '1' } else { '0' })
      .collect();
  u32::from_str_radix(&bitstring, 2).unwrap()
}
  `}
            language={"rust"}
          />
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">Wrap Up</h3>{" "}
          <p className="mb-8">
            And thats it! Here is a summary of the process for how I generate
            each vertex of the Hilbert Curve:
          </p>
          <ol className="pb-8 ml-8 list-decimal">
            <li>Take a BRGC from the BRGC iterator</li>
            <li>Convert it from u32 to a Vector of Booleans</li>
            <li>Run the Skilling Transform Algorithm</li>
            <li>Convert it back into a u32</li>
            <li>Use the calculated Hilbert Index however you like!</li>
          </ol>
          <p>
            I personally use these Hilbert Indices for 3D rendering in your
            browser. If you are interested in how I do that by compiling this
            Rust code into WebAssembly, then check out the next post!
          </p>
        </Section>
        <div className="flex flex-row">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-md self-end">
            <NextLink href={"/blog/HilbertCurves5"}>Next Post</NextLink>
          </button>
        </div>
      </article>
    </div>
  );
};

HilbertCurves4.getLayout = BlogPageLayout;

export default HilbertCurves4;
