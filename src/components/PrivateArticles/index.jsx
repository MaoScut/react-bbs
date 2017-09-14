import React from 'react';
import { ListFactory } from '../List';
import DeleteLi from '../OptionalItem';

const List = ListFactory(DeleteLi);
// export default function ({ privateArticles, actions }) {
//   if (privateArticles === null) actions.myArticles();
//   else return <List articles={privateArticles || []} onDelete={actions.deleteArticle} />;
// }
export default class extends React.Component {
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
