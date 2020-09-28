class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneItem: {},
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    axios.get('http://localhost:3000/review/1')
      .then((response) => {
        this.setState({
          oneItem: response.data,
        });
        console.log('ONEITEM IS ', this.state.oneItem);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="inline-block">
          <span className="hover-hand">Reviews&nbsp;&nbsp;</span>
          <span className="hover-hand">Questions</span>
        </div>
        <div>
          <ReviewOverview />
          <MostHelpfulReviews />
          <SortAndProgress />
          <IndividualReview />
          <NextPageAndProgress />
        </div>
      </div>
    );
  }
}