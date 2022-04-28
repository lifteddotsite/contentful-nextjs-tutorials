import { getJobs } from '../datalayer';
import JobsList from '../components/data/lists/JobsList';

export default function Index({ jobs }) {
  return <JobsList jobs={jobs} />;
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();

  return {
    props: {
      jobs,
    },
  };
};
