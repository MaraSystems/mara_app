export const toggleList = (list: string[], item: string) => {    
    const index = list.indexOf(item);     
    list.includes(item) 
        ? list.splice(index, 1) 
        : list.push(item);
    return list;
}