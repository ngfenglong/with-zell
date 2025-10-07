import { ExternalLink, TrendingUp, Users } from "lucide-react";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <article
      key={product.id}
      className="rounded-lg border border-gray-200 p-8 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                product.status === "Live"
                  ? "bg-green-100 text-green-800"
                  : product.status === "Beta"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {product.status}
            </span>
          </div>
          <p className="mb-3 italic text-gray-600">{product.tagline}</p>
        </div>
        {product.link !== "#" && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-gray-900"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>

      <p className="mb-6 leading-relaxed text-gray-700">
        {product.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        {product.metrics?.users && (
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{product.metrics?.users}</span>
          </div>
        )}
        {product.metrics?.rating && (
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>{product.metrics?.rating}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
