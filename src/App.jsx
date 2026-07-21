import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './hooks/useToast';
import MainLayout from './layouts/MainLayout';

// General
import Overview from './pages/Overview';
import GettingStarted from './pages/GettingStarted';

// Foundations
import Colors from './pages/Foundations/Colors';
import Typography from './pages/Foundations/Typography';
import Spacing from './pages/Foundations/Spacing';
import Icons from './pages/Foundations/Icons';

// Components
import ButtonsPage from './pages/Components/ButtonsPage';
import InputsPage from './pages/Components/InputsPage';
import CardsPage from './pages/Components/CardsPage';
import AlertsPage from './pages/Components/AlertsPage';
import BadgesPage from './pages/Components/BadgesPage';
import AvatarPage from './pages/Components/AvatarPage';
import TooltipPage from './pages/Components/TooltipPage';
import ModalPage from './pages/Components/ModalPage';
import DropdownPage from './pages/Components/DropdownPage';
import TablesPage from './pages/Components/TablesPage';
import TabsPage from './pages/Components/TabsPage';
import AccordionPage from './pages/Components/AccordionPage';
import PaginationPage from './pages/Components/PaginationPage';
import ProgressPage from './pages/Components/ProgressPage';
import SkeletonPage from './pages/Components/SkeletonPage';
import ToastPage from './pages/Components/ToastPage';
import CheckboxPage from './pages/Components/CheckboxPage';
import RadioPage from './pages/Components/RadioPage';
import SwitchPage from './pages/Components/SwitchPage';

// Utilities
import FlexboxPage from './pages/Utilities/FlexboxPage';
import GridPage from './pages/Utilities/GridPage';
import ResponsivePage from './pages/Utilities/ResponsivePage';

// Settings
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* General */}
              <Route index element={<Overview />} />
              <Route path="getting-started" element={<GettingStarted />} />

              {/* Foundations */}
              <Route path="foundations/colors" element={<Colors />} />
              <Route path="foundations/typography" element={<Typography />} />
              <Route path="foundations/spacing" element={<Spacing />} />
              <Route path="foundations/icons" element={<Icons />} />

              {/* Components */}
              <Route path="components/buttons" element={<ButtonsPage />} />
              <Route path="components/inputs" element={<InputsPage />} />
              <Route path="components/cards" element={<CardsPage />} />
              <Route path="components/alerts" element={<AlertsPage />} />
              <Route path="components/badges" element={<BadgesPage />} />
              <Route path="components/avatar" element={<AvatarPage />} />
              <Route path="components/tooltip" element={<TooltipPage />} />
              <Route path="components/modal" element={<ModalPage />} />
              <Route path="components/dropdown" element={<DropdownPage />} />
              <Route path="components/tables" element={<TablesPage />} />
              <Route path="components/tabs" element={<TabsPage />} />
              <Route path="components/accordion" element={<AccordionPage />} />
              <Route path="components/pagination" element={<PaginationPage />} />
              <Route path="components/progress" element={<ProgressPage />} />
              <Route path="components/skeleton" element={<SkeletonPage />} />
              <Route path="components/toast" element={<ToastPage />} />
              <Route path="components/checkbox" element={<CheckboxPage />} />
              <Route path="components/radio" element={<RadioPage />} />
              <Route path="components/switch" element={<SwitchPage />} />

              {/* Utilities */}
              <Route path="utilities/flexbox" element={<FlexboxPage />} />
              <Route path="utilities/grid" element={<GridPage />} />
              <Route path="utilities/responsive" element={<ResponsivePage />} />

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
