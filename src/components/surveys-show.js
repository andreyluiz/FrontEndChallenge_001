import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurvey, submitCompletions, successMessage } from '../actions';
import './surveys-show.css';

class SurveysShow extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      successMessage: null
    }
  }
  componentWillMount() {
    this.props.successMessage(false);
    this.props.fetchSurvey(this.props.params.id);
  }
  onSubmit(props) {
    let payload = []
    for (const question_id in props) {
      if (props.hasOwnProperty(question_id)) {
        payload.push({
          question_id,
          value: props[question_id]
        })
      }
    }
    this.props.submitCompletions(this.props.params.id, payload).then(() => {
      this.props.successMessage(true);
      this.context.router.push('/');
    })
  }
  render() {
    const { survey } = this.props;

    if (!survey) {
      return (<p>Loading...</p>);
    }

    let questionCount = 1;

    const { handleSubmit } = this.props;

    return (
      <div className="survey-show">
        <h1>{survey.title}</h1>
        <h3>{survey.tagline}</h3>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {survey.questions.map(question => (
            <div key={question.id} className="survey-question">
              <p><b>{questionCount++})</b> {question.title}</p>
              <div className="question-options">
                {question.options.map(option => (
                  <div key={option} className="option">
                    <label>
                      <Field component="input" type="radio" name={question.id} value={option}/>
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

SurveysShow = reduxForm({
  form: 'SurveysShowForm'
})(SurveysShow);

SurveysShow = connect(mapStateToProps, { fetchSurvey, submitCompletions, successMessage })(SurveysShow);
export default SurveysShow;
