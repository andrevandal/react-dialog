import { useState } from 'react';
import './styles/App.css';
import BaseDialog from './components/BaseDialog.tsx';

const DialogButton: React.FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}) => (
  <button className="button" onClick={onClick}>
    {label}
  </button>
);

function App() {
  const [isDialog1Open, setDialog1Open] = useState(false);
  const [isDialog2Open, setDialog2Open] = useState(false);

  const handleToggleDialog = (
    currentState: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(!currentState);
  };

  return (
    <div className="app">
      <h1>Dialog Example</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '300px',
        }}
      >
        <DialogButton
          onClick={() =>
            handleToggleDialog(isDialog1Open, setDialog1Open)
          }
          label="Open Dialog (small)"
        />
        <DialogButton
          onClick={() =>
            handleToggleDialog(isDialog2Open, setDialog2Open)
          }
          label="Open Dialog (large)"
        />
      </div>
      <BaseDialog
        title="Título do Dialog 1"
        isOpen={isDialog1Open}
        onClose={() => handleToggleDialog(isDialog1Open, setDialog1Open)}
        closeOnOverlayClick
      >
        <p>
        Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss, é um leite divinis.
        </p>
      </BaseDialog>
      <BaseDialog
        title="Título do Dialog 2"
        isOpen={isDialog2Open}
        onClose={() => handleToggleDialog(isDialog2Open, setDialog2Open)}
        closeOnOverlayClick
      >
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <img src='https://placehold.co/600x338' style={{
          width: '100%',
          height: 'auto'
        }} width={600} height={338} />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </BaseDialog>
    </div>
  );
}

export default App;