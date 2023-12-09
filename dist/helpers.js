import lodash from "lodash";
export function filterFormDataByKey(object, key) {
    let startNumber = key.length + 1;
    const data = lodash.entries(object);
    let filteredObject = {};
    data.forEach((arr) => {
        if (arr[0].startsWith(key)) {
            let innerObj = { [arr[0].slice(startNumber)]: arr[1] };
            Object.assign(filteredObject, innerObj);
        }
    });
    return filteredObject;
}
//# sourceMappingURL=helpers.js.map