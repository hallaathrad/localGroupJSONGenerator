import {find} from 'lodash';

export const goFetchSources = (dispatch) => {
  console.log('fetching');
  const pending = [];
  fetch('https://forum.freecodecamp.com/t/19574/posts.json?post_ids%5B%5D=32558&post_ids%5B%5D=32557&post_ids%5B%5D=32556&post_ids%5B%5D=32555&post_ids%5B%5D=32551&post_ids%5B%5D=32549&post_ids%5B%5D=32546&post_ids%5B%5D=32545&post_ids%5B%5D=32544&post_ids%5B%5D=32543&post_ids%5B%5D=32541&post_ids%5B%5D=32540&post_ids%5B%5D=32539&post_ids%5B%5D=32537&post_ids%5B%5D=32536&post_ids%5B%5D=32535&post_ids%5B%5D=32534&post_ids%5B%5D=32533&post_ids%5B%5D=32531&post_ids%5B%5D=32530&post_ids%5B%5D=32529&post_ids%5B%5D=32527&post_ids%5B%5D=32526&post_ids%5B%5D=32525&post_ids%5B%5D=32523&post_ids%5B%5D=32522&post_ids%5B%5D=32521&post_ids%5B%5D=32519&_=1497494554618')
    .then(response => response.json())
    .then(rawObj =>
      rawObj.post_stream.posts.map(post => {
        const postString = post.cooked;
        const letters = new DOMParser()
                .parseFromString(postString, 'text/html')
                .querySelectorAll('body > ul > li'),
              countries = Array.prototype.reduce.call(
                letters, (obj, country) => {
                  const camps = Array.prototype.reduce.call(
                    country.children[0].children, (campsitesObj, campsites) =>
                      campsites.firstChild.data ?
                        [
                          ...campsitesObj,
                          ...Array.prototype.map.call(
                            campsites.children[0].children, group =>
                              ({
                                url: group.children[0].href,
                                city: group.children[0].text,
                                state: campsites.firstChild.data,
                                country: country.firstChild.data.includes('United States') ?
                                  'United States' : country.firstChild.data,
                                coordinates: '',
                                photoUrl: ''
                              })
                          )]:
                        [
                          ...campsitesObj,
                          {
                            url: campsites.children[0].href,
                            city: campsites.children[0].text,
                            state: '',
                            country: country.firstChild.data.includes('United States') ?
                              'United States' : country.firstChild.data,
                            coordinates: '',
                            photoUrl: ''
                          }
                        ], []);
                  return [
                    ...obj,
                    ...camps,
                  ];
                }, []);
        return countries;
      }).reduce((countries, letter) => [
        ...countries,
        ...letter
      ], [])
    )
    .then(forumResults =>
      fetch('https://raw.githubusercontent.com/freeCodeCamp/study-group-directory/master/assets/json/campsitesfinal.json')
        .then(response => response.json())
        .then(repo => {
          const merged = forumResults.map(groupF => {
            const already = find(repo, groupR =>
              (groupR.city === groupF.city) &&
              (groupR.state === groupF.state) &&
              (groupR.country === groupF.country)
            );
            return already ? already : (
              pending.push(groupF), groupF
            );
          }
          );

          dispatch({
            type: 'FETCHED_LISTS',
            payload: merged,
            pending
          });
        })
    );
  console.log('fetched all the things for real good :)');
};

export const findCoordinates = () => {
  // http://api.geonames.org/searchJSON?q=Eski%C5%9Fehir&maxRows=3&lang=en&username=hallaathrad&style=full
  // response.geonames.lat, response.geonames.lng, response.geonames.adminName1
  // encodeURIComponent("ö") , rawurlencode(utf8_encode($input))

};
