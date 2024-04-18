import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const links = [
  { 
    href: '',
    url: ['/admin/settings/configure-timetables', '/admin/settings/add-AI-key'],
    value: 'General',
  },
  { 
    href: 'configure-timetables',
    value: 'Timetable'
  },
  { 
    href: 'add-AI-key',
    value: 'AI key',
  },
];

export default function Component() {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-4 text-sm text-muted-foreground p-8 px-10">
          {
            links.map(({ href, value, url }, index) => <Link
              to={`/admin/settings/${href}`}
              key={index}
              children={value}
              className={cn("", ((!!location.pathname.includes(href) && href !== '') || url?.includes(location.pathname)) && 'font-semibold text-primary')}
            />)
          }
    </nav>
  );
};