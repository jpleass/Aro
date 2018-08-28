// In src/Page.js

import React from 'react';
import NotFound from './NotFound';
import PrismicReact from 'prismic-reactjs';
import Plyr from 'react-plyr';
// import Prismic from 'prismic-javascript';



export default class Home extends React.Component {

  state = {
    doc: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  fetchPage(props){
     if (props.prismicCtx) {
      return props.prismicCtx.api.getSingle('home', (err, doc) => {
        if (doc) {
          this.setState({ doc });
        } else {
          this.setState({ notFound: !doc });
        }
      });
    }
  }


  render() {
    const document = this.state.doc;
    if (document) {
      console.log(document);
      return (
        <main>
          <Plyr type="vimeo" controls='' videoId="255177390"/>
          <h1>{PrismicReact.RichText.asText(document.data.title)}</h1>
          {PrismicReact.RichText.render(document.data.description, this.props.prismicCtx.linkResolver)}
        </main>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <main>Loading</main>;
  }


}

