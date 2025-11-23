
import React, { useState } from 'react';
import Shell from './components/layout/Shell';
import Dashboard from './components/views/Dashboard';
import Operations from './components/views/Operations';
import PRTSConsole from './components/views/PRTSConsole';
import MissionControl from './components/views/MissionControl';
import Archives from './components/views/Archives';
import { ViewState, OperationMission } from './types';
import { INITIAL_STATS as statsData } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [stats, setStats] = useState(statsData);
  const [activeMission, setActiveMission] = useState<OperationMission | null>(null);

  const handleStartMission = (mission: OperationMission) => {
    setActiveMission(mission);
    setView(ViewState.TACTICAL_COMPUTER);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.DASHBOARD:
        return (
          <Dashboard 
            stats={stats} 
            onChangeView={setView} 
          />
        );
      case ViewState.OPERATIONS:
        return (
          <Operations 
            onBack={() => setView(ViewState.DASHBOARD)}
            onStartMission={handleStartMission}
          />
        );
      case ViewState.TACTICAL_COMPUTER:
        return activeMission ? (
          <MissionControl 
            mission={activeMission}
            onExit={() => setView(ViewState.OPERATIONS)}
          />
        ) : (
          <div className="text-white">Error: No Mission Loaded</div>
        );
      case ViewState.ARCHIVES:
        return (
            <Archives onBack={() => setView(ViewState.DASHBOARD)} />
        );
      case ViewState.PRTS:
         return (
             <PRTSConsole onBack={() => setView(ViewState.DASHBOARD)} />
         );
      case ViewState.SETTINGS: // Keeping just in case, though likely unused now
         return (
             <PRTSConsole onBack={() => setView(ViewState.DASHBOARD)} />
         );
      default:
        return <div>Unknown Error</div>;
    }
  };

  return (
    <Shell stats={stats}>
      {renderContent()}
    </Shell>
  );
};

export default App;
