class Validators {
    title = /[\w\s\d]{3,}/;

    isTitle = (str) => {
        return this.title.test(str);
    }
}

export default Validators;