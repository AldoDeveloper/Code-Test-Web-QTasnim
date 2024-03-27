import './App.css'
import RouteApp from './Router/route'
import { PrimeReactProvider } from 'primereact/api';
import { DeriviedStateContextApp } from './state/state.context.route';
import { useAtom } from 'jotai';
import { ContextApp } from './context/context.property';
import React from 'react';
import stylesScss from './App.module.scss';
import { ToastContainer, cssTransition } from 'react-toastify';

const bounceAnimationToast = cssTransition({
  enter: "fade-in-bottom-right",
  exit: "fade-out-bottom-right"
});

export default function App() {

  const [props, setProps] = useAtom(DeriviedStateContextApp);
  const valueContext = {
    props,
    setProps,
    scss: stylesScss
  }

  const callbackResize = (): void => {
    setProps({ type: 'resize', resizeValue: window?.innerWidth })
  }

  const removeListener = () => {
    window.removeEventListener('resize', callbackResize);
  }

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme)").media != 'not all') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setProps({
        type: "def",
        mode: isDarkMode
      })
    }
    setProps({ type: 'resize', resizeValue: window?.innerWidth });
    window.addEventListener('resize', callbackResize);

    return () => removeListener();

  }, [])

  return (
    <PrimeReactProvider>
      <ContextApp.Provider value={valueContext}>
        <div className={!props.darkMode ? 'light' : 'dark'}>
          <RouteApp />
        </div>
        <ToastContainer
          autoClose={5000}
          transition={bounceAnimationToast}
          draggable
          pauseOnHover
          rtl={false}
          closeButton
          hideProgressBar={false}
          toastClassName={`${props.darkMode ? 'bg-toast-dark' : 'bg-toast-light'} box-shadow-card`}
        />
      </ContextApp.Provider>
    </PrimeReactProvider>
  )
}

