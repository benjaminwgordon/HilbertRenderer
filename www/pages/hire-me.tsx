import React from "react";
import BlogPageLayout from "../components/BlogPosts/BlogPageLayout";
import Section from "../components/BlogPosts/Section";
import Link from "../components/Link";

const HireMe = () => {
  return (
    <div className="mx-2 font-raleway text-lg flex flex-col gap-8">
      <p>
        I got my start in software development through manufacturing. I
        previously worked for the <b>University of Arizona MWC </b>
        and <b> Gordon Machine Works</b>, where I developed Python software that
        automates manufacturing and testing processes for extreme precision
        scientific equipment.
      </p>
      <p>
        In my most recent position, I worked with <b>Sourcegraph</b> as an
        Application Engineer. I worked directly with our customers by providing
        guidance on deploying and maintaining our distributed code intelligence
        platform through Kubernetes.
      </p>

      <p>
        In my personal time, I primarily enjoy building full-stack applications
        with a preference for backend development. I also enjoy exploring
        emerging technology: most recently I've been learning Rust, Web
        Assembly, and WebGL. I'm currently using these technologies to process,
        transform, and render 3D geometries inside web browsers.
      </p>
      <p>
        When I am not writing software, you can find me cooking Sichuanese food,
        hoarding all the wheat in Settlers of Catan, or making premium kitchen
        knives at my forge.
      </p>
      <p>
        I'm currently available for new opportunities in Software Engineering
        where I can flex my development skills while working on real-world
        problems. I'd particularly enjoy working in a Full-Stack or Back-End
        role. If that sounds like your team, then please reach out to me through{" "}
        <Link
          target={"https://www.linkedin.com/in/benjaminwgordon/"}
          displayTarget={"LinkedIn"}
        ></Link>
      </p>
    </div>
  );
};

HireMe.getLayout = BlogPageLayout;

export default HireMe;
