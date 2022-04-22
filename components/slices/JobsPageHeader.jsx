const JobsPageHeader = ({ jobPosts }) => {
  let title = `Found ${jobPosts.length} Jobs`;
  switch (jobPosts.length) {
    case 0: {
      title = 'No Jobs found.';
      break;
    }
    case 1: {
      title = 'Only one Job found.';
      break;
    }

    default:
      break;
  }
  return (
    <div>
      {/* Jobs header */}
      <div className='flex justify-between items-center mb-4'>
        <div className='text-sm text-slate-500 italic'>{title}</div>
      </div>
    </div>
  );
};

export default JobsPageHeader;
