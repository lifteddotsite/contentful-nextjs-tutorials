import JobPostsList from '../components/data/lists/JobPostsList';
import { getJobPosts } from '../datalayer';

export default function Index({ jobPosts }) {
  return <JobPostsList jobPosts={jobPosts} />;
}

export const getStaticProps = async (ctx) => {
  const jobPosts = await getJobPosts();

  return {
    props: {
      jobPosts,
    },
  };
};
