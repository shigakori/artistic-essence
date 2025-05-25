import ArtProject from '@/components/ArtProject/ArtProject';
import artProjects from '@/data/art';

export async function generateMetadata({ params }) {
  const project = artProjects.find(p => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title + ' | Artistic Essence',
    description: project.description,
    openGraph: {
      title: project.title + ' | Artistic Essence',
      description: project.description,
      images: [project.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title + ' | Artistic Essence',
      description: project.description,
      images: [project.image],
    },
    keywords: [project.title, ...(project.tags || []), 'art', 'gallery', 'artistic essence'],
  };
}

export default function ProjectPage({ params }) {
  const project = artProjects.find(p => p.slug === params.slug);
  if (!project) return <div>Not found</div>;
  return <ArtProject project={project} />;
}

export async function generateStaticParams() {
  const artProjects = (await import('@/data/art')).default;
  return artProjects.map(project => ({ slug: project.slug }));
}
