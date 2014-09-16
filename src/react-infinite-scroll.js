module.exports = function (React) {
  if (React.addons && React.addons.InfiniteScroll) {
    return React.addons.InfiniteScroll;
  }
  React.addons = React.addons || {};
  var InfiniteScroll = React.addons.InfiniteScroll = React.createClass({
    getDefaultProps: function () {
      return {
        pageStart: 0,
        hasMore: false,
        loadMore: function () {},
        threshold: 250,
        loader: null,
        component: React.DOM.div
      };
    },
    getInitialState: function () {
      this.pageLoaded = this.props.pageStart;
      this.updated = true;
      return null;
    },
    componentDidMount: function () {
      this.attachScrollListener();
    },
    componentDidUpdate: function () {
      this.updated = true;
      if (!this.props.hasMore) {
        this.detachScrollListener();
      }
      else {
        this.attachScrollListener();
      }
    },
    render: function () {
      var props = this.props;
      return this.transferPropsTo(props.component({
        pageStart: null
      , hasMore: null
      , loadMore: null
      , threshold: null
      , loader: null
      , component: null
      }, props.children, props.hasMore && props.loader));
    },
    scrollListener: function () {
      if (!this.updated) return;
      var coords = this.getDOMNode().getBoundingClientRect();
      var cutoff = (window.innerHeight || document.documentElement.clientHeight) + this.props.threshold;

      if ((coords.bottom >= 0 && coords.left >= 0 && coords.bottom) <= cutoff) {
        this.updated = false;
        this.props.loadMore(this.pageLoaded += 1);
      }
    },
    attachScrollListener: function () {
      if (!this.props.hasMore) {
        return;
      }
      window.addEventListener('scroll', this.scrollListener);
      this.scrollListener();
    },
    detachScrollListener: function () {
      window.removeEventListener('scroll', this.scrollListener);
    },
    componentWillUnmount: function () {
      this.detachScrollListener();
    }
  });
  return InfiniteScroll;
};