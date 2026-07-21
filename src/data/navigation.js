import {
  LayoutDashboard,
  BookOpen,
  Palette,
  Type,
  Move,
  Smile,
  MousePointerClick,
  TextCursorInput,
  CreditCard,
  AlertTriangle,
  Tag,
  User,
  MessageSquare,
  Maximize2,
  ChevronDown,
  Table,
  Columns,
  ListCollapse,
  ChevronsLeftRight,
  Loader,
  Grid,
  Bell,
  CheckSquare,
  CircleDot,
  ToggleLeft,
  Box,
  LayoutGrid,
  Monitor,
  Settings
} from 'lucide-react';

export const navigationData = [
  {
    title: "General",
    type: "section",
    items: [
      { name: "Overview", path: "/", icon: LayoutDashboard },
      { name: "Getting Started", path: "/getting-started", icon: BookOpen }
    ]
  },
  {
    title: "Foundations",
    type: "section",
    items: [
      { name: "Colors", path: "/foundations/colors", icon: Palette },
      { name: "Typography", path: "/foundations/typography", icon: Type },
      { name: "Spacing", path: "/foundations/spacing", icon: Move },
      { name: "Icons", path: "/foundations/icons", icon: Smile }
    ]
  },
  {
    title: "Components",
    type: "section",
    items: [
      { name: "Buttons", path: "/components/buttons", icon: MousePointerClick },
      { name: "Inputs", path: "/components/inputs", icon: TextCursorInput },
      { name: "Cards", path: "/components/cards", icon: CreditCard },
      { name: "Alerts", path: "/components/alerts", icon: AlertTriangle },
      { name: "Badges", path: "/components/badges", icon: Tag },
      { name: "Avatar", path: "/components/avatar", icon: User },
      { name: "Tooltip", path: "/components/tooltip", icon: MessageSquare },
      { name: "Modal", path: "/components/modal", icon: Maximize2 },
      { name: "Dropdown", path: "/components/dropdown", icon: ChevronDown },
      { name: "Tables", path: "/components/tables", icon: Table },
      { name: "Tabs", path: "/components/tabs", icon: Columns },
      { name: "Accordion", path: "/components/accordion", icon: ListCollapse },
      { name: "Pagination", path: "/components/pagination", icon: ChevronsLeftRight },
      { name: "Progress", path: "/components/progress", icon: Loader },
      { name: "Skeleton", path: "/components/skeleton", icon: Grid },
      { name: "Toast", path: "/components/toast", icon: Bell },
      { name: "Checkbox", path: "/components/checkbox", icon: CheckSquare },
      { name: "Radio", path: "/components/radio", icon: CircleDot },
      { name: "Switch", path: "/components/switch", icon: ToggleLeft }
    ]
  },
  {
    title: "Utilities",
    type: "section",
    items: [
      { name: "Flexbox", path: "/utilities/flexbox", icon: Box },
      { name: "Grid", path: "/utilities/grid", icon: LayoutGrid },
      { name: "Responsive", path: "/utilities/responsive", icon: Monitor },
      { name: "Settings", path: "/settings", icon: Settings }
    ]
  }
];

export const allNavItems = navigationData.reduce((acc, section) => {
  return [...acc, ...section.items];
}, []);
