const service = require('./trello.service')();

module.exports = () => {
    const suggestList = '59f5f13ef9b36afc4197c5c7';
    const bugList = '59f60f7464a75889efbd6a52';

    return {
        postSuggestion: service.postCard(suggestList),
        postBug: service.postCard(bugList)
    }
}