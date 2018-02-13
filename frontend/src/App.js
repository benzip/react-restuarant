import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

import TopNav from "./components/TopNav";
import BillCalculateContainer from "./containers/BillCalculateContainer";
import PromotionSetupContainer from "./containers/PromotionSetupContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const store = configureStore(window.__INITIAL_STATE__);

const menus = [
  {
    description: "Bill calculator",
    route: "/bill-calc"
  },
  {
    description: "Promotions maintenance",
    route: "/promotions-maintenance"
  },
  {
    description: "Seat reservation",
    route: "/seat-reservation"
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <MuiThemeProvider>
            <BrowserRouter>
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <TopNav menuDataSource={menus} />
                  </div>
                </div>
                <Switch>
                  <div className="container content-area" style={{ marginTop: "20px" }}>
                    <div className="col-lg-12">
                      <Route exact path="/" render={() => <Redirect to="/promotions-maintenance" />} />
                      <Route path="/bill-calc" component={BillCalculateContainer} />
                      <Route path="/promotions-maintenance" component={PromotionSetupContainer} />
                    </div>
                  </div>
                </Switch>
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
