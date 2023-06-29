import Link  from 'next/link';

const SocialLink = ({ icon: Icon, children, ...props }) => {
  return (
    <Link
      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500"
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
      <span className="ml-4">{children}</span>
    </Link>
  );
};

export default SocialLink;
