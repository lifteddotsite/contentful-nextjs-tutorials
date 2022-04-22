import { getJobPosts } from '../datalayer';

import JobPostsList from '../components/data/lists/JobPostsList';
import JobsPageSideBar from '../components/slices/JobsPageSideBar';
import JobsPageHeader from '../components/slices/JobsPageHeader';
import SearchJobForms from '../components/forms/SearchJobForms';

export default function Index({ jobPosts }) {
  return (
    <div className='flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9'>
      <JobsPageSideBar />

      <div className='w-full'>
        <SearchJobForms />
        <JobsPageHeader jobPosts={jobPosts} />
        <JobPostsList jobPosts={jobPosts} />
      </div>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const jobPosts = await getJobPosts();

  return {
    props: {
      jobPosts,
    },
  };
};
