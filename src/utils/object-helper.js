export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    items.map((el => {
            if (el[objPropName] === itemId) {
                return {...el, ...newObjProps}
            }
        return el
        }
    ))
};