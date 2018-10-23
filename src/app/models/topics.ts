export const Topics: Array<{ value: string, label: string }> = [
    { value: 'ncaaf', label: 'NCAAF', weight: 3 },
    { value: 'ncaam', label: 'NCAAM', weight: 4 },
    { value: 'ncaaw', label: 'NCAAW' },
    { value: 'nfl', label: 'NFL', weight: 1 },
    { value: 'nba', label: 'NBA', weight: 2 },
    { value: 'mlb', label: 'MLB', weight: 5 },
    { value: 'tennis', label: 'Tennis' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'esports', label: 'Esports' },
    { value: 'golf', label: 'Golf' },
    { value: 'boxing', label: 'Boxing' },
    { value: 'f1', label: 'F1' },
    { value: 'olympics', label: 'Olympics' },
    { value: 'nascar', label: 'NASCAR' },
    { value: 'wnba', label: 'WNBA' },
    { value: 'wwe', label: 'WWE' },
    { value: 'ncaab', label: 'NCAA Baseball' },
    { value: 'ncaasb', label: 'NCAA Softball' },
].sort(({ weight: aWeight }, { weight: bWeight }) => {
    aWeight = aWeight === undefined ? 100 : aWeight;
    bWeight = bWeight === undefined ? 100 : bWeight;
    if (aWeight < bWeight) {
        return -1;
    } else if (aWeight > bWeight) {
        return 1;
    } else {
        return 0;
    }
});
