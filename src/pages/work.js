import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import Work from '../components/workdetails';
import Layout from '../components/Layout';
import { Workpganimations } from '../helpers/animations';

export default function work({ data }) {
	useEffect(() => {
		Workpganimations();
	}, []);
	return (
		<>
			<Layout
				title="Ayush Gupta - Works 🔨"
				description="A collection of my designs and front-end Projects. These are a mix of freelance, practice, and personal projects 🔨"
			/>
			<main className="work">
				<section className="work-section">
					<h1> SELECTED WORKS </h1>
					<article>
						<p>A collection of few of my Projects. These are mostly practice, and my personal projects.</p>
					</article>
				</section>
				<Work result={data.result} />
				<Footer />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const query = encodeURIComponent(`*[_type == "work"] | order(_createdAt asc){
	_id,
	projecttype,
	title,
	image{asset},
	description,
	technology,
	workurl,
}`);
	const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v1/data/query/production?query=${query}`;
	const res = await fetch(url);
	const data = await res.json();
	if (!data)
		return {
			notFound: true,
		};
	else
		return {
			props: { data },
			revalidate: 60, // In seconds
		};
}
