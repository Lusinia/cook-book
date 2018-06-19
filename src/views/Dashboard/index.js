import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShowRecipes from './ShowList';
import NewRecipe from './NewEdit';
import ShowRecipe from './Show';


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

