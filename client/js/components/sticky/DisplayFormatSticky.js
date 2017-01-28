module.exports = function(text) {
    text.split('\n').map(function(item) {
        return <span>{item}<br/></span>;
    });
};