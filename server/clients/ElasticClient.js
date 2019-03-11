let elasticsearch = require('elasticsearch');

const alabanzasIndex = 'alabanzas-ipnj'
const alabanzasType = 'alabanzas-ipnj'

class ElasticClient {
    constructor(){
        this.client = new elasticsearch.Client({
//            host: 'http://site:a8df4d09da2aca4bbaddbc24df67495b@ori-eu-west-1.searchly.cm',
            host: 'http://site:a8df4d09da2aca4bbaddbc24df67495b@ori-eu-west-1.searchly.com'
          });
    }

    findSongs(valueQuery = ""){
        let query = { match_all: {} }

        if( valueQuery != "" ){
            query = {
                multi_match : {
                    query:   valueQuery, 
                    fields: [ "titulo", "Autor" ] 
                }
            }
        }

        const dataQuery = {
            index: alabanzasIndex,
            type: alabanzasType,
            _source: ["titulo","Autor"],
            body: {
                query: query
            }
        }

        return this.client.search( dataQuery )
                        .then( result => result.hits.hits.map( doc => doc._source ) )
                        .catch( (err) => { throw new Error(err) })
    }

    addSongs(aSong){
        return this.client.index({
            index: alabanzasIndex,
            type: alabanzasType,
            body: aSong
        });
    }
}

module.exports = ElasticClient;