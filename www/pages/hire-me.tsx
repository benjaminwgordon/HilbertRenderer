import React from "react";
import BlogPageLayout from "../components/BlogPosts/BlogPageLayout";
import Section from "../components/BlogPosts/Section";
import Link from "../components/Link";

const HireMe = () => {
  return (
    <div>
      <Section>
        <h2 className="text-3xl font-bold font-raleway pb-8">About Me</h2>
        <p className="font-raleway text-lg pb-8"></p>
        <h2 className="text-3xl font-bold font-raleway pb-8">Hire Me!</h2>
        <p className="font-raleway text-lg pb-8">
          I'm currently available for new opportunities in Software Engineering.
          I bring experience supporting distributed microservice-architecture
          applications developed in Rust, Golang, and TypeScript and deployed
          through Kubernetes. I'm looking for software development opportunities
          where I can flex my development skills working on real-world problems.
        </p>
        <p className="font-raleway text-lg pb-8"></p>
        <p className="font-raleway text-lg pb-8">
          If that sounds like your team, then please reach out to me through{" "}
          <Link
            target={"https://www.linkedin.com/in/benjaminwgordon/"}
            displayTarget={"LinkedIn"}
          ></Link>
        </p>
      </Section>
    </div>
  );
};

HireMe.getLayout = BlogPageLayout;

export default HireMe;
