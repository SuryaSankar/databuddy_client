export function safeGet(obj, propertyPath){
    const keys = propertyPath.split(".");
    let currVal = obj;
    for(let i=0; i < keys.length; i++){
        if(!currVal){
            return null;
        }
        currVal = currVal[keys[i]];
    }
    return currVal;
}