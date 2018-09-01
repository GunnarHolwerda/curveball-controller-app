export const Topics: Array<{ value: string, label: string }> = [
    { value: 'ncaaf', label: 'NCAAF' },
    { value: 'ncaam', label: 'NCAAM' },
    { value: 'ncaaw', label: 'NCAAW' },
    { value: 'nfl', label: 'NFL' },
    { value: 'nba', label: 'NBA' },
    { value: 'mlb', label: 'MLB' },
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
].sort(({ label: aLabel }, { label: bLabel }) => {
    if (aLabel < bLabel) {
        return -1;
    } else if (aLabel > bLabel) {
        return 1;
    } else {
        return 0;
    }
});
