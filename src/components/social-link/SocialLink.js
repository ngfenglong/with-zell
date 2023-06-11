import { Link } from 'react-router-dom';

const SocialLink = ({ icon: Icon, ...props }) => {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400" />
    </Link>
  );
};

export default SocialLink;
