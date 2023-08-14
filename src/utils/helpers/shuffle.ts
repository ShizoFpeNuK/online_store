const shuffle = (arr: any[]): any[] => [...arr].sort(() => 0.5 - Math.random());

export default shuffle;
