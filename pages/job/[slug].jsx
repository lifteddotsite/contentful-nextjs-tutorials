import {
  getSlugs,
  getJobPostBySlug,
  getRelatedJobPosts,
} from '../../datalayer';
import JobPostDetailsComponent from '../../components/data/details/JobPostDetails';

const JobPostDetails = ({ jobPost, relatedJobPosts }) => {
  console.log(jobPost);
  return (
    <JobPostDetailsComponent
      jobPost={jobPost}
      relatedJobPosts={relatedJobPosts}
    />
  );
};

export default JobPostDetails;

export const getStaticPaths = async () => {
  const slugs = await getSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const jobPost = await getJobPostBySlug({ slug });
  const relatedJobPosts = await getRelatedJobPosts({ id: jobPost.id });

  return {
    props: {
      jobPost,
      relatedJobPosts,
    },
  };
};
