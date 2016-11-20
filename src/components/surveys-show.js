import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSurvey, submitCompletions, successMessage, submitMessage } from '../actions';
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
    this.props.submitMessage(true);
    this.props.submitCompletions(this.props.params.id, props).then(() => {
      this.props.submitMessage(false);
      this.props.successMessage(true);
      this.context.router.push('/');
    })
  }
  render() {
    const { survey } = this.props;

    if (!survey) {
      return (<p>Loading survey...</p>);
    }

    if (this.props.showSubmitMessage) {
      return (
        <div className="survey-show">
          <h1>{survey.title}</h1>
          <h3>{survey.tagline}</h3>
          <p>Submiting your completion...</p>
        </div>
      );
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
    survey: state.surveys.survey,
    showSubmitMessage: state.surveys.showSubmitMessage
  }
}

SurveysShow = reduxForm({
  form: 'SurveysShowForm'
})(SurveysShow);

SurveysShow = connect(mapStateToProps, { fetchSurvey, submitCompletions, successMessage, submitMessage })(SurveysShow);
export default SurveysShow;
