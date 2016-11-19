import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurvey } from '../actions';

class SurveysShow extends Component {
  componentWillMount() {
    this.props.fetchSurvey(this.props.params.id);
  }
  render() {
    const { survey } = this.props;

    if (!survey) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        <h3>{survey.title}</h3>
        <p>{survey.tagline}</p>

        <form>
          {
            survey.questions.map(question => (
              <div>
                <p>{question.title}</p>
                {
                  question.options.map(option => (
                    <div>
                      <input type="radio" value={option}/>
                      <label>{option}</label>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    survey: state.surveys.survey
  }
}

export default connect(
  mapStateToProps,
  { fetchSurvey }
)(SurveysShow)
