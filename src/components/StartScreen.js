function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <div className="start">
        <h2>Welcome to the React Quiz</h2>
        <p>{numQuestions} questions to test your React mastery</p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's Start
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
