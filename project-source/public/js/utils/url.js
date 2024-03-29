export default class UrlParser {

    static checkParamOnUrl() {
        const decomposition = window.location.hash.split('/');
        if (decomposition.length === 4) {
            return decomposition[3];
        }
        return null;
    }
    
    static decomposeURLwithParam() {
        const decomposition = window.location.hash.split('/');
        return [
            `${decomposition[0]}/${decomposition[1]}/${decomposition[2]}`,
            decomposition[3]
        ];
    }
    
    static makeRedirectionHome() {
        window.location.hash == "#" ||
        window.location.hash == "" || 
        window.location.hash == "/" ? 
            window.location.hash = "#/home" : 
            null;
    }
}