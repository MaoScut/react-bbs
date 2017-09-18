import React from 'react';
import PropTypes from 'prop-types';
import { ListFactory } from '../List';
import DeleteLi from '../OptionalItem';

const List = ListFactory(DeleteLi);
export default class PrivateArticles extends React.Component {
  componentDidMount() {
    if (this.props.privateArticles === null) this.props.actions.myArticles();
  }
  render() {
    if (this.props.privateArticles === null) return null;
    return (<List
      articles={this.props.privateArticles}
      onDelete={this.props.actions.deleteArticle}
    />);
  }
}
PrivateArticles.propTypes = {
  privateArticles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    upNum: PropTypes.string,
  })).isRequired,
  actions: PropTypes.arrayOf(PropTypes.func).isRequired,
};

