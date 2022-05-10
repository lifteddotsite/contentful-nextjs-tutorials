import CompanyDetails from '../../components/data/details/CompanyDetails';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  getCompaniesSlugs,
  getJobsByCompanyId,
  getCompanyBySlug,
} from '../../datalayer';

const CompanyPage = ({ company, companyJobs }) => {
  if (!company)
    return <LoadingSpinner customMessage='Loading company data ...' />;
  return <CompanyDetails company={company} companyJobs={companyJobs} />;
};

export default CompanyPage;

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const company = await getCompanyBySlug({ slug });
  const companyJobs = await getJobsByCompanyId({ id: company.id });

  if (!company) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      company,
      companyJobs,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  const slugs = await getCompaniesSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};
