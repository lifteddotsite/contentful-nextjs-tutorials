import { getJobs } from '../datalayer';
import JobsPage from '../components/ui/JobsPage';

export default function Index({ jobs }) {
  return <JobsPage jobs={jobs} />;
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();

  return {
    props: {
      jobs,
    },
  };
};
