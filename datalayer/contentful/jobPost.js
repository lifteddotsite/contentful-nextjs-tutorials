import { client } from './client';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import date from 'date-and-time';

function parseDate(dateStr) {
  const dateObj = date.parse(dateStr.split('T')[0], 'YYYY-MM-DD');
  return dateObj.toDateString();
}

const imageReducer = (imageField) => {
  return {
    url: `https:${imageField.fields.file.url}`,
    alt: imageField.fields.title,
    height: imageField.fields.file.details.image.height,
    width: imageField.fields.file.details.image.width,
    contentType: imageField.fields.file.contentType,
  };
};

const tagsReducer = (tagsField) => {
  let tags = [];
  tagsField.map((rawTag) => {
    const tag = rawTag.sys.id;
    tags.push(tag);
  });
  return tags;
};

const richTextReducer = (richText) => {
  const rawRichText = documentToHtmlString(richText);
  let styledRichText = rawRichText.replace('<ul>', "<ul class='list-disc'>");
  return styledRichText;
};

const jobPostReducer = (rawJobPost) => {
  let jobPost = { ...rawJobPost.fields };

  jobPost.tags = tagsReducer(rawJobPost.metadata.tags);
  jobPost.id = rawJobPost.sys.id;
  jobPost.locale = rawJobPost.sys.locale;
  jobPost.createdAt = parseDate(rawJobPost.sys.createdAt);
  jobPost.updatedAt = parseDate(rawJobPost.sys.updatedAt);

  jobPost.companyLogo = imageReducer(rawJobPost.fields.companyLogo);

  jobPost.sectionAboutYou = richTextReducer(rawJobPost.fields.sectionAboutYou);

  jobPost.sectionJobDescription = richTextReducer(
    rawJobPost.fields.sectionJobDescription
  );

  jobPost.sectionJobResponsibilities = richTextReducer(
    rawJobPost.fields.sectionJobResponsibilities
  );

  jobPost.sectionRemuneration = richTextReducer(
    rawJobPost.fields.sectionRemuneration
  );

  return jobPost;
};

export const getJobPosts = async () => {
  const jobPosts = await client.getEntries({ content_type: 'jobPost' });
  console.log(jobPosts);
  return jobPosts.items.map((jobPost) => jobPostReducer(jobPost));
};

export const getSlugs = async () => {
  const select = ['fields.slug'];
  const rawSlugs = await client.getEntries({ content_type: 'jobPost', select });
  const slugs = rawSlugs.items.map((rawSlug) => rawSlug.fields.slug);
  return slugs;
};

export const getJobPostBySlug = async ({ slug }) => {
  const found = await client.getEntries({
    content_type: 'jobPost',
    'fields.slug': slug,
  });
  if (found.items.length == 0) return null;
  const jobPost = found.items[0];
  return jobPostReducer(jobPost);
};

export const getRelatedJobPosts = async ({ id }) => {
  return [];
};

// jobPost = {
//   CompanyName: 'Revolut Ltd',
//   CompanyLogo: '#',
//   CompanyLocation: 'London, UK',
//   JobTitle: 'Senior Software Engineer - NextJs Expert',
//   JobType: 'Full-Time',
//   RemoteOk: false,
//   ExperienceLevel: 'Senior',
//   DatePosted: 'April 2022',
//   FeaturedJob: true,
//   ApplicationLink: 'https://liftedwp.com/contact',
//   'Section.JobDescription': 'React NextJS developer opportunity at a rapidly expanding FinTech start-up, building an AI-driven ESG (Environmental, Social and Governance) product for investors. This is a unique opportunity to join us at an early stage where you will have significant responsibility and the chance to make a real impact on the business. Our team is comprised of Technology and Finance professionals who are transforming sustainable investing through using cutting-edge technologies including cloud computing, machine learning and NLP. We believe that economic value creation can and should be combined with environmental stewardship, social inclusion, and sound governance.    As part of our product, we are building a state-of-the-art ESG analytics platform for our clients which you will help to build, maintain, and lead. You will have excellent academics and technology experience, preferably with Financial Services exposure.',
//   'Section.AboutYou': "You love building great software. Your work could be supporting new feature development, migrating existing features, and creating other mobile and web solutions for customers. You'll have a primary focus on frontend development using Javascript. Our client's tech stack is JavaScript, primarily using React. A strong understanding of JS core (ES2019+) is required, with some exposure in Java as back-end technology. We use modern tools, which means you'll have the opportunity to work with Webpack, Redux, Apollo, Styled Components, and much more. You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you might not have experience with yet. You are self-driven, self-learner willing to share knowledge and participate actively in your community. Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap with EST morning hours daily. In addition, reliable high speed internet is a must.",
//   'Section.JobResponsibilities': "We are a fast-growing, and remote-first company, so you'll likely get experience on many different projects across the organization. That said, here are some things you'll probably do: Give back to the community via open source and blog posts Travel and meet great people- as part of our remote-first lifestyle, it's important that we come together as needed to work together, meet each other in person and have fun together. Please keep that in mind when you apply. Teach and be taught: Modus creates active teams that work in internal and external projects together, giving opportunities to stay relevant with the latest technologies and learning from experts worldwide Interact directly with internal and external clients to represent Modus and its values",
//   'Section.Remuneration': "Competitive remuneration package High spec laptop Hybrid working model (work from home and office) 25 days holiday, plus Bank Holidays"
// };
