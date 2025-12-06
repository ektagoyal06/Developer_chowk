import { Link } from "react-router-dom";
import {
  HomeIcon,
  FolderIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const sidebarLinks = [
  { icon: HomeIcon, title: "Home", subtitle: "Your personalized feed", path: "/dashboard" },
  { icon: FolderIcon, title: "ProjectArena", subtitle: "Discover & collaborate", path: "/project-arena" },
  { icon: UserGroupIcon, title: "TeamsHive", subtitle: "Find your squad", path: "/teams" },
  { icon: BriefcaseIcon, title: "Prolance", subtitle: "Earn while you code", path: "/prolance" },
  { icon: Cog6ToothIcon, title: "Bug Bounty", subtitle: "Fix & get rewards", path: "/bug-bounty" },
  { icon: ChatBubbleLeftRightIcon, title: "Let's Connect", subtitle: "Find mentors", path: "/connect" },
  { icon: BookOpenIcon, title: "MindMerge", subtitle: "Buy & sell notes", path: "/mindmerge" },
  { icon: ArchiveBoxIcon, title: "StudyStack", subtitle: "Courses & materials", path: "/studystack" },
  { icon: TrophyIcon, title: "Leaderboard", subtitle: "Compete & rank up", path: "/leaderboard" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 p-4 flex flex-col space-y-6">
      <h2 className="text-xl font-bold">Developer Chowk</h2>

      <nav className="flex-1 overflow-y-auto space-y-4">
        {sidebarLinks.map(({ icon: Icon, title, subtitle, path }) => (
          <Link
            key={title}
            to={path}
            className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition"
          >
            <Icon className="w-5 h-5" />
            <div className="text-sm">
              <p className="font-semibold">{title}</p>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
