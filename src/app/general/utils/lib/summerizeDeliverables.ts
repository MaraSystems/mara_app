export const summerizeDeliverables = (deliverables: any[], selectedDeliverables: string[] = []) => {
    let { price, duration } = deliverables.reduce((acc: any, red: any) => {      
        if (!selectedDeliverables.length || selectedDeliverables.includes(red._id)) {
          acc.price += Number(red.price);
          acc.duration += Number(red.duration);
        }
        return acc;
      }, { price: 0, duration: 0 });
  
      price = Intl.NumberFormat('en-US').format(price);
      duration = duration;

      return { price, duration };
}
