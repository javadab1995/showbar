import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
};

export default function SEO({ title, description, path = "/" }: SEOProps) {
  const canonicalUrl = `https://showbar.ir${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
