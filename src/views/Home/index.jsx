import React from 'react';
import List from '../../components/List';
import './main.scss';

export default class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchTopics();
  }
  render() {
    return (
      <section className="home">
        <div className="create-button-container">
          <button onClick={this.props.actions.showEditor}>+ 发新主题</button>
        </div>
        <List items={this.props.topics} onEnter={this.props.actions.enterTopic} />
      </section>
    );
  }
}
