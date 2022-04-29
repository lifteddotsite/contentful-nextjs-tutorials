import { getJobs } from '../../datalayer/contentful/job';
import JobDetails from '../../components/data/details/JobDetails';

const JobDetailsPage = ({job}) => {
  return <JobDetails job={job} />;
};
export default JobDetailsPage;


export const getStaticPaths = async () => {
    const jobs = await getJobs();
    const slugs = jobs.map((job) => job.slug);
    const paths = slugs.map((slug) => ({ params: { slug } }));
    return {
      paths,
      fallback: false,
    };
  };

export const getStaticProps = async ({params}) => {
    const slug = params.slug
    const jobs = await getJobs()
    const job = jobs.filter(job => job.slug === slug)[0]

    return {
        props:{
            job
        }
    }
}
  
