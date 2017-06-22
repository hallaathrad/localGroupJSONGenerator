import React from 'react';
import {connect} from 'react-redux';
import {goFetchForums, compareRepo} from '../redux/actions/';

const Stage = props =>
  <div className="root-wrapper">
    { props.UI.forumsFetched ?
      <button>Compare!</button> :
      <button onClick={()=>props.goFetchForums()}>Fetch Forums!</button>
    }
  </div>;

const mapStateToProps = state => state;

const mapDispatchToState = dispatch => ({
  goFetchForums() {goFetchForums(dispatch);},
  compareRepo() {compareRepo(dispatch);}
});

export default connect(mapStateToProps, mapDispatchToState)(Stage);
