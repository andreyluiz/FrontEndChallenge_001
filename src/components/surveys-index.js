import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurveys } from '../actions';

class SurveysIndex extends Component {
  componentWillMount() {
    this.props.fetchSurveys()
  }

  render() {
    return (
      <div>
        <h1>Surveys</h1>
        <ul>
          {this.props.surveys.map(survey => (
            <li key={survey.id}>
              <Link to={`survey/${survey.id}`}>
                <h3>{survey.title}</h3>
                <p>{survey.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    surveys: state.surveys.all
  };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveysIndex)
