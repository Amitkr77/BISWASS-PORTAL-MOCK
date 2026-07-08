export default function PageBanner({ title, description }) {
  return (
    <div className="bg-govt-blue-light border-b border-govt-blue/10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">{title}</h1>
        {description && <p className="text-sm sm:text-base text-govt-gray-700 mt-2 max-w-3xl">{description}</p>}
      </div>
    </div>
  );
}
