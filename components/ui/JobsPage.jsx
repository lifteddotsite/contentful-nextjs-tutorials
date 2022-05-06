import { useState } from 'react';
import JobsList from '../data/lists/JobsList';
import SearchJobForm from '../forms/SearchJobForm';
import JobsPageSideBarForm from '../forms/JobsPageSideBarForm';
import JobsPageHeader from './JobsPageHeader';

export default function JobsPage({ jobs }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  return (
    <div className='flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9'>
      <JobsPageSideBarForm setFilteredJobs={setFilteredJobs} />
      <div className='w-full'>
        <SearchJobForm setFilteredJobs={setFilteredJobs} />
        <JobsPageHeader jobs={filteredJobs} />
        <JobsList jobs={filteredJobs} />
      </div>
    </div>
  );
}
