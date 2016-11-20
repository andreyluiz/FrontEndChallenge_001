import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurveys } from '../actions';
import './surveys-index.css';

class SurveysIndex extends Component {
  componentWillMount() {
    this.props.fetchSurveys();
  }

  render() {
    if (!this.props.surveys.length) {
      return (<span>Loading the Surveys list...</span>);
    }
    return (
      <div className="surveys-list">
        <h1>Surveys</h1>
        {
          this.props.showSuccessMessage ? 
            (<div className="success-message">{'Thank\'s for answering the survey!'}</div>) : (<span></span>)
        }
        <ul>
          {this.props.surveys.map(survey => (
            <li key={survey.id}>
              <Link to={`/survey/${survey.id}`}>
                <h3>{survey.title}</h3>
              </Link>
              <p>{survey.tagline}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    surveys: state.surveys.all,
    showSuccessMessage: state.surveys.showSuccessMessage
  };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveysIndex)
