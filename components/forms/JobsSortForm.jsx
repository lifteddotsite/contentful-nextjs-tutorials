const JobsSortForm = ({ jobs, setDisplayedJobs }) => {
  return (
    <div>
      {/* Sort */}
      <div className='flex items-center space-x-2'>
        <label
          htmlFor='sorting'
          className='block text-sm font-sm text-gray-500 italic w-full'
        >
          Sort By
        </label>
        <select
          id='sorting'
          name='sorting'
          className='mt-1 block  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-sm'
          defaultValue='Date Posted'
        >
          <option>Date Posted</option>
          <option>Company</option>
          <option>Salary Asc</option>
          <option>Salary Desc</option>
        </select>
      </div>
    </div>
  );
};

export default JobsSortForm;
