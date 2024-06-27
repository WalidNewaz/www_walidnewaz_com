export interface Topic {
  [key: string]: number;
}

export interface Image {
  id: string;
  childImageSharp: {
    gatsbyImageData: any;
  };
}

export interface Post {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    pathDate: string;
    title: string;
    description: string;
    hero_image: Image;
    tags: string[];
    read_time: string;
  };
  headings: {
    value: string;
  }[];
  id: string;
}

export interface AggregatedTopic {
  fieldValue: string;
  totalCount: number;
}

export interface AllTopics {
  group: AggregatedTopic[];
}

export interface AllPosts {
  allMarkdownRemark: {
    nodes: Post[];
  };
  postCount: {
    totalCount: number;
  };
  allTopics: AllTopics;
}