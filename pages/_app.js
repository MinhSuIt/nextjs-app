import '../public/css/bootstrap.min.css'
import '../public/css/animate.css'
// import '../public/css/owl.carousel.min.css'
import '../public/css/all.css'
// import '../public/css/flaticon.css'
import '../public/css/themify-icons.css'
import '../public/css/magnific-popup.css'
import '../public/css/slick.css'
import '../public/css/style.css'

import 'antd/dist/antd.css';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import rootReducer from '@/redux/reducers/index'
import thunk from 'redux-thunk';
import { CartProvider } from "react-use-cart";
import { PageTransition } from 'next-page-transitions'
import Loader from '@/components/layout/Loader'
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

  const store = createStore(rootReducer, enhancer)
  const TIMEOUT = 400
  return (
    <>
      <PageTransition
        timeout={TIMEOUT}
        classNames="page-transition"
        loadingComponent={<Loader />}
        loadingDelay={500}
        loadingTimeout={{
          enter: TIMEOUT,
          exit: 0,
        }}
        loadingClassNames="loading-indicator"
      >
        <CartProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </CartProvider>


      </PageTransition>
      <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}
      </style>
    </>
  )


}