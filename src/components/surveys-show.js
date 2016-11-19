import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurvey } from '../actions';
import './surveys-show.css';

class SurveysShow extends Component {
  componentWillMount() {
    this.props.fetchSurvey(this.props.params.id);
  }
  render() {
    const { survey } = this.props;

    if (!survey) {
      return (<p>Loading...</p>);
    }

    let questionCount = 1;

    return (
      <div className="survey-show">
        <h1>{survey.title}</h1>
        <h3>{survey.tagline}</h3>

        <form>
          {survey.questions.map(question => (
            <div className="survey-question">
              <p><b>{questionCount++})</b> {question.title}</p>
              <div className="question-options">
                {question.options.map(option => (
                  <div className="option">
                    <label>
                      <input type="radio" value={option}/>
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="survey-controls">
            <div className="button-container">
              <div className="button-relative">
                <button type="submit">Submit</button>
              </div>
            </div>
            <div className="link-container">
              <Link to="/">Cancel</Link>
            </div>
            <div className="controls-spacer"></div>
          </div>
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
