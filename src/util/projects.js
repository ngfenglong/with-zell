import { BUILDING_LIMIT, PROJECT_STATUSES, PROJECT_TEMPLATE, PROJECTS } from '@/constants/projects-details';

const BUILDING_STATUSES = ['active', 'beta'];

const monthIndex = (yyyyMm) => {
  const [year, month] = String(yyyyMm).split('-').map(Number);
  return year * 12 + (month - 1);
};

const STATUS_ORDER = Object.keys(PROJECT_STATUSES);
const statusRank = (p) => {
  const rank = STATUS_ORDER.indexOf(p.status);
  return rank === -1 ? STATUS_ORDER.length : rank;
};

/** Status first (active, beta, occasional, inactive), then newest `updated`. */
const byRecency = (a, b) =>
  statusRank(a) - statusRank(b) ||
  monthIndex(b.updated) - monthIndex(a.updated) ||
  (b.end ?? Infinity) - (a.end ?? Infinity) ||
  b.start - a.start;

/** Splits projects into the three sections shown on the site. */
export const getProjectSections = (projects = PROJECTS) => {
  const visible = projects.filter((p) => !p.archived);
  const building = visible
    .filter((p) => BUILDING_STATUSES.includes(p.status))
    .sort(byRecency)
    .slice(0, BUILDING_LIMIT);
  const buildingNames = new Set(building.map((p) => p.name));

  return {
    building,
    projects: visible.filter((p) => !buildingNames.has(p.name)).sort(byRecency),
    archive: projects
      .filter((p) => p.archived)
      .sort((a, b) => (b.end ?? b.start) - (a.end ?? a.start)),
  };
};

const EM_DASH = '\u2014';

const textValues = (value) => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(textValues);
  if (value && typeof value === 'object') return Object.values(value).flatMap(textValues);
  return [];
};

/** Development-only check that every project follows PROJECT_TEMPLATE and the writing rules. */
export const validateProjects = (projects = PROJECTS) => {
  const problems = [];
  const templateKeys = Object.keys(PROJECT_TEMPLATE);
  projects.forEach((p, i) => {
    const label = p.name || `#${i + 1}`;
    templateKeys.forEach((key) => {
      if (!(key in p)) problems.push(`${label}: missing "${key}" (copy it from PROJECT_TEMPLATE)`);
    });
    ['name', 'pitch', 'start', 'updated'].forEach((key) => {
      if (!p[key]) problems.push(`${label}: "${key}" is required`);
    });
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.updated ?? '')) problems.push(`${label}: "updated" must look like 2026-11`);
    if (p.pitch?.length > 120) problems.push(`${label}: pitch is ${p.pitch.length} characters (max 120)`);
    if (!Array.isArray(p.stack) || p.stack.length < 1 || p.stack.length > 4) problems.push(`${label}: "stack" needs 1–4 items`);
    if (!(p.status in PROJECT_STATUSES)) {
      problems.push(`${label}: "status" must be one of ${Object.keys(PROJECT_STATUSES).join(', ')}`);
    }
    if (Object.values(p.links ?? {}).some((href) => href && href.startsWith('/blogs'))) {
      problems.push(`${label}: links should point to the project itself, not a blog post`);
    }
    if (textValues(p).some((text) => text.includes(EM_DASH))) problems.push(`${label}: contains an em dash; use a comma, colon or hyphen instead`);
  });
  if (problems.length && process.env.NODE_ENV !== 'production') {
    console.warn(`[projects] ${problems.length} issue(s) in src/constants/projects-details.js:\n- ${problems.join('\n- ')}`);
  }
  return problems;
};
