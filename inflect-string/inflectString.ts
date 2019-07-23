/**
 * @return convert [any alphabet] string to snake_case.
 */
export default (originString: string): string => {
    return camelToSnakeCase(originString);
};

function camelToSnakeCase(text: string): string {
    let ret: string = '';
    try {
        ret = text
            .replace(/[^a-zA-Z]/g, '-')
            .split('-')
            .filter((e: string) => e !== '')
            .reduce((prev: string, cur: string) => `${prev}_${cur}`)
            .replace(/(.)([A-Z][a-z]+)/, '$1_$2')
            .replace(/([a-z])([A-Z])/, '$1_$2')
            .split('_')
            .filter((e: string) => e !== '')
            .reduce((prev: string, cur: string) => `${prev}_${cur}`)
            .toLowerCase();
    } catch (e) {
    }
    return ret;
}
