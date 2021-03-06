import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

import TopNav from "./components/TopNav";
import BillCalculateContainer from "./containers/BillCalculateContainer";
import PromotionMaintenanceContainer from "./containers/PromotionMaintenanceContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ROUTE } from "./commons/consts/ROUTE";
const store = configureStore(window.__INITIAL_STATE__);

const menus = [
  {
    description: "Bill calculator",
    route: `/${ROUTE.BILL_CALCULATE}`
  },
  {
    description: "Promotions maintenance",
    route: `/${ROUTE.PROMOTION_MAINTENANCE}`
  }
];

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <BrowserRouter>
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <TopNav menuDataSource={menus} />
                </div>
              </div>
              <div className="container content-area" style={{ marginTop: "20px", overflowY: "hidden" }}>
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path="/" render={() => <Redirect to={`/${ROUTE.BILL_CALCULATE}`} />} />
                    <Route path={`/${ROUTE.BILL_CALCULATE}`} component={BillCalculateContainer} />
                    <Route path={`/${ROUTE.PROMOTION_MAINTENANCE}`} component={PromotionMaintenanceContainer} />
                  </Switch>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
