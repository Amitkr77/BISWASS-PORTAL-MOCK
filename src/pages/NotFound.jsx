import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-heading font-bold text-govt-blue-dark">Page not found</h1>
      <p className="text-govt-gray-600 mt-3">The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </section>
  );
}
