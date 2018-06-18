import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShowRecipes from './components/Index';
import NewRecipe from './components/NewEdit';
import ShowRecipe from './components/Show';
import './styles.scss';


class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <Switch>
          <Route path="/" exact component={ShowRecipes} />
          <Route path="/:id/edit" exact component={NewRecipe} />
          <Route path="/new" exact component={NewRecipe} />
          <Route path="/:id" exact component={ShowRecipe} />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;

