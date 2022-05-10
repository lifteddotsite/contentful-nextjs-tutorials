import { getJobs } from '../datalayer';
import JobsPage from '../components/ui/JobsPage';
import { getJobsSkills } from '../datalayer/contentful/job';

export default function Index({ jobs, jobSkills }) {
  return <JobsPage jobs={jobs} jobSkills={jobSkills} />;
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();
  const jobSkills = await getJobsSkills();

  return {
    props: {
      jobs,
      jobSkills,
    },
    revalidate: 5
  };
};
