import { getJobs } from '../datalayer';

import React from 'react';

export default function Test({ jobs }) {
  console.log(jobs);
  return <div>Test</div>;
}

export const getStaticProps = async (ctx) => {
  const jobs = await getJobs();

  return {
    props: {
      jobs,
    },
  };
};
