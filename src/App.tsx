import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Wizard from './pages/insura/Wizard';
import WizardForm from './components/wizard/WizardForm';
import ThankYou from './pages/thank-you';
import ReadMe from './pages/readme';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Wizard />} />
                <Route path=":type" element={<WizardForm />} />
                <Route path="thank-you" element={<ThankYou />} />
                <Route path="readme" element={<ReadMe />} />
            </Route>
        </Routes>
    );
}
