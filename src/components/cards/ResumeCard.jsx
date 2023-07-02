const { BriefcaseIcon } = require('@heroicons/react/20/solid');
const Image = require('next/image');

const ResumeCard = ({ resume }) => {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-900">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-8">
        {resume.map((company, companyIndex) => (
          <li key={companyIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 ">
              <Image
                src={company.logo}
                alt=""
                width="28"
                height="28"
                className="h-7 w-7"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900">
                {company.companyName}
              </dd>

              {company.roles.map((role, roleIdx) => (
                <div
                  key={roleIdx}
                  className="flex w-full items-center justify-between mb-4"
                >
                  <div>
                    <dt className="sr-only">Role</dt>
                    <dd className="flex flex-col text-xs text-zinc-500 leading-snug">
                      {role.title.map((text, idx) => (
                        <span key={`${text}-${idx}`}>{text}</span>
                      ))}
                    </dd>
                  </div>
                  <div className="mb-auto">
                    <dt className="sr-only">Date</dt>
                    <dd className="whitespace-nowrap text-xs text-zinc-400">
                      <span aria-hidden="true">{`${role.start_date} - ${role.end_date}`}</span>
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ResumeCard;
