import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Wizard from './pages/insura/Wizard';
import WizardForm from './pages/insura/WizardForm';

function App() {
    return (
        <Routes>
            <Route path="/insura" element={<MainLayout />}>
                <Route index element={<Wizard />} />
                <Route path=":type" element={<WizardForm />} />
            </Route>
        </Routes>
    );
}

export default App;