import React, { Component } from 'react';
import './styles.scss';
import ShowRecipes from './components/Index';
import EditRecipe from './components/Edit';
import { Route, Switch } from 'react-router-dom';
import NewRecipe from './components/NewEdit';
import ShowRecipe from './components/Show';


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

