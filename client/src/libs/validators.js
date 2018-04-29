class Validator {
    static isTitle(str){
        return /[\w\s\d]{3,}/.test(str);
    };

    static isPostTitle(str){
        return /^[\W\w]{2,}$/gi.test(str);
    };

    static isTags(str){
        return /^[\W\w]{2,}$/gi.test(str);
    };

    static isCategory(str){
        return /(personal|handball)/.test(str);
    }

    static isPostBody(str){
        return /^[\W\w]{10,}$/gi.test(str);
    }

    static isNumber(str){
        return /^[\d]+$/.test(str);
    }

    static isPassword(str){
        return /^[\w\d\s]{5,}$/.test(str);
    }
}

export default Validator;