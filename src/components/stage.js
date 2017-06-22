import React from 'react';
import {connect} from 'react-redux';
import {goFetchSources, findCoordinates} from '../redux/actions/';
//import GoogleMap from './GoogleMap/';

const Stage = props =>
  <article className="root-wrapper">
    { props.UI.forumsFetched ?
      <section className="groupsList">
        <h1>done!</h1>
        <ul>
          {props.localGroups.map((group, index) =>
            <li key={`${group.country} - ${group.state? group.state+' - ': ''} ${group.city}`}>
              <details open={!group.coordinates}>
                <summary>{`${group.country} - ${group.state? group.state+' - ': ''} ${group.city}`}</summary>
                <section className="fields">
                  {Object.keys(group).map(key =>
                    <label key={`${group.country} - ${group.state? group.state+' - ': ''} ${group.city} - ${key}`}>
                      {key}
                      <input defaultValue={group[key]}/>
                    </label>
                  )}
                  {!group.coordinates?
                    <button onClick={() => findCoordinates(index, group)}>Find coordinates</button> :
                    <button onClick={() => findCoordinates(index, group)}>Verify coordinates</button> }
                </section>
              </details>
            </li>
          )}
        </ul>
      </section> :
      <section>
        <h1>Gotta remove this button and replace it with a loading thing as the lists are fetched on load.</h1>
        <button onClick={()=>props.goFetchSources()}>Load groups</button>
      </section>
    }
  </article>;

const mapStateToProps = state => state;

const mapDispatchToState = dispatch => ({
  goFetchSources() {goFetchSources(dispatch);},
  findCoordinates(obj) {findCoordinates(obj)}
});

export default connect(mapStateToProps, mapDispatchToState)(Stage);
