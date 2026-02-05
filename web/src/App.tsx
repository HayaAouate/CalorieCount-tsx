import './App.css';
import InputApport from './components/inputApport';
import ListesApportsAll from './components/listesApportsAll';
import BilanCalories from './components/bilanCalories';
import { CaloriesProvider } from './contexts/calorieContext';

function App() {
  return (
    <CaloriesProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
          <header className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4 drop-shadow-sm">
              Mon Suivi Calories
            </h1>
            <p className="text-slate-400 text-lg">Suivez votre nutrition simplement et efficacement</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start pb-32">
            <div className="w-full lg:w-5/12">
              <InputApport />
            </div>

            <div className="w-full lg:w-5/12">
              <ListesApportsAll />
            </div>
          </div>
        </div>

        <BilanCalories />
      </div>
    </CaloriesProvider>
  );
}

export default App;
