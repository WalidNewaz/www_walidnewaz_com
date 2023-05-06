import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import banner from '../images/about_banner.jpeg'

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <section id="about-me">
        <div><img src={banner} alt="profile-mountains" /></div>
        <h3>Welcome! Thanks for visiting.</h3>

        <p>Hello and welcome to my page! My name is Walid Newaz.
          I am a software engineer who loves learning, and sharing my thoughts about software
          and the world.</p>

        <p>My fascination with programming started with BASIC in 6th grade.
          I was fascinated with the small programs that we were able to create even with such a simple language,
          that a 6th grader could understand. Later on I picked up Pascal and C which allowed me to write
          programs to record interesting data as files in my computer. I knew that I'd barely scratched the surface.</p>

        <p>In college I learned more about computer systems and programming. I was exposed to many tools
          and practices in the world of software engineering.</p>

        <p>I have spent my career delivering fast, reliable, and maintainable software applications. As
          a programmer I have primarily worked on JavaScript, Java, and Python. I am focused on maintainability,
          flexibility of software architecture, and providing a cutting endge user experience.
        </p>

        <p>Some of the notable things I've worked on over the years include:</p>
        <ul>
          <li>Lead capture system</li>
          <li>User survey capture system</li>
          <li>User portal</li>
          <li>Static websites</li>
          <li>Coupon management system</li>
          <li>API workflow management system</li>
          <li>Team travel app</li>
        </ul>

        <p>My current interests are in program comprehension, software portability, and A.I. driven software
          development. I am also interested in developing user-friendly applications that scale.
        </p>

        <p>When I'm not writing code you can often find me cooking, hiking in the Colorado Front Range with my dog, or traveling.
          I love music, art, books and podcasts.</p>

        <p>Feel free to reach out to me if you'd like to share ideas, collaborate, or go on adventures together.</p>
      </section>
    </Layout>
  )
}

export default About

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`