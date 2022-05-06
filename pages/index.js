import { getJobs } from '../datalayer';
import JobsList from '../components/data/lists/JobsList';
import SearchJobForm from '../components/forms/SearchJobForm';
import JobsPageSideBarForm from '../components/forms/JobsPageSideBarForm';
import JobsPageHeader from '../components/ui/JobsPageHeader';

export default function Index({ jobs }) {
  return (
    <div className='flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9'>
      <JobsPageSideBarForm />

      <div className='w-full'>
        <SearchJobForm />
        <JobsPageHeader jobs={jobs} />
        <JobsList jobs={jobs} />
      </div>
    </div>
  )
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();

  return {
    props: {
      jobs,
    },
  };
};
