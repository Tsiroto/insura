import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Wizard from './pages/insura/Wizard';
import WizardForm from './components/wizard/WizardForm.tsx';
import ThankYou from './pages/thank-you';

function App() {
    return (
        <Routes>
            <Route path="/insura" element={<MainLayout />}>
                <Route index element={<Wizard />} />
                <Route path=":type" element={<WizardForm />} />
                <Route path="thank-you" element={<ThankYou />} />
            </Route>
        </Routes>
    );
}

export default App;